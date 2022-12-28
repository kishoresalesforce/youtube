import getAccounts from '@salesforce/apex/LWCController.getAccounts';
import { LightningElement, track, wire } from 'lwc';
const COLUMN = [
    { label: 'Name', type: 'url', fieldName: 'idLink', typeAttributes: { label: { fieldName: 'Name' } } },
    { label: 'CreatedBy', type: 'url', fieldName: 'createdByIdLink', typeAttributes: { label: { fieldName: 'createdByName' } } },
    { label: 'Parent Account', type: 'url', fieldName: 'parentIdLink', typeAttributes: { label: { fieldName: 'parentName' } } },
    { label: 'Owner', type: 'url', fieldName: 'ownerIdLink', typeAttributes: { label: { fieldName: 'ownerName' } } },
]
export default class TableWithLinks extends LightningElement {
    @track dataList = [];
    @track columnsList = COLUMN;
    @wire(getAccounts)
    getAccountRecords({ error, data }) {
        if (error) {
            console.error(error);
        } else if (data) {
            this.dataList = data.map(element => {
                var obj = Object.assign({}, element);
                obj.idLink = '/' + obj.Id;
                obj.createdByIdLink = '/' + obj.CreatedById;
                obj.createdByName = obj.CreatedBy.Name;
                obj.parentIdLink = obj.ParentId ? '/' + obj.ParentId : null;
                obj.parentName = obj.Parent?.Name;
                obj.ownerIdLink = '/' + obj.OwnerId;
                obj.ownerName = obj.Owner.Name;
                return obj;
            });
        }
    }

}