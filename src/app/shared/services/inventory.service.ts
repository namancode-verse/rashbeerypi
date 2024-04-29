import { Injectable } from '@angular/core';
import { GlobalVariables } from '../constants/global-variables';
import { StorageService } from './storage.service';
import { inventoryUnitContactFields } from '../constants/constants';
import { SelectTagOption } from '../interfaces/common.interface';

@Injectable({
     providedIn: 'root'
})
export class InventoryService {
     public globalVariables: GlobalVariables;

     constructor(private _storageService: StorageService) {
          this.globalVariables = new GlobalVariables();
          let masterData = this._storageService.getMasterData();
          if (masterData) {
               this.globalVariables.initializeConstantsVariables(masterData['masters']);
          }
     }

     public initializeMenus(template: any) {
          let buildingTitles = this.globalVariables.buildingTitles;
          let cityList = this.globalVariables.cityList;
          let stateList = this.globalVariables.stateList;
          let ownershipTypeList = this.globalVariables.ownershipTypeList;
          let havcList = this.globalVariables.havcList;
          let microMarketListWithCityName = this.globalVariables.microMarketListWithCityName;
          let liftQualityList = this.globalVariables.liftQualityList;
          let staircaseStructureList = this.globalVariables.staircaseStructureList;
          let certifications = this.globalVariables.certifications;
          let buildingVisibilityList = this.globalVariables.buildingVisibilityList;

          Object.entries(template).forEach(([parentKey, innerObject]) => {
               if (parentKey == 'Header') {
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         if (childKey == 'BuildingTitle') {
                              chieldObject['options'] = buildingTitles;
                         }
                    });
               } else if (parentKey == 'BuildingAddress') {
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         if (childKey == 'City') {
                              chieldObject['options'] = cityList;
                         } else if (childKey == 'State') {
                              chieldObject['options'] = stateList;
                         }
                    });
               } else if (parentKey == 'BuildingDetails') {
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         if (childKey == 'MicroMarket') {
                              chieldObject['options'] = microMarketListWithCityName;
                         }
                         if (childKey == 'OwnershipType') {
                              chieldObject['options'] = ownershipTypeList;
                         }
                    });
               } else if (parentKey == 'Facilities') {
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         if (childKey == 'TypeOfSystem') {
                              chieldObject['options'] = havcList;
                         } else if (childKey == 'StaircaseStructure') {
                              chieldObject['options'] = staircaseStructureList;
                         } else if (childKey == 'LiftQuality') {
                              chieldObject['options'] = liftQualityList;
                         }
                    });
               } else if (parentKey == 'BuildingCertifications') {
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         if (childKey == 'Certifications') {
                              chieldObject['options'] = certifications;
                         }
                    });
               } else if (parentKey == 'BuildingVisibility') {
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         if (childKey == 'Visibility') {
                              chieldObject['options'] = buildingVisibilityList;
                         }
                    });
               }
          });
          return template;
     }

     public initializeFloorMenus(template: any) {
          let floorStackType = this.globalVariables.floorStackType;
          Object.entries(template).forEach(([childKey, chieldObject]) => {
               if (childKey == 'FloorStackType') {
                    chieldObject['options'] = floorStackType;
               }
          });
          return template;
     }

     public initializeUnitMenus(template: any, floors: any) {
          let unitStatus = this.globalVariables.unitStatus;
          let typeOfSpaceList = this.globalVariables.typeOfSpaceList;
          let occupierIndustryList = this.globalVariables.occupierIndustryList;
          let floorOptions = this.createUnitFloorNumberOptions(floors);
          Object.entries(template).forEach(([childKey, chieldObject]) => {
               if (childKey == 'FloorNumber') {
                    chieldObject['options'] = floorOptions;
               } else if (childKey == 'UnitStatus') {
                    chieldObject['options'] = unitStatus;
               } else if (childKey == 'TypeOfSpace') {
                    chieldObject['options'] = typeOfSpaceList;
               } else if (childKey == 'OccupierIndustry') {
                    chieldObject['options'] = occupierIndustryList;
               }
          });
          return template;
     }

     public createUnitFloorNumberOptions(floors: any) {
          let options: SelectTagOption[] = [];
          floors.forEach((floor: any, floorIndex: number) => {
               let option = {
                    id: Number(floorIndex + 1),
                    name: floor['FloorNumber'],
                    value: floor['FloorIdentifier'],
                    selected: false
               };
               options.push(option);
          });
          return options;
     }

     public setDefaultValue(template: any, fieldValue: any) {
          Object.entries(template).forEach(([parentKey, innerObject]) => {
               if (parentKey == 'Header') {
                    let bh = fieldValue['Header'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(bh[childKey]);
                    });
               } else if (parentKey == 'BuildingAddress') {
                    let ba = fieldValue['Header']['BuildingAddress'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(ba[childKey]);
                    });
               } else if (parentKey == 'BuildingDetails') {
                    let bd = fieldValue['BuildingDetails'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(bd[childKey]);
                    });
               } else if (parentKey == 'ContactPersonLease') {
                    let bcp = fieldValue['BuildingDetails']['ContactPersonLease'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(bcp[childKey]);
                    });
               } else if (parentKey == 'ContactPersonBuildingManager') {
                    let bcpbm = fieldValue['BuildingDetails']['ContactPersonBuildingManager'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(bcpbm[childKey]);
                    });
               } else if (parentKey == 'Commute') {
                    let cm = fieldValue['Commute'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(cm[childKey]);
                    });
               } else if (parentKey == 'Neighbourhood') {
                    let nh = fieldValue['Neighbourhood'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(nh[childKey]);
                    });
               } else if (parentKey == 'Facilities') {
                    let fs = fieldValue['Facilities'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(fs[childKey]);
                    });
               } else if (parentKey == 'Amenities') {
                    let ae = fieldValue['Amenities'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(ae[childKey]);
                    });
               } else if (parentKey == 'BuildingCertifications') {
                    let certifications = fieldValue['BuildingCertifications'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = certifications;
                         chieldObject['options'].forEach((option: any) => {
                              if (certifications.includes(option.value)) {
                                   option.selected = true;
                              }
                         });
                    });
               } else if (parentKey == 'ClassifiedInfo') {
                    let clfo = fieldValue['ClassifiedInfo'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(clfo[childKey]);
                    });
               } else if (parentKey == 'BuildingVisibility') {
                    let bv = fieldValue['BuildingVisibility'];
                    Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                         chieldObject.default.value = this.checkBoolean(bv);
                    });
               }
          });

          return template;
     }

     public setDefaultFloorValue(template: any, fieldValue: any) {
          Object.entries(template).forEach(([childKey, chieldObject]) => {
               chieldObject['default']['value'] = this.checkBoolean(fieldValue[childKey]);
          });
          return template;
     }

     public setDefaultOpportunityValue(template: any, filedValue: any) {
          Object.entries(template).forEach(([childKey, chieldObject]) => {
               if (childKey == 'FirstName') {
                    chieldObject['default']['value'] = filedValue['fName'];
               } else if (childKey == 'LastName') {
                    chieldObject['default']['value'] = filedValue['lName'];
               } else if (childKey == 'Email') {
                    chieldObject['default']['value'] = filedValue['email'];
               } else if (childKey == 'PhoneNumber') {
                    chieldObject['default']['value'] = filedValue['phone'];
               } else if (childKey == 'CompanyName') {
                    chieldObject['default']['value'] = filedValue['companyName'];
               } else if (childKey == 'JobTitle') {
                    chieldObject['default']['value'] = filedValue['jobTitle'];
               } else if (childKey == 'LeadSource') {
                    chieldObject['default']['value'] = filedValue['leadSrc'];
               } else if (childKey == 'LeadStatus') {
                    chieldObject['default']['value'] = filedValue['leadStatus'];
               } else if (childKey == 'IsDemoActive') {
                    chieldObject['default']['value'] = filedValue['isDemoActive'];
               } else if (childKey == 'ProductType') {
                    chieldObject['default']['value'] = filedValue['productType'];
               }
          });
          return template;
     }

     public setDefaultUnitValue(template: any, fieldValue: any) {
          let unitContacts = {};
          let rentRange = null;

          if (fieldValue['RentRange']) {
               rentRange = fieldValue['RentRange'].split('-');
          }
          if (fieldValue['UnitContact']) {
               unitContacts = fieldValue['UnitContact'];
          }

          Object.entries(template).forEach(([childKey, chieldObject]) => {
               if (childKey == 'RentRangeMin') {
                    chieldObject['default']['value'] = rentRange[0];
               } else if (childKey == 'RentRangeMax') {
                    chieldObject['default']['value'] = rentRange[1];
               } else if (childKey == 'FloorNumber') {
                    chieldObject['options'].forEach((option: any) => {
                         if (option.value == fieldValue['FloorIdentifier']) {
                              option.selected = true;
                         }
                    });
                    chieldObject['default']['value'] = fieldValue['FloorIdentifier'];
               } else if (inventoryUnitContactFields.includes(childKey)) {
                    if (unitContacts) {
                         chieldObject['default']['value'] = this.checkBoolean(fieldValue[childKey]);
                    }
               } else {
                    chieldObject['default']['value'] = this.checkBoolean(fieldValue[childKey]);
               }
          });
          return template;
     }

     public setDefaultLeaseValue(template: any, leaseInfo: any) {
          Object.entries(template).forEach(([parentKey, innerObject]) => {
               let innerInfoObj = leaseInfo[parentKey];
               Object.entries(innerObject).forEach(([childKey, chieldObject]) => {
                    chieldObject.default.value = innerInfoObj[childKey];
               });
          });
          return template;
     }

     public checkBoolean(param: any) {
          if (typeof param === 'boolean') {
               return param ? 'Yes' : 'No';
          } else {
               return param;
          }
     }
}
