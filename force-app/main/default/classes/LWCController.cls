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

    @AuraEnabled(cacheable = true)
    public static string getRecordName(Id recordId) {
        try {
            return (String)Database.query('SELECT Id, Name FROM ' + recordId.getSObjectType().getDescribe().getName() + ' WHERE Id=:recordId')[0]?.get('Name');
        }
        catch (Exception ex) {
            throw ex;
        }
    }

}