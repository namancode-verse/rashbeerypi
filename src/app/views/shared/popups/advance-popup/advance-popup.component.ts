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
import { BuildingResponseService } from '../../../../shared/services/building.response.service';

@Component({
     selector: 'app-advance-popup',
     templateUrl: './advance-popup.component.html',
     styleUrl: './advance-popup.component.scss'
})
export class AdvancePopupComponent implements OnInit {
     public dialogboxDetails: any = null;
     public dialogBoxMaxWidth: any = '60vw';

     public popupInventoryForm: FormGroup;
     public buildingStructureForm: FormGroup;

     public popupInventoryTemplate: any = {};
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
          private _formBuilder: FormBuilder,
          private _inventoryService: InventoryService,
          private _broadcastService: BroadcastService,
          private _buildingResponseService: BuildingResponseService,
          private _toaster: ToastrService,
          private _spinner: NgxSpinnerService,
          private _storageService: StorageService,
          @Inject(MAT_DIALOG_DATA) private _DIALOG_DATA: any,
          private _dialogRef: MatDialogRef<AdvancePopupComponent>,
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
               this.buildingIdentifier = this.dialogboxDetails['buildingIdentifier'];

               if (this.dialogboxDetails['action']['popupMaxWidth']) {
                    this.dialogBoxMaxWidth = this.dialogboxDetails['action']['popupMaxWidth'];
               } else {
                    this.dialogBoxMaxWidth = '60vw';
               }
               if (this.dialogboxDetails['action']['level'] == 'FLOOR') {
                    this.initializeFloorInformations();
               }
          }
     }

     public initializeFloorInformations() {
          this.popupInventoryTemplate = this.inventoryHelper.inventoryFloorObjectTemplate;
          this.popupInventoryTemplate = this._inventoryService.initializeFloorMenus(this.popupInventoryTemplate);
          this.initializeInventoryFloorFormsPayload();
          this.createFormErrorFields(this.popupInventoryTemplate);
     }

     public initializeInventoryFloorFormsPayload() {
          if (this.popupInventoryTemplate['FloorNumber']) {
               this.popupInventoryTemplate['FloorNumber']['default']['value'] = 'Auto Generate';
               this.popupInventoryTemplate['FloorNumber']['default']['styles']['disabled'] = true;
          }
          this.createDynamicForm(this.popupInventoryTemplate, 'Floor');
          this.createBuildingStructureForm();
     }

     public createBuildingStructureForm() {
          let buildingInfo = this.getCurrentBuildingDetails();

          let buildingStructure = buildingInfo['BuildingDetails']['BuildingStructure'];
          let splittedStructure = buildingStructure.split('+');

          let basementString = splittedStructure[0];
          let floor = splittedStructure[2];
          let basement = basementString.substring(0, basementString.length - 1);

          this.buildingStructureForm = new FormGroup({
               basement: new FormControl(basement, [Validators.required]),
               ground: new FormControl('1', [Validators.required]),
               floor: new FormControl(floor, [Validators.required])
          });
     }

     public createDynamicForm(templateObject: any, calledBy: any = null) {
          this.popupInventoryForm = this._formBuilder.group(this.getDynamicFormGroup(templateObject));
          if (calledBy == 'Floor') {
               this.popupInventoryForm.get('FloorNumber').disable();
          }
     }

     public createDynamicNestedForm(templateObject: any) {
          let _tempFormGroup = {};
          Object.entries(templateObject).forEach(([key, innerObject], index) => {
               _tempFormGroup[key] = this._formBuilder.group(this.getDynamicFormGroup(innerObject));
          });
          this.popupInventoryForm = this._formBuilder.group(_tempFormGroup);
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

     public createFormErrorFields(popupInventoryTemplate: any) {
          let _tempObject = this.createFormErrorInnerFields(popupInventoryTemplate);
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

     public submitpopupInventoryForm() {
          if (this.popupInventoryForm.valid) {
               if (this.dialogboxDetails['action']['level'] == 'FLOOR') {
                    if (this.buildingStructureForm.valid) {
                         this.createFloor();
                    } else {
                         this._toaster.error('Please enter Basement and Floor.');
                    }
               }
          } else {
               this.displayAllFormError();
          }
     }

     public createFloor() {
          let bsFormValue = this.buildingStructureForm.getRawValue();
          let floorFormValue = this.popupInventoryForm.getRawValue();
          let floorNumbers = this.generateSequence(Number(bsFormValue.basement), Number(bsFormValue.floor));
          let buildingInfo = this.getCurrentBuildingDetails();
          if (buildingInfo) {
               let payloads = [];
               floorNumbers.forEach((floorNumber: any) => {
                    let _tempPayload = this.generateFloorPayload(floorNumber, floorFormValue, buildingInfo);
                    payloads.push(_tempPayload);
               });
               this._spinner.show();
               this._buildingResponseService.createBuildingFloor(payloads).subscribe({
                    next: (res) => {
                         this._spinner.hide();
                         this._toaster.success('Floors Added Successfully.');
                         this._broadcastService.triggerBuildingFloorsSubscription({});
                         this._broadcastService.triggerBuildingUnitsSubscription({});
                         this.hidePopupBox();
                    },
                    error: (error) => {
                         this._spinner.hide();
                         this._toaster.error(error.message);
                    }
               });
          }
     }

     public generateFloorPayload(floorNumber: any, floorFormValue: any, buildingInfo: any) {
          return {
               NoOfFireExit: 0,
               AutoCadFiles: [],
               FloorPlanImages: [],
               SortOrderNumber: 0,
               ReferenceId: '1234567890',
               FloorName: floorNumber.toString(),
               BuildingIdentifier: buildingInfo['BuildingIdentifier'],
               FloorNumber: floorNumber.toString(),
               FloorPlate: Number(floorFormValue['FloorPlate'] ?? 0),
               FloorStackType: floorFormValue['FloorStackType'],
               AutoCadAvailable: floorFormValue['AutoCadAvailable'] == 'Yes' ? true : false,
               FloorPlanAvailable: floorFormValue['FloorPlanAvailable'] == 'Yes' ? true : false
          };
     }

     public generateSequence(basement: number, floor: number): number[] {
          const sequence: number[] = [];
          for (let i = -basement; i < 0; i++) {
               sequence.push(i);
          }
          sequence.push(0);
          for (let i = 1; i <= floor; i++) {
               sequence.push(i);
          }
          return sequence;
     }

     public getCurrentFloor(floorIdentifier: any) {
          let floors = this._storageService.getInventoryFloorInformation();
          let floorInfo: any = null;
          if (floors && floors.length > 0) {
               floors.forEach((floor: any) => {
                    if (floor.FloorIdentifier == floorIdentifier) {
                         floorInfo = floor;
                    }
               });
          }
          return floorInfo;
     }

     public getCurrentBuildingDetails() {
          return this.dialogboxDetails['buildingDetails'];
     }

     public displaySingleFormError() {
          this.formErrors = this.globalFormValidators.displaySingleFormError(this.popupInventoryForm, this.formErrors, this.validationMessage);
     }

     public displayAllFormError(): any {
          this.formErrors = this.globalFormValidators.displayAllFormErrors(this.popupInventoryForm, this.formErrors, this.validationMessage);
     }

     public displayNestedFormSingleError(groupKey: any) {
          let formErrors = this.formErrors[groupKey];
          let validationsMessages = this.validationMessage[groupKey];
          let formgroup: FormGroup = this.popupInventoryForm.get(groupKey) as FormGroup;
          this.formErrors[groupKey] = this.globalFormValidators.displaySingleFormError(formgroup, formErrors, validationsMessages);
     }

     public displayNestedFormAllErrors() {
          Object.entries(this.formErrors).forEach(([key, innerObject], index) => {
               let formErrors = this.formErrors[key];
               let validationsMessages = this.validationMessage[key];
               let formgroup: FormGroup = this.popupInventoryForm.get(key) as FormGroup;
               this.formErrors[key] = this.globalFormValidators.displayAllFormErrors(formgroup, formErrors, validationsMessages);
          });
     }

     public hidePopupBox(payload = { status: false, refresh: false }) {
          this._dialogRef.close(payload);
     }
}
