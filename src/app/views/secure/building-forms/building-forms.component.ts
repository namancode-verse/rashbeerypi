import { GlobalFormValidators } from '../../../shared/form-validators/global-form-validators';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalVariables } from '../../../shared/constants/global-variables';
import { InventoryService } from '../../../shared/services/inventory.service';
import { StorageService } from '../../../shared/services/storage.service';
import { InventoryHelper } from '../../../shared/helpers/inventory-helper';
import { PayloadHelper } from '../../../shared/helpers/payload-helper';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { Overlay } from '@angular/cdk/overlay';
import { BroadcastService } from '../../../shared/services/broadcast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BuildingResponseService } from '../../../shared/services/building.response.service';

@Component({
     selector: 'app-building-forms',
     templateUrl: './building-forms.component.html',
     styleUrl: './building-forms.component.scss'
})
export class BuildingFormsComponent implements OnInit, OnDestroy {
     @ViewChild('buildingFormSubmitButton', { read: ElementRef }) public buildingFormSubmitButton: ElementRef;

     public buildingFormGroup: FormGroup;
     public buildingTemplate: any = {};
     public globalVariables: GlobalVariables;
     public payloadHelper: PayloadHelper;
     public inventoryHelper: InventoryHelper;
     public globalFormValidators: GlobalFormValidators;
     public formErrors: any;
     public validationMessage: any;
     public dummyBuildings: any = [];
     public isEnableEditing: boolean = false;
     public buildingIdentification: any = null;
     public currentBuildingDetails: any = null;

     // prettier-ignore
     constructor(
          private _toaster: ToastrService,
          private _spinner: NgxSpinnerService,
          private _location: Location,
          private _formBuilder: FormBuilder,
          private _storageService: StorageService,
          private _broadcastService: BroadcastService,
          private _inventoryService: InventoryService,
          private _buildingResponseService: BuildingResponseService,

     ){
          this.globalVariables = new GlobalVariables();
          this.payloadHelper = new PayloadHelper();
          this.inventoryHelper = new InventoryHelper();
          this.globalFormValidators = new GlobalFormValidators();

          if(this._storageService.getInventoryBuildingsInformation()){
               this.dummyBuildings = this._storageService.getInventoryBuildingsInformation();
          }
     }

     ngOnInit(): void {
          this.buildingTemplate = this.inventoryHelper.inventoryObjectTemplate;
          this.buildingTemplate = this._inventoryService.initializeMenus(this.buildingTemplate);
          this.initializeBuildingFormsPayload();
          this.createFormErrorsFields(this.buildingTemplate);
     }

     ngOnDestroy(): void {}

     public initializeBuildingFormsPayload() {
          if (this._storageService.getBuildingIdentificationForUpdate()) {
               this.isEnableEditing = true;
               this.buildingIdentification = this._storageService.getBuildingIdentificationForUpdate();
               this.getBuildingDetailsAndCreateForm();
          } else {
               this.isEnableEditing = false;
               let oldBuildingInfo = this.globalVariables.tempInventoryInfo;
               this.buildingTemplate = this._inventoryService.setDefaultValue(this.buildingTemplate, oldBuildingInfo);
               this.createDynamicForm(this.buildingTemplate);
          }
     }

     public getBuildingDetailsAndCreateForm() {
          this._spinner.show();
          this._buildingResponseService.getBuildingResponseById(this.buildingIdentification['BuildingId']).subscribe({
               next: (res) => {
                    this._spinner.hide();
                    this.currentBuildingDetails = res.data;
                    this.buildingTemplate = this._inventoryService.setDefaultValue(this.buildingTemplate, this.currentBuildingDetails);
                    this.createDynamicForm(this.buildingTemplate);
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toaster.error(error.message);
               }
          });
     }

     public createDynamicForm(templateObject: any) {
          let _tempFormGroup = {};
          Object.entries(templateObject).forEach(([key, innerObject], index) => {
               _tempFormGroup[key] = this._formBuilder.group(this.getDynamicFormGroup(innerObject));
          });
          this.buildingFormGroup = this._formBuilder.group(_tempFormGroup);
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

     public createFormErrorsFields(buildingTemplate: any) {
          let _tempErrorsFields = {};
          let _tempMessagesFields = {};
          Object.entries(buildingTemplate).forEach(([key, innerObject], index) => {
               let _tempObject = this.createFormErrorsInnerFields(innerObject);
               _tempErrorsFields[key] = _tempObject.errors;
               _tempMessagesFields[key] = _tempObject.messages;
          });
          this.formErrors = _tempErrorsFields;
          this.validationMessage = _tempMessagesFields;
     }

     public createFormErrorsInnerFields(object: any) {
          let _tempErrorsFields = {};
          let _tempMessagesFields = {};
          Object.entries(object).forEach(([key, innerObject], innerIndex) => {
               _tempErrorsFields[key] = '';
               let errorsMessages = {};

               innerObject['default']['validations'].forEach((validation: any) => {
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
               });

               _tempMessagesFields[key] = errorsMessages;
          });
          return { errors: _tempErrorsFields, messages: _tempMessagesFields };
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

     public submitBuildingForm() {
          if (this.buildingFormGroup.valid) {
               if (this._storageService.getBuildingIdentificationForUpdate()) {
                    this.updateBuilding();
               } else {
                    this.createBuilding();
               }
          } else {
               this.showAllFormsErrors();
               this._toaster.error('Form details is not valid.');
          }
     }

     public createBuilding() {
          let value = this.buildingFormGroup.getRawValue();
          let payload = this.payloadHelper.createBuildingResponsePayload(value);
          this._spinner.show();
          this._buildingResponseService.createBuildingResponse(payload).subscribe({
               next: (res) => {
                    this.currentBuildingDetails = res.data;
                    this.saveBuildingIdentification();
                    this._toaster.success('Building Added Successfully.');
                    this._spinner.hide();
                    this.goToNextTab();
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toaster.error(error.message);
               }
          });
     }

     public saveBuildingIdentification() {
          let identification = {
               BuildingId: this.currentBuildingDetails['_id'],
               BuildingIdentifier: this.currentBuildingDetails['BuildingIdentifier']
          };
          this._storageService.setBuildingIdentificationForUpdate(identification);
     }

     public updateBuilding() {
          let value = this.buildingFormGroup.getRawValue();
          let payload = this.payloadHelper.createBuildingResponsePayload(value);
          this._spinner.show();
          let buildingId = this.currentBuildingDetails['_id'];
          this._buildingResponseService.updateBuildingResponseById(payload, buildingId).subscribe({
               next: (res) => {
                    this.currentBuildingDetails = res.data;
                    this._toaster.success('Building Updated Successfully.');
                    this._spinner.hide();
                    this.goToNextTab();
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toaster.error(error.message);
               }
          });
     }

     public printBuildingCertifications(value: any) {}

     public showAllFormsErrors() {
          Object.entries(this.formErrors).forEach(([key, innerObject], index) => {
               let _tempFormgroup: FormGroup = this.buildingFormGroup.get(key) as FormGroup;

               let _tempFormErrors = this.formErrors[key];
               let _tempValidationsMessages = this.validationMessage[key];
               this.formErrors[key] = this.displayAllFormError(_tempFormgroup, _tempFormErrors, _tempValidationsMessages);
          });
     }

     public displaySingleFormError(groupKey: any) {
          let _tempFormErrors = this.formErrors[groupKey];
          let _tempValidationsMessages = this.validationMessage[groupKey];
          let _tempFormgroup: FormGroup = this.buildingFormGroup.get(groupKey) as FormGroup;
          this.formErrors[groupKey] = this.globalFormValidators.displaySingleFormError(_tempFormgroup, _tempFormErrors, _tempValidationsMessages);
     }

     public displayAllFormError(group: FormGroup, formErrors: any, validationMessage: any): any {
          return this.globalFormValidators.displayAllFormErrors(group, formErrors, validationMessage);
     }

     public goToBackScreen() {
          this._location.back();
     }

     public goToNextTab() {
          this.buildingFormSubmitButton.nativeElement.click();
          this._broadcastService.triggerBuildingFloorsSubscription({});
     }
}
