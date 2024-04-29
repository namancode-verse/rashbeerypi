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
import { BuildingFloorFields } from '../../../shared/interfaces/common.interface';
import { AdvancePopupComponent } from '../../shared/popups/advance-popup/advance-popup.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BuildingResponseService } from '../../../shared/services/building.response.service';
import { AlertBoxComponent } from '../../shared/popups/alert-box/alert-box.component';
import { UploadImagesPopupComponent } from '../../shared/popups/upload-images-popup/upload-images-popup.component';
import { BuildingResponseHelpers } from '../../../shared/helpers/building-response-helper';

@Component({
     selector: 'app-building-floors',
     templateUrl: './building-floors.component.html',
     styleUrl: './building-floors.component.scss',
     providers: [SpinnerService, DatePipe]
})
export class BuildingFloorsComponent implements OnInit, OnDestroy {
     public tableSearchText: string;
     public isBuildingExist: boolean = false;
     public floorSubscription: any = {};
     public buildingFloors: any = [];
     public buildingFloorsList: any = [];
     public filteredBuildingFloorsList: any = [];
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
       ){
          this.listenSubscription();          
          this.responseHelper = new BuildingResponseHelpers();
       }

     ngOnInit(): void {
          if (this.buildingDetails) {
               this.isBuildingExist = true;
               this.getAllFloors();
          }
     }

     public getAllFloors() {
          this._spinner.show();
          this._buildingResponseService.getBuildingFloors().subscribe({
               next: (res) => {
                    this._spinner.hide();
                    this.buildingFloors = res.data;
                    this.setInventoryFloorDetails();
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toaster.error(error.message);
               }
          });
     }

     public listenSubscription() {
          this.floorSubscription = this._broadcastService.buildingFloorsEvent$.subscribe((res) => {
               this.setInventoryFloorDetails();
          });
     }

     ngOnDestroy(): void {
          if (this.floorSubscription) {
               this.floorSubscription.unsubscribe();
          }
     }

     public setInventoryFloorDetails() {
          if (this.buildingFloors && this.buildingFloors.length > 0) {
               this.filteredBuildingFloorsList = [];
               this.buildingFloors.forEach((floor: any) => {
                    let _tempFloor: BuildingFloorFields = {
                         BuildingName: this.buildingDetails.Header.BuildingName,
                         BuildingTitle: this.buildingDetails.Header.BuildingTitle,
                         FloorId: floor['_id'],
                         BuildingIdentifier: floor['BuildingIdentifier'],
                         FloorIdentifier: floor['FloorIdentifier'],
                         FloorNumber: floor['FloorNumber'],
                         FloorPlate: floor['FloorPlate'],
                         FloorStackType: floor['FloorStackType'],
                         FloorPlanAvailable: floor['FloorPlanAvailable'],
                         AutoCadAvailable: floor['AutoCadAvailable'],
                         FloorPlanImages: floor['FloorPlanImages'],
                         AutoCadFiles: floor['AutoCadFiles'],
                         IsActive: floor['IsActive']
                    };
                    this.filteredBuildingFloorsList.push(_tempFloor);
               });

               this.buildingFloorsList = this.filteredBuildingFloorsList;
          }
     }

     public createFloor() {
          let _tempPayload = {
               action: {
                    level: 'FLOOR',
                    type: 'CREATE',
                    title: 'Create Floor'
               },
               buildingDetails: this.buildingDetails
          };
          this._storageService.setInventoryFloorIdForUpdate(null);
          this.showPopup(_tempPayload);
     }

     public editFloor(floorInfo: any) {
          let _tempPayload = {
               action: {
                    level: 'FLOOR',
                    type: 'UPDATE',
                    title: 'Update Floor'
               },
               floor: floorInfo,
               buildingDetails: this.buildingDetails
          };
          this._storageService.setInventoryFloorIdForUpdate(floorInfo['FloorIdentifier']);
          this.showPopup(_tempPayload);
     }

     public createUnit(floorInfo: any) {
          let _tempPayload = {
               action: {
                    level: 'UNIT',
                    type: 'CREATE',
                    title: 'Create Unit'
               },
               floor: floorInfo,
               floors: this.buildingFloorsList,
               buildingDetails: this.buildingDetails
          };

          this._storageService.setInventoryUnitIdForUpdate(null);
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
                         if (action['level'] == 'FLOOR') {
                              this.getAllFloors();
                         }
                    }
               });
     }

     public generateFloorByBuildingStructure() {
          let _tempPayload = {
               action: {
                    level: 'FLOOR',
                    type: 'CREATE',
                    title: 'Generate Floor By Building Structure'
               },
               buildingDetails: this.buildingDetails
          };

          const enterAnimationDuration: string = '300ms';
          const exitAnimationDuration: string = '300ms';
          this._dialog
               .open(AdvancePopupComponent, {
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
                         if (action['level'] == 'FLOOR') {
                              this.getAllFloors();
                         }
                    }
               });
     }

     public removeFloorPopup(floorInfo: any) {
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
                         floorInfo: floorInfo
                    }
               })
               .afterClosed()
               .subscribe((response) => {
                    if (response && response.status) {
                         this.removeUnit(floorInfo['FloorId']);
                    }
               });
     }

     public removeUnit(id: any) {
          this._spinner.show();
          this._buildingResponseService.deleteBuildingFloorById(id).subscribe({
               next: (res) => {
                    this._spinner.hide();
                    this._toaster.success('Floor Removed Successfully.');
                    this.getAllFloors();
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
          this.buildingFloorsList.forEach((element: any) => {
               // prettier-ignore
               if ( element.FloorNumber.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.FloorPlate.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.FloorStackType.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.FloorPlanAvailable.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.AutoCadAvailable.toString().toLowerCase().indexOf(searchText) != -1
                  ) {
                    filteredData.push(element);
                    }
          });
          this.filteredBuildingFloorsList = filteredData;
     }

     public navigateToNextScreen(path) {
          this._router.navigateByUrl(path);
     }

     public showUploadImagePopupBox(floorInfo: any, category: any) {
          let floorIdentifier: any = floorInfo.FloorIdentifier;
          let uploadObject = this.responseHelper.getUploadPayloadForFloorPlanOrAutoCadFile(this.buildingDetails._id, this.buildingDetails.BuildingIdentifier, category, floorIdentifier);
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
                         this.getAllFloors();
                    }
               });
     }
}
