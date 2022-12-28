public with sharing class LWCController {
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts() {
        try {
            return [SELECT Id, Name, CreatedById, CreatedBy.Name, ParentId, Parent.Name, OwnerId, Owner.Name FROM Account WITH SECURITY_ENFORCED ORDER BY CreatedDate DESC];
        }
        catch (Exception ex) {
            throw ex;
        }
    }

}