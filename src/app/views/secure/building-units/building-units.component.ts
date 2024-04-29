import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { StorageService } from '../../../shared/services/storage.service';
import { BroadcastService } from '../../../shared/services/broadcast.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { BuildingPopupComponent } from '../../shared/popups/building-popup/building-popup.component';
import { BuildingUnitFields } from '../../../shared/interfaces/common.interface';
import { BuildingResponseService } from '../../../shared/services/building.response.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertBoxComponent } from '../../shared/popups/alert-box/alert-box.component';
import { UploadImagesPopupComponent } from '../../shared/popups/upload-images-popup/upload-images-popup.component';
import { BuildingResponseHelpers } from '../../../shared/helpers/building-response-helper';

@Component({
     selector: 'app-building-units',
     templateUrl: './building-units.component.html',
     styleUrl: './building-units.component.scss',
     providers: [SpinnerService, DatePipe]
})
export class BuildingUnitsComponent implements OnInit, OnDestroy {
     public tableSearchText: string;
     public unitSubscription: any = {};
     public buildingFloors: any = [];
     public isExistFloors: boolean = false;
     public buildingUnits: any = [];
     public buildingUnitList: any = [];
     public filteredBuildingUnitList: any = [];
     public responseHelper: BuildingResponseHelpers;
     @Input() buildingDetails: any = null;

     // prettier-ignore
     constructor(
          private _router: Router,
          private _toaster: ToastrService,
          private _dialog: MatDialog,
          private _overlay: Overlay,
          private _storageService: StorageService,
          private _broadcastService: BroadcastService, 
          private _spinner: NgxSpinnerService,
          private _buildingResponseService: BuildingResponseService,
     ) {
          this.responseHelper = new BuildingResponseHelpers();
     }

     ngOnInit(): void {
          if (this.buildingDetails) {
               this.listenSubscription();
               this.getBuildingFloors();
               this.getBuildingUnits();
          }
     }

     public listenSubscription() {
          this.unitSubscription = this._broadcastService.buildingUnitsEvent$.subscribe((res) => {
               this.getBuildingFloors();
               this.getBuildingUnits();
          });
     }

     ngOnDestroy(): void {
          if (this.unitSubscription) {
               this.unitSubscription.unsubscribe();
          }
     }

     public getBuildingUnits() {
          this._spinner.show();
          this._buildingResponseService.getBuildingUnits().subscribe({
               next: (res) => {
                    this._spinner.hide();
                    this.buildingUnits = res.data;
                    this.setInventoryUnitDetails();
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toaster.error(error.message);
               }
          });
     }

     public setInventoryUnitDetails() {
          if (this.buildingUnits && this.buildingUnits.length > 0) {
               this.filteredBuildingUnitList = [];

               this.buildingUnits.forEach((unitInfo: any) => {
                    let unitContact: any = null;
                    if (unitInfo['UnitContact']) {
                         unitContact = unitInfo['UnitContact'];
                    }
                    let _tempUnitInfo: BuildingUnitFields = {
                         UnitId: unitInfo['_id'],
                         FloorId: unitInfo['FloorId'],
                         BuildingIdentifier: this.buildingDetails['BuildingIdentifier'],
                         UnitIdentifier: unitInfo['UnitIdentifier'],
                         FloorIdentifier: unitInfo['FloorIdentifier'],
                         FloorNumber: unitInfo['FloorNumber'],
                         UnitName: unitInfo['UnitName'],
                         UnitStatus: unitInfo['UnitStatus'],
                         Availability: unitInfo['Availability'],
                         OccupierName: unitInfo['OccupierName'],
                         RentRange: unitInfo['RentRange'],
                         UnitArea: unitInfo['UnitArea'],
                         TypeOfSpace: unitInfo['TypeOfSpace'],
                         UnitRemarks: unitInfo['UnitRemarks'],
                         IsAvailableForSale: unitInfo['IsAvailableForSale'],
                         UnitContact: unitInfo['UnitContact'],
                         UnitContactName: unitContact['UnitContactName'],
                         UnitContactDesignation: unitContact['UnitContactDesignation'],
                         UnitContactEmail: unitContact['UnitContactEmail'],
                         UnitContactPhoneNumber: unitContact['UnitContactPhoneNumber'],
                         UnitBifurcationPossible: unitInfo['UnitBifurcationPossible'],
                         MinBifurcationArea: unitInfo['MinBifurcationArea'],
                         UnitCombinationPossible: unitInfo['UnitCombinationPossible'],
                         CombinationUnits: unitInfo['CombinationUnits'],
                         OccupierIndustry: unitInfo['OccupierIndustry'],
                         IsActive: unitInfo['IsActive']
                    };
                    this.filteredBuildingUnitList.push(_tempUnitInfo);
               });

               this.buildingUnitList = this.filteredBuildingUnitList;
          }
     }

     public createUnit() {
          this.getBuildingFloors();

          let _tempPayload = {
               action: {
                    level: 'UNIT',
                    type: 'CREATE',
                    title: 'Create Unit'
               },
               floor: null,
               floors: this.buildingFloors,
               buildingDetails: this.buildingDetails
          };

          this._storageService.setInventoryUnitIdForUpdate(null);
          this.showPopup(_tempPayload);
     }

     public editUnit(unitInfo: any) {
          let _tempPayload = {
               action: {
                    level: 'UNIT',
                    type: 'UPDATE',
                    title: 'Update Unit'
               },
               unit: unitInfo,
               floors: this.buildingFloors,
               buildingDetails: this.buildingDetails
          };
          this._storageService.setInventoryUnitIdForUpdate(unitInfo['UnitIdentifier']);
          this.showPopup(_tempPayload);
     }

     public createLease(unitInfo: any) {
          let _tempPayload = {
               action: {
                    level: 'LEASE',
                    type: 'CREATE',
                    title: 'Create Lease',
                    popupMaxWidth: '75vw'
               },
               unit: unitInfo
          };

          this._storageService.setInventoryBuildingLeaseIdForUpdate(null);
          this.showPopup(_tempPayload);
     }

     public showPopup(_tempPayload: any) {
          const enterAnimationDuration: string = '300ms';
          const exitAnimationDuration: string = '300ms';
          this._dialog
               .open(BuildingPopupComponent, {
                    enterAnimationDuration,
                    exitAnimationDuration,
                    maxWidth: '100vw',
                    maxHeight: '95vh',
                    panelClass: 'inventory-dialog-box',
                    disableClose: true,
                    data: _tempPayload,
                    scrollStrategy: this._overlay.scrollStrategies.block()
               })
               .afterClosed()
               .subscribe((response) => {
                    if (response && response.status) {
                         let action = _tempPayload['action'];
                         if (action['level'] == 'UNIT' && action['type'] == 'UPDATE') {
                              this.setInventoryUnitDetails();
                         }
                    }
               });
     }

     public removeUnitPopup(unitInfo: any) {
          const enterAnimationDuration: string = '300ms';
          const exitAnimationDuration: string = '300ms';
          this._dialog
               .open(AlertBoxComponent, {
                    enterAnimationDuration,
                    exitAnimationDuration,
                    minWidth: '200px',
                    panelClass: 'common-dialog-box',
                    disableClose: false,
                    data: {
                         message: 'Are you sure want to permanently delete selected Record?',
                         unitInfo: unitInfo
                    }
               })
               .afterClosed()
               .subscribe((response) => {
                    if (response && response.status) {
                         this.removeUnit(unitInfo['UnitId']);
                    }
               });
     }

     public removeUnit(id: any) {
          this._spinner.show();
          this._buildingResponseService.deleteBuildingUnitById(id).subscribe({
               next: (res) => {
                    this._spinner.hide();
                    this._toaster.success('Unit Removed Successfully.');
                    this.getBuildingUnits();
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toaster.error(error.message);
               }
          });
     }

     public searchByFreeText() {
          const searchText = this.tableSearchText.toLowerCase();
          const filteredData: any[] = [];
          this.buildingUnitList.forEach((element: any) => {
               // prettier-ignore
               if ( element.FloorNumber.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.UnitName.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.UnitStatus.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.Availability.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.OccupierName.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.RentRange.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.UnitArea.toString().toLowerCase().indexOf(searchText) != -1
                  ) {
                    filteredData.push(element);
                    }
          });
          this.filteredBuildingUnitList = filteredData;
     }

     public getBuildingFloors() {
          this._spinner.show();
          this._buildingResponseService.getBuildingFloors().subscribe({
               next: (res) => {
                    this._spinner.hide();
                    this.buildingFloors = res.data;
                    if (this.buildingFloors && this.buildingFloors.length > 0) {
                         this.isExistFloors = true;
                    } else {
                         this.isExistFloors = false;
                    }
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toaster.error(error.message);
               }
          });
     }

     public showUploadImagePopupBox(unitInfo: any, category: any) {
          let buildingIdentifier: any = unitInfo.BuildingIdentifier;
          let floorIdentifier: any = unitInfo.FloorIdentifier;
          let unitIdentifier: any = unitInfo.UnitIdentifier;
          let uploadObject = this.responseHelper.getUploadPayloadForUnitImage(this.buildingDetails._id, buildingIdentifier, category, floorIdentifier, unitIdentifier);
          if (uploadObject.status) {
               this.showUploadImageDialogbox(uploadObject.data);
          }
     }

     public showUploadImageDialogbox(payload: any) {
          const enterAnimationDuration: string = '300ms';
          const exitAnimationDuration: string = '300ms';
          this._dialog
               .open(UploadImagesPopupComponent, {
                    enterAnimationDuration,
                    exitAnimationDuration,
                    maxWidth: '100vw',
                    maxHeight: '95vh',
                    panelClass: 'upload-images-dialog-box',
                    disableClose: true,
                    data: payload,
                    scrollStrategy: this._overlay.scrollStrategies.block()
               })
               .afterClosed()
               .subscribe((response) => {
                    if (response && response.status) {
                         this.getBuildingUnits();
                    }
               });
     }
}
