import type { TFolderName } from "./constants/FolderNames";
import { FolderNames } from "./constants/FolderNames";

export class ApiMethods {
    static readonly getAllEmailAttachments = 'GetAllEmailAttachments';
    static readonly getCalendarsByItemGuids = 'GetCalendarsByItemGuids';
    static readonly getEmailAttachment = 'GetEmailAttachment';
    static readonly getItemPreview = 'GetItemPreview';
    static readonly getJournalsByItemGuids = 'GetJournalsByItemGuids';
    static readonly getMarketingCampaignsByItemGuids = 'GetMarketingCampaignsByItemGuids';
    static readonly getMarketingListsRecordsByItemGuids = 'GetMarketingListsRecordsByItemGuids';
    static readonly getRevisionHistoryRecordsByItemGuids = 'GetRevisionHistoryRecordsByItemGuids';
    static readonly getVacationsByItemGuids = 'GetVacationsByItemGuids';
    static readonly getWorkflowHistoryRecordsByItemGuids = 'GetWorkflowHistoryRecordsByItemGuids';
    static readonly getCompanyInformationFromTaxRegister = 'GetCompanyInformationFromTaxRegister';
    static readonly logIn = 'LogIn';
    static readonly logOut = 'LogOut';
    static readonly query = 'Query';
    static readonly queryAmount = 'QueryAmount';
    static readonly getServiceAuthSettings = 'GetServiceAuthSettings';
    static readonly getVersion = 'GetVersion';
    static readonly getBinaryAttachment = 'GetBinaryAttachment';
    static readonly getBinaryAttachmentLatestRevision = 'GetBinaryAttachmentLatestRevision';
    static readonly transformItem = 'TransformItem';
    static readonly canUnlinkItems = 'CanUnlinkItems';
    static readonly unlinkItems = 'UnlinkItems';
    static readonly getGoodsFinalPrices = 'GetGoodsFinalPrices';
    static readonly saveItemCopyRelation = 'SaveItemCopyRelation';
    static readonly getXsltTransormationDefinition = 'GetXsltTransformationDefinition';
    static readonly saveBinaryAttachment = 'SaveBinaryAttachment';
    static readonly saveBinaryXsltTransformation = 'SaveBinaryXsltTransformation';
    static readonly GetLoginHistory = 'GetLoginHistory';
    static readonly GetMyLoginHistory = 'GetMyLoginHistory';

    /**
     * Return folderName part of API method that is used in API calls. Some API methods have different names than the folder names they are associated with.
     * For example module Calendar has method GetCalendarsByItemGuids, but the folder name is Calendar.
     */
    private static readonly getFolderNameForApiMethod = (folderName: TFolderName) => {
        switch (folderName) {
            case FolderNames.calendar:
                return 'Calendars';
            case FolderNames.goodsInCart:
                return 'GoodsInCart';
            case FolderNames.goodsInSet:
                return 'GoodsInSet';
            case FolderNames.journal:
                return 'Journals';
            case FolderNames.marketing:
                return 'MarketingCampaigns';
            case FolderNames.marketingList:
                return 'MarketingLists';
            case FolderNames.revisionsHistory:
                return 'RevisionHistoryRecords';
            case FolderNames.vacation:
                return 'Vacations';
            case FolderNames.workflowHistory:
                return 'WorkflowHistoryRecords';
            default:
                return folderName;
        }
    };

    /**
    * Returns the folder an item type belongs to, for types whose name doesn't pluralise to it.
    * For example type GoodInCart belongs to folder GoodsInCart.
    */
    static readonly getFolderNameByItemTypeName = (itemTypeName: string): TFolderName | null => {
        switch (itemTypeName) {
            case "Calendar": return FolderNames.calendar;
            case "GoodInCart": return FolderNames.goodsInCart;
            case "GoodInSet": return FolderNames.goodsInSet;
            case "Journal": return FolderNames.journal;
            case "MarketingCampaign": return FolderNames.marketing;
            case "MarketingList": return FolderNames.marketingList;
            case "RevisionHistoryRecord": return FolderNames.revisionsHistory;
            case "Vacation": return FolderNames.vacation;
            case "WorkflowHistoryRecord": return FolderNames.workflowHistory;
            default: return null;
        }
    };

    static readonly getGetFolderNameByItemGuidsMethodName = (folderName: TFolderName) => {
        const folderNameForApiMethod = ApiMethods.getFolderNameForApiMethod(folderName);
        return `Get${folderNameForApiMethod}ByItemGuids`;
    };

    static readonly getGetFolderNameMethodName = (folderName: TFolderName) => {
        const folderNameForApiMethod = ApiMethods.getFolderNameForApiMethod(folderName);
        return `Get${folderNameForApiMethod}`;
    };

    static readonly getSearchFolderNameMethodName = (folderName: TFolderName) => {
        const folderNameForApiMethod = ApiMethods.getFolderNameForApiMethod(folderName);
        return `Search${folderNameForApiMethod}`;
    };
}
