import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageUploadHelper } from '../interfaces/upload-file.interface';

export class BuildingResponseHelpers {
     public _tempBuildingImageList = [];
     public _tempPlanImageList = [];
     public dateFormatPattern = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

     public createPayloadForUploadFiles(building: any, category: any, floorIdentifier: any, unitIdentifier: any) {
          let _response = {
               data: null,
               status: false
          };
          if (category == 'BuildingImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'building',
                    category: category,
                    uploadMultiple: true,
                    responseId: building.ResponseId,
                    buildingIdentifier: building.BuildingIdentifier,
                    headerTitle: 'Upload Building Images'
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else if (category == 'FloorPlanImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'floor',
                    category: category,
                    uploadMultiple: false,
                    responseId: building.ResponseId,
                    buildingIdentifier: building.BuildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    headerTitle: 'Upload Floar Plan Image'
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else if (category == 'UnitImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'unit',
                    category: category,
                    uploadMultiple: true,
                    responseId: building.ResponseId,
                    buildingIdentifier: building.BuildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    unitIdentifier: unitIdentifier,
                    headerTitle: 'Upload Unit Images'
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else if (category == 'AutoCadFile') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'autocad',
                    level: 'floor',
                    category: category,
                    uploadMultiple: false,
                    responseId: building.ResponseId,
                    buildingIdentifier: building.BuildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    headerTitle: 'Upload Autocad File'
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else {
               _response.data = {};
               _response.status = false;
          }
          return _response;
     }

     public getPayloadForRemoveFiles(building: any, category: any, floorIdentifier: any, unitIdentifier: any, files: any) {
          let _response = {
               data: null,
               status: false
          };
          if (category == 'BuildingImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'building',
                    category: category,
                    responseId: building.ResponseId,
                    buildingIdentifier: building.BuildingIdentifier,
                    headerTitle: 'Remove Building Images',
                    files: files
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else if (category == 'FloorPlanImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'floor',
                    category: category,
                    responseId: building.ResponseId,
                    buildingIdentifier: building.BuildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    headerTitle: 'Remove Floar Plan Image',
                    files: files
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else if (category == 'UnitImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'unit',
                    category: category,
                    responseId: building.ResponseId,
                    buildingIdentifier: building.BuildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    unitIdentifier: unitIdentifier,
                    headerTitle: 'Remove Unit Images',
                    files: files
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else if (category == 'AutoCadFile') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'autocad',
                    level: 'floor',
                    category: category,
                    uploadMultiple: false,
                    responseId: building.ResponseId,
                    buildingIdentifier: building.BuildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    headerTitle: 'Remove Autocad File',
                    files: files
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else {
               _response.data = {};
               _response.status = false;
          }
          return _response;
     }

     public getUploadPayloadForBuildingImage(id: any, buildingIdentifier: any, category: any) {
          let _response = {
               data: null,
               status: false
          };
          if (category == 'BuildingImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'building',
                    category: category,
                    uploadMultiple: true,
                    buildingId: id,
                    buildingIdentifier: buildingIdentifier,
                    headerTitle: 'Upload Building Images'
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'building',
                    category: category,
                    uploadMultiple: true,
                    surveyId: id,
                    buildingIdentifier: buildingIdentifier,
                    headerTitle: 'Upload Building Images'
               };
               _response.data = _tempPayload;
               _response.status = true;
          }
          return _response;
     }

     public getRemovePayloadForBuildingImage(id: any, buildingIdentifier: any, category: any, files: any) {
          let _response = {
               data: null,
               status: false
          };
          if (category == 'BuildingImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'building',
                    category: category,
                    responseId: id,
                    buildingIdentifier: buildingIdentifier,
                    headerTitle: 'Remove Building Images',
                    files: files
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'building',
                    category: category,
                    surveyId: id,
                    buildingIdentifier: buildingIdentifier,
                    headerTitle: 'Remove Building Images',
                    files: files
               };
               _response.data = _tempPayload;
               _response.status = true;
          }
          return _response;
     }

     public createRemovePayloadForAutocadAndFloorPlanImage(id: any, buildingIdentifier: any, category: any, floorIdentifier: any, files: any) {
          let _response = {
               data: null,
               status: false
          };
          if (category == 'FloorPlanImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'floor',
                    category: category,
                    responseId: id,
                    buildingIdentifier: buildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    headerTitle: 'Remove Floar Plan Image',
                    files: files
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else if (category == 'AutoCadFile') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'autocad',
                    level: 'floor',
                    category: category,
                    uploadMultiple: false,
                    responseId: id,
                    buildingIdentifier: buildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    headerTitle: 'Remove Autocad File',
                    files: files
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else {
               _response.data = {};
               _response.status = false;
          }
          return _response;
     }

     public getUploadPayloadForFloorPlanOrAutoCadFile(id: any, buildingIdentifier: any, category: any, floorIdentifier: any) {
          let _response = {
               data: null,
               status: false
          };
          if (category == 'FloorPlanImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'floor',
                    category: category,
                    uploadMultiple: false,
                    responseId: id,
                    buildingIdentifier: buildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    headerTitle: 'Upload Floor Plan Image'
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else if (category == 'AutoCadFile') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'autocad',
                    level: 'floor',
                    category: category,
                    uploadMultiple: false,
                    responseId: id,
                    buildingIdentifier: buildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    headerTitle: 'Upload Autocad File'
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else {
               _response.data = {};
               _response.status = false;
          }
          return _response;
     }

     public getUploadPayloadForUnitImage(id: any, buildingIdentifier: any, category: any, floorIdentifier: any, unitIdentifier: any) {
          let _response = {
               data: null,
               status: false
          };
          if (category == 'UnitImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'unit',
                    category: category,
                    uploadMultiple: true,
                    responseId: id,
                    buildingIdentifier: buildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    unitIdentifier: unitIdentifier,
                    headerTitle: 'Upload Unit Images'
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'unit',
                    category: category,
                    uploadMultiple: true,
                    surveyId: id,
                    buildingIdentifier: buildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    unitIdentifier: unitIdentifier,
                    headerTitle: 'Upload Unit Images'
               };
               _response.data = _tempPayload;
               _response.status = true;
          }
          return _response;
     }

     public getRemovePayloadForUnitImage(id: any, buildingIdentifier: any, category: any, floorIdentifier: any, unitIdentifier: any, files: any) {
          let _response = {
               data: null,
               status: false
          };
          if (category == 'UnitImage') {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'unit',
                    category: category,
                    responseId: id,
                    buildingIdentifier: buildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    unitIdentifier: unitIdentifier,
                    headerTitle: 'Remove Unit Images',
                    files: files
               };
               _response.data = _tempPayload;
               _response.status = true;
          } else {
               let _tempPayload: ImageUploadHelper = {
                    status: true,
                    key: 'image',
                    level: 'unit',
                    category: category,
                    surveyId: id,
                    buildingIdentifier: buildingIdentifier,
                    floorIdentifier: floorIdentifier,
                    unitIdentifier: unitIdentifier,
                    headerTitle: 'Remove Unit Images',
                    files: files
               };
               _response.data = _tempPayload;
               _response.status = true;
          }
          return _response;
     }
}
