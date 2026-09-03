import { test, expect } from 'vitest';
import { ApiMethods } from '../ApiMethods';
import { FolderNames } from '../constants/FolderNames';

test('ApiMethods.getFolderNameByItemTypeName pluralizes item type names', () => {
    expect(ApiMethods.getFolderNameByItemTypeName('Contact')).toBe(FolderNames.contacts);
    expect(ApiMethods.getFolderNameByItemTypeName('Company')).toBe(FolderNames.companies);
    expect(ApiMethods.getFolderNameByItemTypeName('Salary')).toBe(FolderNames.salaries);
    expect(ApiMethods.getFolderNameByItemTypeName('Holiday')).toBe(FolderNames.holidays);
    expect(ApiMethods.getFolderNameByItemTypeName('Bonus')).toBe(FolderNames.bonuses);
    expect(ApiMethods.getFolderNameByItemTypeName('Good')).toBe(FolderNames.goods);
    expect(ApiMethods.getFolderNameByItemTypeName('Child')).toBe(FolderNames.children);
    expect(ApiMethods.getFolderNameByItemTypeName('EnumValuesRelation')).toBe(FolderNames.enumValuesRelations);
    expect(ApiMethods.getFolderNameByItemTypeName('XsltTransformationsModel')).toBe(FolderNames.xsltTransformationsModels);
});

test('ApiMethods.getFolderNameByItemTypeName returns folders that keep the singular form', () => {
    expect(ApiMethods.getFolderNameByItemTypeName('Knowledge')).toBe(FolderNames.knowledge);
    expect(ApiMethods.getFolderNameByItemTypeName('Training')).toBe(FolderNames.training);
    expect(ApiMethods.getFolderNameByItemTypeName('History')).toBe(FolderNames.history);
    expect(ApiMethods.getFolderNameByItemTypeName('Ledger')).toBe(FolderNames.ledger);
    expect(ApiMethods.getFolderNameByItemTypeName('ProjectList')).toBe(FolderNames.projectList);
    expect(ApiMethods.getFolderNameByItemTypeName('RelationData')).toBe(FolderNames.relationData);
});

test('ApiMethods.getFolderNameByItemTypeName returns the exceptions', () => {
    expect(ApiMethods.getFolderNameByItemTypeName('Calendar')).toBe(FolderNames.calendar);
    expect(ApiMethods.getFolderNameByItemTypeName('GoodInCart')).toBe(FolderNames.goodsInCart);
    expect(ApiMethods.getFolderNameByItemTypeName('GoodInSet')).toBe(FolderNames.goodsInSet);
    expect(ApiMethods.getFolderNameByItemTypeName('Journal')).toBe(FolderNames.journal);
    expect(ApiMethods.getFolderNameByItemTypeName('MarketingCampaign')).toBe(FolderNames.marketing);
    expect(ApiMethods.getFolderNameByItemTypeName('MarketingList')).toBe(FolderNames.marketingList);
    expect(ApiMethods.getFolderNameByItemTypeName('RevisionHistoryRecord')).toBe(FolderNames.revisionsHistory);
    expect(ApiMethods.getFolderNameByItemTypeName('Vacation')).toBe(FolderNames.vacation);
    expect(ApiMethods.getFolderNameByItemTypeName('WorkflowHistoryRecord')).toBe(FolderNames.workflowHistory);
});

test('ApiMethods.getFolderNameByItemTypeName returns null for unknown item type names', () => {
    expect(ApiMethods.getFolderNameByItemTypeName('Whatever')).toBeNull();
    expect(ApiMethods.getFolderNameByItemTypeName('')).toBeNull();
});
