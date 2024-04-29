import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalVariables } from '../../../../shared/constants/global-variables';
import { GlobalFormValidators } from '../../../../shared/form-validators/global-form-validators';
import { PayloadHelper } from '../../../../shared/helpers/payload-helper';
import { InventoryHelper } from '../../../../shared/helpers/inventory-helper';
import { InventoryService } from '../../../../shared/services/inventory.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BroadcastService } from '../../../../shared/services/broadcast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OpportunityService } from '../../../../shared/services/opportunity.service';

@Component({
     selector: 'app-opportunity-popup',
     templateUrl: './opportunity-popup.component.html',
     styleUrl: './opportunity-popup.component.scss'
})
export class OpportunityPopupComponent implements OnInit {
     public dialogboxDetails: any = null;
     public dialogBoxMaxWidth: any = '60vw';

     public popupOpportunityForm: FormGroup;
     public popupOpportunityTemplate: any = {};
     public globalVariables: GlobalVariables;
     public payloadHelper: PayloadHelper;
     public inventoryHelper: InventoryHelper;
     public globalFormValidators: GlobalFormValidators;
     public formErrors: any = {};
     public validationMessage: any = {};
     public dummyPopupStorageRecords: any = [];
     public isOpenedForUpdate: boolean = false;
     public buildingIdentifier: any = null;

     // prettier-ignore
     constructor(
          private _toaster: ToastrService,
          private _formBuilder: FormBuilder,
          private _inventoryService: InventoryService,
          private _spinner: NgxSpinnerService,
          private _opportunityService: OpportunityService,
          private _toastr: ToastrService,          
          private _storageService: StorageService,
          @Inject(MAT_DIALOG_DATA) private _DIALOG_DATA: any,
          private _dialogRef: MatDialogRef<OpportunityPopupComponent>,
     ){
          this.dialogboxDetails = this._DIALOG_DATA;
          this.globalVariables = new GlobalVariables();
          this.payloadHelper = new PayloadHelper();
          this.inventoryHelper = new InventoryHelper();
          this.globalFormValidators = new GlobalFormValidators();
     }

     ngOnInit(): void {
          this.initializeDialogBoxConfig();
     }

     public initializeDialogBoxConfig() {
          if (this.dialogboxDetails) {
               if (this.dialogboxDetails['action']['popupMaxWidth']) {
                    this.dialogBoxMaxWidth = this.dialogboxDetails['action']['popupMaxWidth'];
               } else {
                    this.dialogBoxMaxWidth = '60vw';
               }
               if (this.dialogboxDetails['action']['level'] == 'OPPORTUNITY') {
                    this.initializeOpportunity();
               }
          }
     }

     public initializeOpportunity() {
          this.popupOpportunityTemplate = this.inventoryHelper.opportunityObjectTemplate;
          this.popupOpportunityTemplate = this._inventoryService.initializeFloorMenus(this.popupOpportunityTemplate);
          this.initializeOpportunityFormsPayload();
          this.createFormErrorFields(this.popupOpportunityTemplate);
     }

     public initializeOpportunityFormsPayload() {
          if (this.dialogboxDetails['action']['type'] == 'UPDATE') {
               this.isOpenedForUpdate = true;
               let opportunityInfo = this.dialogboxDetails['opportunityInfo'];
               this.popupOpportunityTemplate = this._inventoryService.setDefaultOpportunityValue(this.popupOpportunityTemplate, opportunityInfo);
               this.createDynamicForm(this.popupOpportunityTemplate);
          } else {
               this.isOpenedForUpdate = false;
               this.createDynamicForm(this.popupOpportunityTemplate);
          }
     }

     public createDynamicForm(templateObject: any) {
          this.popupOpportunityForm = this._formBuilder.group(this.getDynamicFormGroup(templateObject));
     }

     public createDynamicNestedForm(templateObject: any) {
          let _tempFormGroup = {};
          Object.entries(templateObject).forEach(([key, innerObject], index) => {
               _tempFormGroup[key] = this._formBuilder.group(this.getDynamicFormGroup(innerObject));
          });
          this.popupOpportunityForm = this._formBuilder.group(_tempFormGroup);
     }

     public getDynamicFormGroup(object: any) {
          let _formGroup = {};
          Object.entries(object).forEach(([key, innerObject], innerIndex) => {
               let fieldValidations: any = [];
               innerObject['default']['validations'].forEach((validation: any) => {
                    if (validation.required) {
                         fieldValidations.push(Validators.required);
                    }
                    if (validation.email) {
                         fieldValidations.push(Validators.email);
                    }
                    if (validation.pattern) {
                         fieldValidations.push(Validators.pattern(validation.regex));
                    }
                    if (validation.minLength) {
                         fieldValidations.push(Validators.minLength(Number(validation.length)));
                    }
                    if (validation.maxLength) {
                         fieldValidations.push(Validators.maxLength(Number(validation.length)));
                    }
               });
               _formGroup[key] = new FormControl(innerObject['default']['value'], fieldValidations);
          });
          return _formGroup;
     }

     public createFormErrorFields(popupOpportunityTemplate: any) {
          let _tempObject = this.createFormErrorInnerFields(popupOpportunityTemplate);
          this.formErrors = _tempObject.errors;
          this.validationMessage = _tempObject.messages;
     }

     public createFormErrorInnerFields(object: any) {
          let _tempErrorsFields = {};
          let _tempMessagesFields = {};
          Object.entries(object).forEach(([key, innerObject], innerIndex) => {
               let errorsMessages = {};
               innerObject['default']['validations'].forEach((validation: any) => {
                    this.validationConcatinator(validation, errorsMessages);
               });
               _tempErrorsFields[key] = '';
               _tempMessagesFields[key] = errorsMessages;
          });
          return { errors: _tempErrorsFields, messages: _tempMessagesFields };
     }

     public createNestedFormErrorFields(inventoryTemplate: any) {
          let _tempErrorsFields = {};
          let _tempMessagesFields = {};
          Object.entries(inventoryTemplate).forEach(([key, innerObject], index) => {
               let _tempObject = this.createNestedFormErrorInnerFields(innerObject);
               _tempErrorsFields[key] = _tempObject.errors;
               _tempMessagesFields[key] = _tempObject.messages;
          });

          this.formErrors = _tempErrorsFields;
          this.validationMessage = _tempMessagesFields;
     }

     public createNestedFormErrorInnerFields(object: any) {
          let _tempErrorsFields = {};
          let _tempMessagesFields = {};
          Object.entries(object).forEach(([key, innerObject], innerIndex) => {
               let errorsMessages = {};

               innerObject['default']['validations'].forEach((validation: any) => {
                    this.validationConcatinator(validation, errorsMessages);
               });

               _tempErrorsFields[key] = '';
               _tempMessagesFields[key] = errorsMessages;
          });

          return { errors: _tempErrorsFields, messages: _tempMessagesFields };
     }

     public validationConcatinator(validation: any, errorsMessages: {}) {
          if (validation.required) {
               errorsMessages['required'] = validation['message'];
          }
          if (validation.email) {
               errorsMessages['email'] = validation['message'];
          }
          if (validation.pattern) {
               errorsMessages['pattern'] = validation['message'];
          }
          if (validation.minLength) {
               errorsMessages['minlength'] = validation['message'];
          }
          if (validation.maxLength) {
               errorsMessages['maxlength'] = validation['message'];
          }
     }

     public getLengthOfObject(object: any) {
          return Object.keys(object);
     }

     public keepOrder = (ascending: any, descending: any) => {
          return ascending;
     };

     public beautifyLabel(label: any) {
          return this.inventoryHelper.beautifyLabel(label);
     }

     public submitpopupOpportunityForm() {
          if (this.popupOpportunityForm.valid) {
               if (this.dialogboxDetails['action']['type'] == 'UPDATE') {
                    this.updateOpportunity();
               } else {
                    this.createOpportunity();
               }
          } else {
               this.displayAllFormError();
          }
     }

     public createOpportunity() {
          let payload = this.createOpportunityPayload();
          this._spinner.show();
          this._opportunityService.createOpportunity(payload).subscribe({
               next: (res) => {
                    this._toaster.success('Opportunity Created Successfully.');
                    this.hidePopupBox({ status: true, refresh: true });
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toastr.error(error.message);
               }
          });
     }

     public updateOpportunity() {
          let payload = this.createOpportunityPayload();
          this._spinner.show();
          let opportunityId: any = this.dialogboxDetails['opportunityInfo']['oppId'];
          this._opportunityService.updateOpportunityById(payload, opportunityId).subscribe({
               next: (res) => {
                    this._toaster.success('Opportunity Updated Successfully.');
                    this.hidePopupBox({ status: true, refresh: true });
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toastr.error(error.message);
               }
          });
     }

     public createOpportunityPayload() {
          let formValue = this.popupOpportunityForm.getRawValue();
          let payload = {
               email: formValue['Email'],
               fName: formValue['FirstName'],
               lName: formValue['LastName'],
               phone: formValue['PhoneNumber'],
               companyName: formValue['CompanyName'],
               jobTitle: formValue['JobTitle'],
               leadSrc: formValue['LeadSource'],
               leadStatus: formValue['LeadStatus'],
               isDemoActive: formValue['IsDemoActive'],
               productType: formValue['ProductType']
          };
          return payload;
     }

     public displaySingleFormError() {
          this.formErrors = this.globalFormValidators.displaySingleFormError(this.popupOpportunityForm, this.formErrors, this.validationMessage);
     }

     public displayAllFormError(): any {
          this.formErrors = this.globalFormValidators.displayAllFormErrors(this.popupOpportunityForm, this.formErrors, this.validationMessage);
     }

     public displayNestedFormSingleError(groupKey: any) {
          let formErrors = this.formErrors[groupKey];
          let validationsMessages = this.validationMessage[groupKey];
          let formgroup: FormGroup = this.popupOpportunityForm.get(groupKey) as FormGroup;
          this.formErrors[groupKey] = this.globalFormValidators.displaySingleFormError(formgroup, formErrors, validationsMessages);
     }

     public displayNestedFormAllErrors() {
          Object.entries(this.formErrors).forEach(([key, innerObject], index) => {
               let formErrors = this.formErrors[key];
               let validationsMessages = this.validationMessage[key];
               let formgroup: FormGroup = this.popupOpportunityForm.get(key) as FormGroup;
               this.formErrors[key] = this.globalFormValidators.displayAllFormErrors(formgroup, formErrors, validationsMessages);
          });
     }

     public hidePopupBox(payload = { status: false, refresh: false }) {
          this._dialogRef.close(payload);
     }
}
