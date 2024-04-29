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
     selector: 'app-building-popup',
     templateUrl: './building-popup.component.html',
     styleUrl: './building-popup.component.scss'
})
export class BuildingPopupComponent implements OnInit {
     public dialogboxDetails: any = null;
     public dialogBoxMaxWidth: any = '60vw';

     public popupInventoryForm: FormGroup;
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
          private _buildingResponseService: BuildingResponseService,
          private _broadcastService: BroadcastService,
          private _storageService: StorageService,
          private _toaster: ToastrService,
          private _spinner: NgxSpinnerService,
          @Inject(MAT_DIALOG_DATA) private _DIALOG_DATA: any,
          private _dialogRef: MatDialogRef<BuildingPopupComponent>,
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
               } else if (this.dialogboxDetails['action']['level'] == 'UNIT') {
                    this.initializeUnitInformations();
               } else if (this.dialogboxDetails['action']['level'] == 'LEASE') {
                    this.initializeLeaseInformations();
               }
          }
     }

     public initializeFloorInformations() {
          if (this._storageService.getInventoryFloorInformation()) {
               this.dummyPopupStorageRecords = this._storageService.getInventoryFloorInformation();
          }
          this.popupInventoryTemplate = this.inventoryHelper.inventoryFloorObjectTemplate;
          this.popupInventoryTemplate = this._inventoryService.initializeFloorMenus(this.popupInventoryTemplate);
          this.initializeInventoryFloorFormsPayload();
          this.createFormErrorFields(this.popupInventoryTemplate);
     }

     public initializeUnitInformations() {
          if (this._storageService.getInventoryUnitInformation()) {
               this.dummyPopupStorageRecords = this._storageService.getInventoryUnitInformation();
          }
          this.popupInventoryTemplate = this.inventoryHelper.inventoryUnitObjectTemplate;
          let floors = this.dialogboxDetails['floors'];
          this.popupInventoryTemplate = this._inventoryService.initializeUnitMenus(this.popupInventoryTemplate, floors);
          this.initializeInventoryUnitFormsPayload();
          this.createFormErrorFields(this.popupInventoryTemplate);
     }

     public initializeLeaseInformations() {
          if (this._storageService.getInventoryBuildingLeaseInformation()) {
               this.dummyPopupStorageRecords = this._storageService.getInventoryBuildingLeaseInformation();
          }
          this.popupInventoryTemplate = this.inventoryHelper.inventoryLeaseObjectTemplate;
          this.initializeInventoryLeaseFormsPayload();
          this.createNestedFormErrorFields(this.popupInventoryTemplate);
     }

     public initializeInventoryFloorFormsPayload() {
          if (this._storageService.getInventoryFloorIdForUpdate()) {
               this.isOpenedForUpdate = true;
               let oldInventoryFloorInfo: any = this.dialogboxDetails.floor;
               this.popupInventoryTemplate = this._inventoryService.setDefaultFloorValue(this.popupInventoryTemplate, oldInventoryFloorInfo);
               this.createDynamicForm(this.popupInventoryTemplate);
          } else {
               this.isOpenedForUpdate = false;
               let oldInventoryFloorInfo = this.globalVariables._tempInventoryFloorInfo;
               this.popupInventoryTemplate = this._inventoryService.setDefaultFloorValue(this.popupInventoryTemplate, oldInventoryFloorInfo);
               this.createDynamicForm(this.popupInventoryTemplate);
          }
     }

     public initializeInventoryUnitFormsPayload() {
          if (this._storageService.getInventoryUnitIdForUpdate()) {
               this.isOpenedForUpdate = true;
               let oldInventoryUnitInfo: any = this.dialogboxDetails.unit;
               this.popupInventoryTemplate = this._inventoryService.setDefaultUnitValue(this.popupInventoryTemplate, oldInventoryUnitInfo);
               this.createDynamicForm(this.popupInventoryTemplate);
          } else {
               this.isOpenedForUpdate = false;
               let oldInventoryUnitInfo = this.globalVariables._tempInventoryUnitInfo;
               this.popupInventoryTemplate = this._inventoryService.setDefaultUnitValue(this.popupInventoryTemplate, oldInventoryUnitInfo);
               this.createDynamicForm(this.popupInventoryTemplate);
          }
     }

     public initializeInventoryLeaseFormsPayload() {
          if (this._storageService.getInventoryBuildingLeaseIdForUpdate()) {
               this.isOpenedForUpdate = true;
               let leaseId = this._storageService.getInventoryBuildingLeaseIdForUpdate();
               let oldLeaseInfo: any = null;

               if (this.dummyPopupStorageRecords && this.dummyPopupStorageRecords.length > 0) {
                    this.dummyPopupStorageRecords.forEach((element: any) => {
                         if (element['LeaseId'] == leaseId) {
                              oldLeaseInfo = element;
                         }
                    });
               }

               if (oldLeaseInfo) {
                    this.popupInventoryTemplate = this._inventoryService.setDefaultLeaseValue(this.popupInventoryTemplate, oldLeaseInfo['LeaseAbstract']);
                    this.createDynamicNestedForm(this.popupInventoryTemplate);
               } else {
                    this.isOpenedForUpdate = false;
                    let oldLeaseInfo = this.globalVariables._tempInventoryLeaseInfo;
                    this.popupInventoryTemplate = this._inventoryService.setDefaultLeaseValue(this.popupInventoryTemplate, oldLeaseInfo['LeaseAbstract']);
                    this.createDynamicNestedForm(this.popupInventoryTemplate);
               }
          } else {
               this.isOpenedForUpdate = false;
               let oldLeaseInfo = this.globalVariables._tempInventoryLeaseInfo;
               this.popupInventoryTemplate = this._inventoryService.setDefaultLeaseValue(this.popupInventoryTemplate, oldLeaseInfo['LeaseAbstract']);
               this.createDynamicNestedForm(this.popupInventoryTemplate);
          }
     }

     public createDynamicForm(templateObject: any) {
          this.popupInventoryForm = this._formBuilder.group(this.getDynamicFormGroup(templateObject));
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
                    if (this._storageService.getInventoryFloorIdForUpdate()) {
                         this.updateFloor();
                    } else {
                         this.createFloor();
                    }
               } else if (this.dialogboxDetails['action']['level'] == 'UNIT') {
                    if (this._storageService.getInventoryUnitIdForUpdate()) {
                         this.updateUnit();
                    } else {
                         this.createUnit();
                    }
               } else if (this.dialogboxDetails['action']['level'] == 'LEASE') {
                    if (this._storageService.getInventoryBuildingLeaseIdForUpdate()) {
                         this.updateInventoryBuildingLease();
                    } else {
                         this.createInventoryBuildingLease();
                    }
               }
          } else {
               if (this.dialogboxDetails['action']['level'] == 'LEASE') {
                    this.displayNestedFormAllErrors();
               } else {
                    this.displayAllFormError();
               }
          }
     }

     public createFloor() {
          let floorFormValue = this.popupInventoryForm.getRawValue();
          let buildingInfo = this.getCurrentBuildingDetails();
          if (buildingInfo) {
               let payload = this.generateFloorPayload(floorFormValue, buildingInfo);
               this._spinner.show();
               this._buildingResponseService.createBuildingFloor(payload).subscribe({
                    next: (res) => {
                         this._spinner.hide();
                         this._toaster.success('Floor Added Successfully.');
                         this.hidePopupBox({ status: true, refresh: true });
                    },
                    error: (error) => {
                         this._spinner.hide();
                         this._toaster.error(error.message);
                    }
               });
          }
     }

     public updateFloor() {
          let floorFormValue = this.popupInventoryForm.getRawValue();
          let buildingInfo = this.getCurrentBuildingDetails();
          if (buildingInfo) {
               let payload = this.generateFloorPayload(floorFormValue, buildingInfo);
               this._spinner.show();
               let floorId: any = this.dialogboxDetails.floor.FloorId;
               this._buildingResponseService.updateBuildingFloorById(payload, floorId).subscribe({
                    next: (res) => {
                         this._spinner.hide();
                         this._toaster.success('Floor Updated Successfully.');
                         this.hidePopupBox({ status: true, refresh: true });
                    },
                    error: (error) => {
                         this._spinner.hide();
                         this._toaster.error(error.message);
                    }
               });
          }
     }

     public generateFloorPayload(floorFormValue: any, buildingInfo: any) {
          return {
               NoOfFireExit: 0,
               AutoCadFiles: [],
               FloorPlanImages: [],
               SortOrderNumber: 0,
               ReferenceId: '1234567890',
               FloorName: floorFormValue['FloorNumber'],
               BuildingIdentifier: buildingInfo['BuildingIdentifier'],
               FloorNumber: floorFormValue['FloorNumber'],
               FloorPlate: Number(floorFormValue['FloorPlate'] ?? 0),
               FloorStackType: floorFormValue['FloorStackType'],
               AutoCadAvailable: floorFormValue['AutoCadAvailable'] == 'Yes' ? true : false,
               FloorPlanAvailable: floorFormValue['FloorPlanAvailable'] == 'Yes' ? true : false
          };
     }

     public createUnit() {
          let unitFormValue = this.popupInventoryForm.getRawValue();
          let floorInfo = this.getCurrentFloor(unitFormValue['FloorNumber']);
          if (floorInfo) {
               let payload = this.createUnitPayload(floorInfo, unitFormValue);
               this._spinner.show();
               this._buildingResponseService.createBuildingUnit(payload).subscribe({
                    next: (res) => {
                         this._spinner.hide();
                         this._broadcastService.triggerBuildingUnitsSubscription({});
                         this._toaster.success('Unit Added Successfully.');
                         this.hidePopupBox();
                    },
                    error: (error) => {
                         this._spinner.hide();
                         this._toaster.error(error.message);
                    }
               });
          }
     }

     public updateUnit() {
          let unitFormValue = this.popupInventoryForm.getRawValue();
          let floorInfo = this.getCurrentFloor(unitFormValue['FloorNumber']);
          if (floorInfo) {
               let payload = this.createUnitPayload(floorInfo, unitFormValue);
               this._spinner.show();
               let unitId: any = this.dialogboxDetails['unit']['UnitId'];
               this._buildingResponseService.updateBuildingUnitById(payload, unitId).subscribe({
                    next: (res) => {
                         this._spinner.hide();
                         this._broadcastService.triggerBuildingUnitsSubscription({});
                         this._toaster.success('Unit Updated Successfully.');
                         this.hidePopupBox();
                    },
                    error: (error) => {
                         this._spinner.hide();
                         this._toaster.error(error.message);
                    }
               });
          }
     }

     public createUnitPayload(floorInfo: any, unitFormValue: any) {
          return {
               FloorIdentifier: floorInfo['FloorIdentifier'],
               UnitName: unitFormValue['UnitName'],
               UnitStatus: unitFormValue['UnitStatus'],
               Availability: unitFormValue['Availability'],
               OccupierName: unitFormValue['OccupierName'],
               RentRange: unitFormValue['RentRangeMin'] + '-' + unitFormValue['RentRangeMax'],
               UnitImages: [],
               UnitArea: Number(unitFormValue['UnitArea'] ?? 0),
               TypeOfSpace: unitFormValue['TypeOfSpace'],
               UnitRemarks: unitFormValue['UnitRemarks'],
               IsAvailableForSale: unitFormValue['IsAvailableForSale'] == 'Yes' ? true : false,
               UnitBifurcationPossible: unitFormValue['UnitBifurcationPossible'] == 'Yes' ? true : false,
               MinBifurcationArea: Number(unitFormValue['MinBifurcationArea'] ?? 0),
               UnitCombinationPossible: unitFormValue['UnitCombinationPossible'] == 'Yes' ? true : false,
               CombinationUnits: unitFormValue['CombinationUnits'],
               UnitContactDetails: unitFormValue['UnitContactDetails'],
               UnitContactName: unitFormValue['UnitContactName'],
               UnitContactDesignation: unitFormValue['UnitContactDesignation'],
               UnitContactEmail: unitFormValue['UnitContactEmail'],
               UnitContactPhoneNumber: unitFormValue['UnitContactPhoneNumber'],
               OccupierIndustry: unitFormValue['OccupierIndustry'],
               SortOrderNumber: 0
          };
     }

     public getCurrentFloor(floorIdentifier: any) {
          let floors = this.dialogboxDetails.floors;
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

     public createInventoryBuildingLease() {
          let _tempLeasePayload: any = {};

          if (this.buildingIdentifier) {
               _tempLeasePayload['LeaseId'] = uuidv4();
               _tempLeasePayload['LeaseIdentifier'] = 'Lease_' + uuidv4();
               _tempLeasePayload['BuildingIdentifier'] = this.buildingIdentifier;
               _tempLeasePayload['LeaseAbstract'] = this.popupInventoryForm.getRawValue();

               this.dummyPopupStorageRecords.push(_tempLeasePayload);
               this._storageService.setInventoryBuildingLeaseInformation(this.dummyPopupStorageRecords);
               this._broadcastService.triggerBuildingLeasesSubscription({});
               this._toaster.success('Lease Added Successfully.');
               this.hidePopupBox();
          }
     }

     public updateInventoryBuildingLease() {
          let leaseId = this._storageService.getInventoryBuildingLeaseIdForUpdate();

          if (this.dummyPopupStorageRecords && this.dummyPopupStorageRecords.length > 0) {
               let leaseIndex: any = null;
               let oldLeaseInfo: any = null;

               this.dummyPopupStorageRecords.forEach((element: any, index: number) => {
                    if (element['LeaseId'] == leaseId) {
                         leaseIndex = index;
                         oldLeaseInfo = element;
                    }
               });

               let _tempLeasePayload: any = {};

               _tempLeasePayload['LeaseId'] = oldLeaseInfo['LeaseId'];
               _tempLeasePayload['LeaseIdentifier'] = oldLeaseInfo['LeaseIdentifier'];
               _tempLeasePayload['BuildingIdentifier'] = oldLeaseInfo['BuildingIdentifier'];
               _tempLeasePayload['LeaseAbstract'] = this.popupInventoryForm.getRawValue();

               if (leaseIndex || leaseIndex == 0) {
                    this.dummyPopupStorageRecords[leaseIndex] = _tempLeasePayload;
                    this._storageService.setInventoryBuildingLeaseInformation(this.dummyPopupStorageRecords);
                    this._storageService.setInventoryBuildingLeaseIdForUpdate(null);
                    this._broadcastService.triggerBuildingLeasesSubscription({});
                    this._toaster.success('Lease Updated Successfully.');
                    this.hidePopupBox({ status: true, refresh: true });
               }
          }
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
