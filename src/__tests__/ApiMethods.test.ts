import { test, expect } from 'vitest';
import { ApiMethods } from '../ApiMethods';
import { FolderNames } from '../constants/FolderNames';

test('ApiMethods.getFolderNameByItemTypeName pluralizes item type names', () => {
    expect(ApiMethods.getFolderNameByApiItemTypeName('Contact')).toBe(FolderNames.contacts);
    expect(ApiMethods.getFolderNameByApiItemTypeName('Company')).toBe(FolderNames.companies);
    expect(ApiMethods.getFolderNameByApiItemTypeName('Salary')).toBe(FolderNames.salaries);
    expect(ApiMethods.getFolderNameByApiItemTypeName('Holiday')).toBe(FolderNames.holidays);
    expect(ApiMethods.getFolderNameByApiItemTypeName('Bonus')).toBe(FolderNames.bonuses);
    expect(ApiMethods.getFolderNameByApiItemTypeName('Good')).toBe(FolderNames.goods);
    expect(ApiMethods.getFolderNameByApiItemTypeName('Child')).toBe(FolderNames.children);
    expect(ApiMethods.getFolderNameByApiItemTypeName('EnumValuesRelation')).toBe(FolderNames.enumValuesRelations);
    expect(ApiMethods.getFolderNameByApiItemTypeName('XsltTransformationsModel')).toBe(FolderNames.xsltTransformationsModels);
});

test('ApiMethods.getFolderNameByItemTypeName returns folders that keep the singular form', () => {
    expect(ApiMethods.getFolderNameByApiItemTypeName('Knowledge')).toBe(FolderNames.knowledge);
    expect(ApiMethods.getFolderNameByApiItemTypeName('Training')).toBe(FolderNames.training);
    expect(ApiMethods.getFolderNameByApiItemTypeName('History')).toBe(FolderNames.history);
    expect(ApiMethods.getFolderNameByApiItemTypeName('Ledger')).toBe(FolderNames.ledger);
    expect(ApiMethods.getFolderNameByApiItemTypeName('ProjectList')).toBe(FolderNames.projectList);
    expect(ApiMethods.getFolderNameByApiItemTypeName('RelationData')).toBe(FolderNames.relationData);
});

test('ApiMethods.getFolderNameByItemTypeName returns the exceptions', () => {
    expect(ApiMethods.getFolderNameByApiItemTypeName('Calendar')).toBe(FolderNames.calendar);
    expect(ApiMethods.getFolderNameByApiItemTypeName('GoodInCart')).toBe(FolderNames.goodsInCart);
    expect(ApiMethods.getFolderNameByApiItemTypeName('GoodInSet')).toBe(FolderNames.goodsInSet);
    expect(ApiMethods.getFolderNameByApiItemTypeName('Journal')).toBe(FolderNames.journal);
    expect(ApiMethods.getFolderNameByApiItemTypeName('MarketingCampaign')).toBe(FolderNames.marketing);
    expect(ApiMethods.getFolderNameByApiItemTypeName('MarketingList')).toBe(FolderNames.marketingList);
    expect(ApiMethods.getFolderNameByApiItemTypeName('RevisionHistoryRecord')).toBe(FolderNames.revisionsHistory);
    expect(ApiMethods.getFolderNameByApiItemTypeName('Vacation')).toBe(FolderNames.vacation);
    expect(ApiMethods.getFolderNameByApiItemTypeName('WorkflowHistoryRecord')).toBe(FolderNames.workflowHistory);
});

test('ApiMethods.getFolderNameByItemTypeName returns null for unknown item type names', () => {
    expect(ApiMethods.getFolderNameByApiItemTypeName('Whatever')).toBeNull();
    expect(ApiMethods.getFolderNameByApiItemTypeName('')).toBeNull();
});
