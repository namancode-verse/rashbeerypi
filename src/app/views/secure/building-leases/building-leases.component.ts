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
import { BuildingLeaseFields } from '../../../shared/interfaces/common.interface';

@Component({
     selector: 'app-building-leases',
     templateUrl: './building-leases.component.html',
     styleUrl: './building-leases.component.scss',
     providers: [SpinnerService, DatePipe]
})
export class BuildingLeasesComponent implements OnInit, OnDestroy {
     public tableSearchText: string;
     public buildingLeaseList: any = [];
     public leaseSubscription: any = {};
     public filteredBuildingLeaseList: any = [];

     @Input() buildingDetails: any = null;

     // prettier-ignore
     constructor(
          private _router: Router,
          private _toaster: ToastrService,
          private _dialog: MatDialog,
          private _overlay: Overlay,
          private _storageService: StorageService,
          private _broadcastService: BroadcastService,
       ){}

     ngOnInit(): void {
          if (this.buildingDetails) {
               this.listenSubscription();
               this.setBuildingLeaseDetails();
          }
     }

     ngOnDestroy(): void {
          if (this.leaseSubscription) {
               this.leaseSubscription.unsubscribe();
          }
     }

     public listenSubscription() {
          this.leaseSubscription = this._broadcastService.buildingLeasesEvent$.subscribe((res) => {
               this.setBuildingLeaseDetails();
          });
     }

     public setBuildingLeaseDetails() {
          if (this._storageService.getInventoryBuildingLeaseInformation()) {
               this.filteredBuildingLeaseList = [];
               let buildingLeases = this._storageService.getInventoryBuildingLeaseInformation();

               buildingLeases.forEach((leaseInfo: any) => {
                    if (this.buildingDetails == leaseInfo['BuildingIdentifier']) {
                         let abstract = leaseInfo['LeaseAbstract'];
                         let _tempLease: BuildingLeaseFields = {
                              UnitId: leaseInfo['UnitId'] ?? '',
                              FloorId: leaseInfo['FloorId'] ?? '',
                              BuildingIdentifier: leaseInfo['BuildingIdentifier'],
                              FloorNumber: abstract['AreaDetails']['Floor'],
                              BuildingName: abstract['AreaDetails']['BuildingName'],
                              LeaseId: leaseInfo['LeaseId'],
                              UnitName: abstract['AreaDetails']['UnitNo'],
                              ChargeableAreaSqft: abstract['AreaDetails']['ChargeableAreaSqft'],
                              TypeOfLease: abstract['DatesAndTimelines']['TypeOfLease'],
                              Lessor: abstract['LessorDetails']['Lessor'],
                              Lessee: abstract['LesseeDetails']['Lessee'],
                              LeaseStatus: abstract['DatesAndTimelines']['LeaseStatus']
                         };
                         this.filteredBuildingLeaseList.push(_tempLease);
                    }
               });

               this.buildingLeaseList = this.filteredBuildingLeaseList;
          }
     }

     public createLease() {
          let _tempPayload = {
               action: {
                    level: 'LEASE',
                    type: 'CREATE',
                    title: 'Create Lease',
                    popupMaxWidth: '75vw'
               },
               buildingDetails: this.buildingDetails
          };

          this._storageService.setInventoryBuildingLeaseIdForUpdate(null);
          this.showPopup(_tempPayload);
     }

     public editLease(leaseInfo: any) {
          let _tempPayload = {
               action: {
                    level: 'LEASE',
                    type: 'UPDATE',
                    title: 'Update Lease',
                    popupMaxWidth: '75vw'
               },
               leaseInfo: leaseInfo,
               buildingDetails: this.buildingDetails
          };
          this._storageService.setInventoryBuildingLeaseIdForUpdate(leaseInfo['LeaseId']);
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
                         if (action['level'] == 'LEASE' && action['type'] == 'UPDATE') {
                              this.setBuildingLeaseDetails();
                         }
                    }
               });
     }

     public searchByFreeText() {
          const searchText = this.tableSearchText.toLowerCase();
          const filteredData: any[] = [];
          this.buildingLeaseList.forEach((element: any) => {
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
          this.filteredBuildingLeaseList = filteredData;
     }

     public removeLease(payload: any) {
          this.buildingLeaseList.forEach((element: any, index: number) => {
               if (element.LeaseId == payload.LeaseId) {
                    this.buildingLeaseList.splice(index, 1);
               }
          });
          this._toaster.success('Lease Removed.');
          this._storageService.setInventoryBuildingLeaseInformation(this.buildingLeaseList);
          this.setBuildingLeaseDetails();
     }
}
