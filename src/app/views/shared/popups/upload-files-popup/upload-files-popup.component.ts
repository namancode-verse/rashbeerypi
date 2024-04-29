import { Component, ElementRef, OnInit, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { BroadcastService } from '../../../../shared/services/broadcast.service';
import { AppSnackbarService } from '../../../../shared/services/app-snackbar.service';
import { BuildingService } from '../../../../shared/services/building.service';
import { AWSMediaService } from '../../../../shared/services/aws-media.service';

@Component({
     selector: 'app-upload-files-popup',
     templateUrl: './upload-files-popup.component.html',
     styleUrls: ['./upload-files-popup.component.scss'],
     providers: [SpinnerService]
})
export class UploadFilesPopupComponent implements OnInit, AfterViewInit {
     public horizontalPosition: MatSnackBarHorizontalPosition = 'right';
     public verticalPosition: MatSnackBarVerticalPosition = 'bottom';

     public selecetedFiles: NgxFileDropEntry[] = [];
     public selectedCSVFileList: any = [];
     public dialogboxDetails: any = {
          acceptFileType: ''
     };
     public subscriptions: any;
     public spinnerId: any = 'building-file-spinner';

     // prettier-ignore
     constructor(
          private _elemRef: ElementRef,
          private _router: Router,
          private _snackBar: MatSnackBar,
          private _spinnerService: SpinnerService,
          private _buildingService: BuildingService,
          private _appSnackbarService: AppSnackbarService,
          private _awsMediaService: AWSMediaService,
          private _broadcastService: BroadcastService,
          @Inject(MAT_DIALOG_DATA) private _DIALOG_DATA: any,
          private _dialogRef: MatDialogRef<UploadFilesPopupComponent>,
       ){}

     ngOnInit(): void {
          this.dialogboxDetails = this._DIALOG_DATA;
          this.showUploadFilePopupBox();
     }

     ngAfterViewInit(): void {
          if (this.dialogboxDetails && this.dialogboxDetails['autoClick']) {
               let element: HTMLElement = document.getElementById('file-select-button') as HTMLElement;
               setTimeout(() => {
                    element.click();
               });
          }
     }

     public showUploadFilePopupBox() {
          let payload = this.dialogboxDetails;
          if (payload.status == true) {
               if (payload.acceptFileType && payload.format) {
                    this.dialogboxDetails['acceptFileType'] = payload.acceptFileType;
               } else {
                    this.dialogboxDetails['acceptFileType'] = '.csv';
               }

               this.clearUploadFile();
          }
     }

     public dropped(files: NgxFileDropEntry[]) {
          this.selectedCSVFileList = [];
          for (const droppedFile of files) {
               if (droppedFile.fileEntry.isFile) {
                    //
                    this.selecetedFiles = files;
                    //
                    const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                    fileEntry.file((file: File) => {
                         this.selectedCSVFileList.push(file);
                    });
               } else {
                    const directoryEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
               }
          }
     }

     public uploadFiles() {
          if (this.dialogboxDetails['format'] && this.dialogboxDetails['format'] == 'PDF') {
               let isValidFileFormat = false;
               for (const file of this.selectedCSVFileList) {
                    const fileExtention = file.name.split('.').pop();
                    if (fileExtention == 'pdf' || fileExtention == 'PDF') {
                         isValidFileFormat = true;
                    } else {
                         isValidFileFormat = false;
                    }
               }
               if (isValidFileFormat) {
                    this.uploadFilesOnServer();
               } else {
                    this._appSnackbarService.redSnackBar('The file format is not valid. Please upload the .pdf file.');
               }
          } else {
               let isValidFileFormat = false;
               for (const file of this.selectedCSVFileList) {
                    const fileExtention = file.name.split('.').pop();
                    if (fileExtention == 'csv') {
                         isValidFileFormat = true;
                    } else {
                         isValidFileFormat = false;
                    }
               }
               if (isValidFileFormat) {
                    this.uploadFilesOnServer();
               } else {
                    this._appSnackbarService.redSnackBar('The file format is not valid. Please upload the .csv file.');
               }
          }
     }

     public uploadFilesOnServer() {
          const payload = new FormData();
          if (this.dialogboxDetails.category == 'Building') {
               //
               for (let a = 0; a < this.selectedCSVFileList.length; a++) {
                    const file = this.selectedCSVFileList[a];
                    payload.append('files', file);
               }
               //
               this.uploadBuildingFile(payload);
               //
          } else if (this.dialogboxDetails.category == 'BuildingFloor') {
               //
               for (let a = 0; a < this.selectedCSVFileList.length; a++) {
                    const file = this.selectedCSVFileList[a];
                    payload.append('files', file);
               }
               //
               this.uploadBuildingResponeFloorFile(payload);
               //
          } else if (this.dialogboxDetails.category == 'BuildingFloorUnit') {
               //
               for (let a = 0; a < this.selectedCSVFileList.length; a++) {
                    const file = this.selectedCSVFileList[a];
                    payload.append('files', file);
               }
               //
               this.uploadBuildingResponeFloorUnitsFile(payload);
               //
          } else if (this.dialogboxDetails.category == 'FloorUnits') {
               payload.append('ResponseId', this.dialogboxDetails.responseId);
               //
               for (let a = 0; a < this.selectedCSVFileList.length; a++) {
                    const file = this.selectedCSVFileList[a];
                    payload.append('files', file);
               }
               //
               this.uploadResponeFloorUnits(payload, this.dialogboxDetails.buildingIdentifier);
               //
          } else if (this.dialogboxDetails.category == 'FloorFile') {
               payload.append('ResponseId', this.dialogboxDetails.responseId);
               //
               for (let a = 0; a < this.selectedCSVFileList.length; a++) {
                    const file = this.selectedCSVFileList[a];
                    payload.append('files', file);
               }
               //
               this.uploadResponeFloor(payload, this.dialogboxDetails.buildingIdentifier);
               //
          } else if (this.dialogboxDetails.category == 'UnitFile') {
               payload.append('ResponseId', this.dialogboxDetails.responseId);
               //
               for (let a = 0; a < this.selectedCSVFileList.length; a++) {
                    const file = this.selectedCSVFileList[a];
                    payload.append('files', file);
               }
               //
               this.uploadResponeFloorUnit(payload, this.dialogboxDetails.buildingIdentifier, this.dialogboxDetails.floorIdentifier);
               //
          } else if (this.dialogboxDetails.category == 'LeaseDocument') {
               this.uploadLeasePDF();
          } else if (this.dialogboxDetails.category == 'BuildingLease') {
               //
               for (let a = 0; a < this.selectedCSVFileList.length; a++) {
                    const file = this.selectedCSVFileList[a];
                    payload.append('files', file);
               }
               //
               this.uploadBuildingFloorUnitLease(payload);
               //
          } else {
          }
     }

     public uploadBuildingFile(payload: any) {
          this._spinnerService.show(this.spinnerId);
          this._buildingService.uploadBuildingFile(payload).subscribe({
               next: (res) => {
                    this._spinnerService.hide(this.spinnerId);
                    this.buildResponsePayload('Response uploaded successfully.');
               },
               error: (error) => {
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
                    this._spinnerService.hide(this.spinnerId);
               }
          });
     }

     public uploadBuildingResponeFloorFile(payload: any) {
          this._spinnerService.show(this.spinnerId);
          this._buildingService.uploadBuildingFloorsFile(payload).subscribe({
               next: (res) => {
                    this._spinnerService.hide(this.spinnerId);
                    this.buildResponsePayload('Floors uploaded successfully.');
               },
               error: (error) => {
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
                    this._spinnerService.hide(this.spinnerId);
               }
          });
     }

     public uploadBuildingResponeFloorUnitsFile(payload: any) {
          this._spinnerService.show(this.spinnerId);
          this._buildingService.uploadBuildingFloorUnitsFile(payload).subscribe({
               next: (res) => {
                    this._spinnerService.hide(this.spinnerId);
                    this.buildResponsePayload('Units uploaded successfully.');
               },
               error: (error) => {
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
                    this._spinnerService.hide(this.spinnerId);
               }
          });
     }

     public uploadResponeFloor(payload: any, buildingIdentifier: any) {
          this._spinnerService.show(this.spinnerId);
          this._buildingService.uploadFloorFile(payload, buildingIdentifier).subscribe({
               next: (res) => {
                    this.buildResponsePayload('Floor uploaded successfully.');
               },
               error: (error) => {
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
                    this._spinnerService.hide(this.spinnerId);
               }
          });
     }

     public uploadResponeFloorUnit(payload: any, buildingIdentifier: any, floorIdentifier: any) {
          this._spinnerService.show(this.spinnerId);
          this._buildingService.uploadFloorUnitFile(payload, buildingIdentifier, floorIdentifier).subscribe({
               next: (res) => {
                    this.buildResponsePayload('Unit uploaded successfully.');
               },
               error: (error) => {
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
                    this._spinnerService.hide(this.spinnerId);
               }
          });
     }

     public uploadResponeFloorUnits(payload: any, buildingIdentifier: any) {
          this._spinnerService.show(this.spinnerId);
          this._buildingService.uploadFloorUnitsFile(payload, buildingIdentifier).subscribe({
               next: (res) => {
                    this.buildResponsePayload('Floor units uploaded successfully.');
               },
               error: (error) => {
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
                    this._spinnerService.hide(this.spinnerId);
               }
          });
     }

     public uploadBuildingFloorUnitFiles(payload: any, isSurvey: boolean) {
          this._spinnerService.show(this.spinnerId);
          let endPoint = '';
          if (isSurvey) {
               endPoint = '/surveys/buildings/uploads';
          } else {
               endPoint = '/responses/buildings/uploads';
          }
          this._spinnerService.show(this.spinnerId);
          this._buildingService.uploadBuildingFiles(payload, endPoint).subscribe({
               next: (res) => {
                    this._spinnerService.hide(this.spinnerId);
                    this.clearUploadFile();
                    this.closeUploadBoxComponent();
                    if (isSurvey) {
                         let refreshPayload = {};
                         refreshPayload['refreshFlag'] = 'LeaseDocument';
                         refreshPayload['floorIdentifier'] = this.dialogboxDetails.floorIdentifier;
                         refreshPayload['unitIdentifier'] = this.dialogboxDetails.unitIdentifier;
                    } else {
                         let refreshPayload = {};
                         refreshPayload['refreshFlag'] = 'LeaseDocument';
                         refreshPayload['floorIdentifier'] = this.dialogboxDetails.floorIdentifier;
                         refreshPayload['unitIdentifier'] = this.dialogboxDetails.unitIdentifier;
                    }
               },
               error: (error) => {
                    this._spinnerService.show(this.spinnerId);
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
               }
          });
     }

     public uploadBuildingFloorUnitLease(payload: any) {
          this._spinnerService.show(this.spinnerId);
          let endPoint = '/responses/bulk/buildings/leases';
          this._spinnerService.show(this.spinnerId);
          this._buildingService.uploadBuildingFiles(payload, endPoint).subscribe({
               next: (res) => {
                    this._spinnerService.hide(this.spinnerId);
                    this.clearUploadFile();
                    this.closeUploadBoxComponent();
                    this._appSnackbarService.greenSnackBar(res.message);
               },
               error: (error) => {
                    this._spinnerService.show(this.spinnerId);
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
               }
          });
     }

     public buildResponsePayload(message: any) {
          this._appSnackbarService.greenSnackBar(message);
          this._spinnerService.hide(this.spinnerId);
          this.clearUploadFile();
          this.closeUploadBoxComponent({ status: true, refresh: true });
     }

     //---------------------------------------------------------------------------------

     public navigateToResponsesView() {
          this._router.navigateByUrl('/survey-responses');
     }

     public clearUploadFile() {
          this.selecetedFiles = [];
          this.selectedCSVFileList = [];
     }

     public clearSingleFile(fileInfo: NgxFileDropEntry) {
          this.selecetedFiles.forEach((file: NgxFileDropEntry, fileIndex: number) => {
               if (file.fileEntry.name == fileInfo.fileEntry.name) {
                    this.selecetedFiles.splice(fileIndex, 1);
               }
          });
          this.selectedCSVFileList.forEach((file: File, fileIndex: number) => {
               if (file.name == fileInfo.fileEntry.name) {
                    this.selectedCSVFileList.splice(fileIndex, 1);
               }
          });
     }

     public closeUploadBoxComponent(status = { status: false, refresh: false }) {
          this._dialogRef.close(status);
     }

     public showSnackBar(message: any) {
          this._snackBar.open(message, '', {
               duration: 3000,
               horizontalPosition: this.horizontalPosition,
               verticalPosition: this.verticalPosition,
               panelClass: ['green-snackbar']
          });
     }

     //---------------------------------------------------------------------------------

     private uploadLeasePDF() {
          let _tempPayload = {
               ResponseId: this.dialogboxDetails.responseId,
               BuildingIdentifier: this.dialogboxDetails.buildingIdentifier,
               leaseStartDate: this.dialogboxDetails.leaseInfo.LeaseStartDate,
               LeaseIdentifier: this.dialogboxDetails.leaseInfo.LeaseIdentifier
          };
          this.uploadFileOnServer(_tempPayload);
     }

     public uploadFileOnServer(payload: any) {
          const file = this.selectedCSVFileList[0];
          this._spinnerService.show(this.spinnerId);
          this._awsMediaService.uploadFileOnServer(file, this.dialogboxDetails.buildingIdentifier).subscribe({
               next: (response: any) => {
                    payload['fileKey'] = response.Key;
                    this.updateLeaseDocument(payload);
               },
               error: (error: any) => {
                    this._spinnerService.hide(this.spinnerId);
                    this._appSnackbarService.redSnackBar(error, 20000);
               }
          });
     }

     public updateLeaseDocument(payload: any) {
          this._spinnerService.show(this.spinnerId);
          this._buildingService.updateLeaseDetails(payload).subscribe({
               next: (response) => {
                    this._spinnerService.hide(this.spinnerId);
                    this.clearUploadFile();
                    this.closeUploadBoxComponent();
                    this._appSnackbarService.greenSnackBar('Lease document uploaded successfully.');
                    let refreshPayload = {};
                    refreshPayload['refreshFlag'] = 'LeaseDocument';
                    refreshPayload['refreshPayload'] = payload;
               },
               error: (error) => {
                    this._spinnerService.hide(this.spinnerId);
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
               }
          });
     }
     //---------------------------------------------------------------------------------
}
