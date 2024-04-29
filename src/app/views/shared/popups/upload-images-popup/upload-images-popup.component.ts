import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { BuildingService } from '../../../../shared/services/building.service';
import { BroadcastService } from '../../../../shared/services/broadcast.service';
import { SelectedFiles } from '../../../../shared/interfaces/upload-file.interface';
import { AppSnackbarService } from '../../../../shared/services/app-snackbar.service';

@Component({
     selector: 'app-upload-images-popup',
     templateUrl: './upload-images-popup.component.html',
     styleUrls: ['./upload-images-popup.component.scss'],
     providers: [SpinnerService]
})
export class UploadImagesPopupComponent implements OnInit {
     public ImageFileList: any = [];
     public selectedImageFiles: SelectedFiles[] = [];
     public temporaryImageList: any = [];
     public stringifyfiedFiles: any;
     public isVisibleSaveButton: boolean = true;
     public dialogboxDetails: any = null;
     public isUploadMultiple: boolean = false;
     public headerTitle: any = 'Upload Files';
     public subscriptions: any;
     public seletedFileSize: any = 0;
     public uploadedFileIndex: any = 0;
     public surveysKeysList = ['SurveyResponseImage', 'SurveyFloorPlanImage', 'SurveyAutoCadFile', 'SurveyUnitImage'];

     // prettier-ignore
     constructor(
          private _spinnerService: SpinnerService,
          private _buildingService: BuildingService,
          private _broadcastService: BroadcastService,
          private _appSnackbarService: AppSnackbarService,
          @Inject(MAT_DIALOG_DATA) private _DIALOG_DATA: any,
          private _dialogRef: MatDialogRef<UploadImagesPopupComponent>,
     )
     {
     }

     ngOnInit(): void {
          this.dialogboxDetails = this._DIALOG_DATA;
          this.showUploadFilePopupBox();
     }

     public showUploadFilePopupBox() {
          if (this.dialogboxDetails.status == true) {
               this.isUploadMultiple = this.dialogboxDetails.uploadMultiple;

               if (this.dialogboxDetails.headerTitle != null || this.dialogboxDetails.headerTitle != '') {
                    this.headerTitle = this.dialogboxDetails.headerTitle;
               }
          }
     }

     public hideUploadFilePopupBox() {
          this._dialogRef.close();
     }

     closeUploadBoxComponent() {
          this.clearUploadFile();
          this.hideUploadFilePopupBox();
     }

     public getAndSetPostableFiles(event: any) {
          try {
               this.selectedImageFiles = [];
               this.ImageFileList = [];
               let filesLength = event.target.files.length;
               let selectedFiles = event.target.files;

               for (let index = 0; index < selectedFiles.length; index++) {
                    const element = selectedFiles[index];
                    const fileSize = element.size;
                    const fileName = element.name;
                    const fileType = element.type.split('/');
                    const tempFileSize = fileSize / (1024 * 1024);
                    const finalFileSize = tempFileSize.toFixed(2);

                    var reader = new FileReader();

                    reader.onload = (event: any) => {
                         if (Number(finalFileSize) <= 5) {
                              this.temporaryImageList.push({
                                   fileName: fileName,
                                   location: event.target.result
                              });
                              this.ImageFileList.push(element);
                              this.seletedFileSize = this.seletedFileSize + tempFileSize;
                         } else {
                              if (filesLength == 1) {
                                   this._appSnackbarService.redSnackBar('XYZ Error', 10000, 'CLOSE');
                              } else {
                                   this._appSnackbarService.redSnackBar('XYZ Error 2', 10000, 'CLOSE');
                              }
                         }
                    };

                    reader.readAsDataURL(element);
               }

               event.target.value = '';
          } catch (error) {
               event.target.value = '';
          }
     }

     public unSelectPostFiles(fileName: any) {
          for (let a = 0; a < this.ImageFileList.length; a++) {
               const element = this.ImageFileList[a];
               if (element.name == fileName) {
                    this.ImageFileList.splice(a, 1);
                    this.temporaryImageList.splice(a, 1);
               }
          }
     }

     public uploadFiles(fileIndex: any = 0) {
          if (this.seletedFileSize > 5) {
               const payload = this.createFilePayload({ allFile: false, fileIndex: fileIndex });
               this.uploadOneByOneFileOnServer(payload);
          } else {
               const payload = this.createFilePayload({ allFile: true });
               this.uploadAllFilesOnServer(payload);
          }
     }

     public uploadAllFilesOnServer(payload: any) {
          this._spinnerService.show('upload-image');
          let endPoint = this.getEndPoint();
          this._buildingService.uploadBuildingFiles(payload, endPoint).subscribe({
               next: (res) => {
                    this.buildResponsePayload('File uploaded successfully.');
               },
               error: (error) => {
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
                    this._spinnerService.hide('upload-image');
               }
          });
     }

     public uploadOneByOneFileOnServer(payload: any) {
          this._spinnerService.show('upload-image');
          let endPoint = this.getEndPoint();
          this._buildingService.uploadBuildingFiles(payload, endPoint).subscribe({
               next: (res) => {
                    if (this.uploadedFileIndex < this.ImageFileList.length - 1) {
                         //
                         this.uploadedFileIndex = this.uploadedFileIndex + 1;
                         //
                         this.uploadFiles(this.uploadedFileIndex);
                         //
                    } else {
                         this.buildResponsePayload('File uploaded successfully.');
                    }
               },
               error: (error) => {
                    this._appSnackbarService.redSnackBar(error.message, 6000, 'Close');
                    this._spinnerService.hide('upload-image');
               }
          });
     }

     public buildResponsePayload(message: any) {
          this._spinnerService.hide('upload-image');
          this.clearUploadFile();

          this._appSnackbarService.greenSnackBar(message);
          this.hideUploadFilePopupBox();

          let isSurvey = this.surveysKeysList.includes(this.dialogboxDetails.category);
          if (isSurvey) {
               let refreshPayload = {};
               if (this.dialogboxDetails.category == 'SurveyResponseImage') {
                    refreshPayload['refreshFlag'] = 'SurveyResponse';
               } else if (this.dialogboxDetails.category == 'SurveyFloorPlanImage') {
                    refreshPayload['refreshFlag'] = 'SurveyFloorPlanImage';
                    refreshPayload['floorIdentifier'] = this.dialogboxDetails.floorIdentifier;
               } else if (this.dialogboxDetails.category == 'SurveyUnitImage') {
                    refreshPayload['refreshFlag'] = 'SurveyUnitImage';
                    refreshPayload['floorIdentifier'] = this.dialogboxDetails.floorIdentifier;
                    refreshPayload['unitIdentifier'] = this.dialogboxDetails.unitIdentifier;
               } else if (this.dialogboxDetails.category == 'SurveyAutoCadFile') {
                    refreshPayload['refreshFlag'] = 'SurveyAutoCadFile';
                    refreshPayload['floorIdentifier'] = this.dialogboxDetails.floorIdentifier;
               }
          } else {
               let refreshPayload = {};
               if (this.dialogboxDetails.category == 'BuildingImage') {
                    refreshPayload['refreshFlag'] = 'BuildingResponse';
               } else if (this.dialogboxDetails.category == 'FloorPlanImage') {
                    refreshPayload['refreshFlag'] = 'FloorPlanImage';
                    refreshPayload['floorIdentifier'] = this.dialogboxDetails.floorIdentifier;
               } else if (this.dialogboxDetails.category == 'UnitImage') {
                    refreshPayload['refreshFlag'] = 'UnitImage';
                    refreshPayload['floorIdentifier'] = this.dialogboxDetails.floorIdentifier;
                    refreshPayload['unitIdentifier'] = this.dialogboxDetails.unitIdentifier;
               } else if (this.dialogboxDetails.category == 'AutoCadFile') {
                    refreshPayload['refreshFlag'] = 'AutoCadFile';
                    refreshPayload['floorIdentifier'] = this.dialogboxDetails.floorIdentifier;
               }
          }
     }

     public clearUploadFile() {
          this.ImageFileList = [];
          this.temporaryImageList = [];
          this.stringifyfiedFiles = null;
     }

     public createFilePayload(payloadType: any) {
          const payload = new FormData();
          let field = this.dialogboxDetails;

          if (payloadType.allFile) {
               for (let a = 0; a < this.ImageFileList.length; a++) {
                    const element = this.ImageFileList[a];
                    payload.append('files', element);
               }
          } else {
               const element = this.ImageFileList[payloadType.fileIndex];
               payload.append('files', element);
          }

          if (field.category == 'BuildingImage') {
               payload.append('Key', field.key);
               payload.append('Level', field.level);
               payload.append('ResponseId', field.responseId);
               payload.append('BuildingIdentifier', field.buildingIdentifier);
          } else if (field.category == 'SurveyResponseImage') {
               payload.append('Key', field.key);
               payload.append('Level', field.level);
               payload.append('SurveyId', field.surveyId);
               payload.append('BuildingIdentifier', field.buildingIdentifier);
          } else if (field.category == 'FloorPlanImage') {
               payload.append('Key', field.key);
               payload.append('Level', field.level);
               payload.append('ResponseId', field.responseId);
               payload.append('BuildingIdentifier', field.buildingIdentifier);
               payload.append('FloorIdentifier', field.floorIdentifier);
          } else if (field.category == 'SurveyFloorPlanImage') {
               payload.append('Key', field.key);
               payload.append('Level', field.level);
               payload.append('SurveyId', field.surveyId);
               payload.append('BuildingIdentifier', field.buildingIdentifier);
               payload.append('FloorIdentifier', field.floorIdentifier);
          } else if (field.category == 'UnitImage') {
               payload.append('Key', field.key);
               payload.append('Level', field.level);
               payload.append('ResponseId', field.responseId);
               payload.append('BuildingIdentifier', field.buildingIdentifier);
               payload.append('FloorIdentifier', field.floorIdentifier);
               payload.append('UnitIdentifier', field.unitIdentifier);
          } else if (field.category == 'SurveyUnitImage') {
               payload.append('Key', field.key);
               payload.append('Level', field.level);
               payload.append('SurveyId', field.surveyId);
               payload.append('BuildingIdentifier', field.buildingIdentifier);
               payload.append('FloorIdentifier', field.floorIdentifier);
               payload.append('UnitIdentifier', field.unitIdentifier);
          } else if (field.category == 'AutoCadFile') {
               payload.append('Key', field.key);
               payload.append('Level', field.level);
               payload.append('ResponseId', field.responseId);
               payload.append('BuildingIdentifier', field.buildingIdentifier);
               payload.append('FloorIdentifier', field.floorIdentifier);
          } else if (field.category == 'SurveyAutoCadFile') {
               payload.append('Key', field.key);
               payload.append('Level', field.level);
               payload.append('SurveyId', field.surveyId);
               payload.append('BuildingIdentifier', field.buildingIdentifier);
               payload.append('FloorIdentifier', field.floorIdentifier);
          } else {
          }
          return payload;
     }

     public getEndPoint() {
          let isSurvey = this.surveysKeysList.includes(this.dialogboxDetails.category);
          if (isSurvey) {
               return '/surveys/buildings/uploads';
          } else {
               return '/responses/buildings/uploads';
          }
     }
}
