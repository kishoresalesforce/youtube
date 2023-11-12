import { LightningElement, api, track } from 'lwc';
import getRecordName from '@salesforce/apex/LWCController.getRecordName';

export default class MultiSelectRecordPicker extends LightningElement {
    @api isMultiSelect = !(false);
    @api objectName = 'Account';
    @api label = 'Accounts';
    @api iconName = 'standard:account'
    selectedId;
    @track selectedItems = []
    handleChange(evt) {
        let recordId = evt.detail.recordId;
        if (this.isMultiSelect) {
            evt.target.value = null;
            this.refs.picker.clearSelection();
            if (recordId) {
                getRecordName({ recordId }).then(label => {
                    this.selectedItems = this.selectedItems.filter(item => recordId !== item.name);
                    this.selectedItems.push({
                        type: 'icon',
                        href: `/${recordId}`,
                        name: recordId, label,
                        iconName: this.iconName,
                        alternativeText: this.label,
                        isLink: true
                    });
                    // this.selectedItems = JSON.parse(JSON.stringify(this.selectedItems))
                }).catch(err => console.error(err));
            } else {
                this.selectedItems = this.selectedItems.filter(item => this.selectedId !== item.name);
            }
        }
        this.selectedId = recordId;
    }
    handleItemRemove(event) {
        const name = event.detail.item.name;
        this.selectedItems = this.selectedItems.filter(item => name !== item.name);
    }
}