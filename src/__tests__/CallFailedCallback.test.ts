import { test, expect, vi, beforeEach } from 'vitest';
import type { AxiosResponse } from 'axios';
import { ApiConnection, ISessionHandler, TCallFailure } from '../ApiConnection';
import { IApiResult } from '../data/IApiResult';
import { HttpRequestError } from '../exceptions/HttpRequestError';
import { ReturnCodes } from '../ReturnCodes';

const { postMock } = vi.hoisted(() => ({ postMock: vi.fn() }));

// This suite drives handleCallPromise through stubbed responses, so unlike Api.test.ts it needs no live service.
vi.mock('axios', () => ({ default: { post: postMock, get: vi.fn() } }));

const serviceUrl = 'https://ws.example.com/31994';

/** Hands out a fresh session id on demand, the way the real handlers do after a re-login. */
const createSessionHandler = (): ISessionHandler => {
    let issued = 0;

    return {
        getSessionId: (_connection, callback) => {
            issued++;
            callback(`session-${issued}`);
        },
        invalidateSessionId: (_sessionId, callback) => callback(),
    };
};

const apiResponse = (data: IApiResult, status = 200) => ({ status, statusText: '', data, headers: {}, config: {} }) as AxiosResponse<IApiResult>;

const createConnection = (callFailedCallback?: (failure: TCallFailure, methodName: string) => void) => {
    const announced: { failure: TCallFailure; methodName: string }[] = [];
    const errorCallback = vi.fn();
    const connection = new ApiConnection(
        serviceUrl,
        createSessionHandler(),
        errorCallback,
        false,
        callFailedCallback ??
            ((failure, methodName) => {
                announced.push({ failure, methodName });
            })
    );

    return { connection, errorCallback, announced };
};

beforeEach(() => {
    postMock.mockReset();
});

test('an app level failure is announced once, even though catchGlobally rethrows it into the same catch', async () => {
    const data: IApiResult = { ReturnCode: ReturnCodes.rcWebServiceMoved, Description: 'The web service has moved.' };
    postMock.mockResolvedValue(apiResponse(data));
    const { connection, announced } = createConnection();

    await expect(connection.askMethod<IApiResult>('GetColumns', {}, undefined, true)).rejects.toBe(data);

    // Drop the dedupe in handleCallPromise and this is 2: the rethrow lands back in the promise's own catch.
    expect(announced).toHaveLength(1);
    expect(announced[0].failure).toBe(data);
    expect(announced[0].methodName).toBe('GetColumns');
});

test('an app level failure is announced once when catchGlobally is off', async () => {
    const data: IApiResult = { ReturnCode: ReturnCodes.rcAccessDenied, Description: 'Access denied.' };
    postMock.mockResolvedValue(apiResponse(data));
    const { connection, announced } = createConnection();

    await expect(connection.askMethod<IApiResult>('GetColumns', {})).rejects.toBe(data);

    expect(announced).toHaveLength(1);
    expect(announced[0].failure).toBe(data);
});

test('rcBadSession is not announced - the connection logs in again and repeats the call', async () => {
    const result: IApiResult = { ReturnCode: ReturnCodes.rcSuccess, Description: '' };
    postMock
        .mockResolvedValueOnce(apiResponse({ ReturnCode: ReturnCodes.rcBadSession, Description: 'Bad session.' }))
        .mockResolvedValueOnce(apiResponse(result));
    const { connection, announced } = createConnection();

    await expect(connection.askMethod<IApiResult>('GetColumns', {})).resolves.toBe(result);

    expect(postMock).toHaveBeenCalledTimes(2);
    expect(announced).toEqual([]);
});

test('an http failure is announced as an HttpRequestError carrying the method name', async () => {
    postMock.mockRejectedValue({ response: { status: 502, statusText: 'Bad Gateway', data: '<html>proxy error</html>' } });
    const { connection, announced } = createConnection();

    await expect(connection.askMethod<IApiResult>('GetMyColumnPermissions', {})).rejects.toBeInstanceOf(HttpRequestError);

    expect(announced).toHaveLength(1);
    expect(announced[0].methodName).toBe('GetMyColumnPermissions');
    expect((announced[0].failure as HttpRequestError).statusCode).toBe(502);
});

test('a throwing callback is reported to errorCallback but does not replace the failure', async () => {
    const data: IApiResult = { ReturnCode: ReturnCodes.rcAccessDenied, Description: 'Access denied.' };
    postMock.mockResolvedValue(apiResponse(data));
    const { connection, errorCallback } = createConnection(() => {
        throw new Error('Consumer blew up.');
    });

    // The caller still gets the api failure, not the consumer's exception.
    await expect(connection.askMethod<IApiResult>('GetColumns', {})).rejects.toBe(data);

    expect(errorCallback).toHaveBeenCalledTimes(1);
    const reported = errorCallback.mock.calls[0][0] as Error;
    expect(reported.message).toContain('Call failed callback failed.');
    expect(reported.message).toContain('Consumer blew up.');
});

test('a connection without the callback still fails the call normally', async () => {
    const data: IApiResult = { ReturnCode: ReturnCodes.rcAccessDenied, Description: 'Access denied.' };
    postMock.mockResolvedValue(apiResponse(data));
    const connection = new ApiConnection(serviceUrl, createSessionHandler(), vi.fn(), false);

    await expect(connection.askMethod<IApiResult>('GetColumns', {})).rejects.toBe(data);
});

test('isWebServiceMovedFailure reads both the app level and the error spelling of the code', () => {
    expect(ApiConnection.isWebServiceMovedFailure({ ReturnCode: ReturnCodes.rcWebServiceMoved })).toBe(true);
    expect(ApiConnection.isWebServiceMovedFailure({ returnCode: ReturnCodes.rcWebServiceMoved })).toBe(true);
    expect(ApiConnection.isWebServiceMovedFailure({ ReturnCode: ReturnCodes.rcAccessDenied })).toBe(false);
    expect(ApiConnection.isWebServiceMovedFailure(new Error('Network down.'))).toBe(false);
    expect(ApiConnection.isWebServiceMovedFailure(null)).toBe(false);
    expect(ApiConnection.isWebServiceMovedFailure(ReturnCodes.rcWebServiceMoved)).toBe(false);
});
