import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { MapInfoWindow } from '@angular/google-maps';
import { StorageService } from '../../../shared/services/storage.service';
import { BroadcastService } from '../../../shared/services/broadcast.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { BuildingPopupComponent } from '../../shared/popups/building-popup/building-popup.component';
import { BuildingFields } from '../../../shared/interfaces/common.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { BuildingResponseService } from '../../../shared/services/building.response.service';
import { AlertBoxComponent } from '../../shared/popups/alert-box/alert-box.component';
import { UploadFilesPopupComponent } from '../../shared/popups/upload-files-popup/upload-files-popup.component';
import { UploadImagesPopupComponent } from '../../shared/popups/upload-images-popup/upload-images-popup.component';
import { BuildingResponseHelpers } from '../../../shared/helpers/building-response-helper';

@Component({
     selector: 'app-buildings',
     templateUrl: './buildings.component.html',
     styleUrls: ['./buildings.component.scss'],
     providers: [SpinnerService, DatePipe]
})
export class BuildingsComponent implements OnInit {
     @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
     public tableSearchText: string;
     public buildings: any = [];
     public buildingsList: any = [];
     public filteredBuildingsList: any = [];
     public payloadSubscription: any = {};
     public responseHelper: BuildingResponseHelpers;

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
          this.getBuildings();
          this.listenSearchPayloadSubscription();
          this.responseHelper = new BuildingResponseHelpers();
     }

     ngOnInit(): void {}

     public getBuildings() {
          this._spinner.show();
          this._buildingResponseService.getBuildingResponses().subscribe({
               next: (res) => {
                    this._spinner.hide();
                    this.buildings = res.data;
                    this.setBuildingsDetails();
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toaster.error(error.message);
               }
          });
     }

     public setBuildingsDetails() {
          if (this.buildings && this.buildings.length > 0) {
               let _tempBuildingsList = [];
               this.buildings.forEach((building: any) => {
                    let bh = building['Header'];
                    let ba = building['Header']['BuildingAddress'];
                    let bd = building['BuildingDetails'];
                    let _tempInventory: BuildingFields = {
                         BuildingId: building['_id'],
                         BuildingName: bh['BuildingName'],
                         BuildingDescription: bh['BuildingDescription'],
                         BuildingTitle: bh['BuildingTitle'],
                         City: ba['City'],
                         PinCode: ba['PinCode'],
                         State: ba['State'],
                         BuildingStructure: bd['BuildingStructure'],
                         MicroMarket: bd['MicroMarket'],
                         BuildYear: bd['BuildYear'],
                         OwnershipType: bd['OwnershipType'],
                         IsActive: building['IsActive'],
                         BuildingIdentifier: building['BuildingIdentifier']
                    };
                    _tempBuildingsList.push(_tempInventory);
               });
               this.buildingsList = _tempBuildingsList;
               this.filteredBuildingsList = _tempBuildingsList;
          }
     }

     public listenSearchPayloadSubscription() {
          this.payloadSubscription = this._broadcastService.searchPayloadListenerEvent$.subscribe((res) => {});
     }

     public createFloor(building: any) {
          let _tempPayload = {
               action: {
                    level: 'FLOOR',
                    type: 'CREATE',
                    title: 'Create Floor'
               },
               inventory: building
          };
          const enterAnimationDuration: string = '300ms';
          const exitAnimationDuration: string = '300ms';
          this._storageService.setInventoryFloorIdForUpdate(null);
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
               .subscribe((response) => {});
     }

     public editBuilding(building: any) {
          let identification = {
               BuildingId: building['BuildingId'],
               BuildingIdentifier: building['BuildingIdentifier']
          };
          this._storageService.setBuildingIdentificationForUpdate(identification);
          this._router.navigate(['inventory', 'building']);
     }

     public removeBuilding(buildingInfo: any) {
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
                         buildingInfo: buildingInfo
                    }
               })
               .afterClosed()
               .subscribe((response) => {
                    if (response && response.status) {
                         this.deleteBuildingById(buildingInfo['BuildingId']);
                    }
               });
     }

     public deleteBuildingById(id: any) {
          this._spinner.show();
          this._buildingResponseService.deleteBuildingResponseById(id).subscribe({
               next: (res) => {
                    this._spinner.hide();
                    this._toaster.success('Building Removed Successfully.');
                    this.getBuildings();
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
          this.buildingsList.forEach((element: any) => {
               // prettier-ignore
               if ( element.BuildingName.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.BuildingDescription.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.BuildingTitle.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.BuildingStructure.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.City.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.State.toString().toLowerCase().indexOf(searchText) != -1 ||
                    element.MicroMarket.toString().toLowerCase().indexOf(searchText) != -1
                  ) {
                    filteredData.push(element);
                    }
          });
          this.filteredBuildingsList = filteredData;
     }

     public navigateToNextScreen(path: any) {
          if (path == '/inventory/building') {
               this._storageService.setBuildingIdentificationForUpdate(null);
          }
          this._router.navigateByUrl(path);
     }

     public uploadBuildingCSVFile() {
          let payload = {
               status: true,
               category: 'Building',
               boxTitle: 'Upload Buildings'
          };
          this.openFileUploadDialogBox(payload);
     }

     public uploadBuildingFloorCSVFile() {
          let payload = {
               status: true,
               category: 'BuildingFloor',
               boxTitle: 'Upload Building Floors'
          };
          this.openFileUploadDialogBox(payload);
     }

     public uploadBuildingUnitCSVFile() {
          let payload = {
               status: true,
               category: 'BuildingFloorUnit',
               boxTitle: 'Upload Building Floor Units'
          };
          this.openFileUploadDialogBox(payload);
     }

     public uploadLeaseCSVFile() {
          let payload = {
               status: true,
               category: 'BuildingLease',
               boxTitle: 'Upload Lease',
               responseId: '',
               autoClick: true,
               buildingId: '',
               buildingIdentifier: ''
          };
          this.openFileUploadDialogBox(payload);
     }

     public openFileUploadDialogBox(payload: any) {
          const enterAnimationDuration: string = '300ms';
          const exitAnimationDuration: string = '300ms';
          this._dialog
               .open(UploadFilesPopupComponent, {
                    enterAnimationDuration,
                    exitAnimationDuration,
                    maxWidth: '100vw',
                    maxHeight: '95vh',
                    panelClass: 'upload-file-dialog-box',
                    disableClose: true,
                    data: payload,
                    scrollStrategy: this._overlay.scrollStrategies.block()
               })
               .afterClosed()
               .subscribe((response) => {
                    if (response && response.status) {
                         this.getBuildings();
                    }
               });
     }

     public showUploadImagePopupBox(buildingInfo: any, category: any) {
          category = 'BuildingImage';
          let uploadObject = this.responseHelper.getUploadPayloadForBuildingImage(buildingInfo.BuildingId, buildingInfo.BuildingIdentifier, category);
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
                         this.getBuildings();
                    }
               });
     }
}
