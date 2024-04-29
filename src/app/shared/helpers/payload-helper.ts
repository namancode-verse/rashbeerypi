export class PayloadHelper {
     public createSmartListPayload(listId: string, sbranding: any, themeColor: any) {
          const payload = new FormData();
          payload.append('BuildingUnitListID', listId);
          payload.append('ValidityInDays', '15');
          payload.append('Logo', sbranding.logo ? sbranding.logo : '');
          payload.append('ThemeColorCode', themeColor);
          payload.append('LogoFileName', sbranding.logo ? sbranding.logo.name : '');
          return payload;
     }

     public getFieldsValue(lists: any, field: string) {
          let valueString = '';
          for (let index = 0; index < lists.length; index++) {
               let element = lists[index];
               let pipe = index == 0 ? '' : '|';
               if (element[field]) {
                    valueString = valueString + pipe + element[field];
               } else {
                    valueString = valueString + pipe + 'EMPTY';
               }
          }
          return valueString;
     }

     public getDateAndTimes(dateTimes: any) {
          let valueString = '';
          for (let index = 0; index < dateTimes.length; index++) {
               let element = dateTimes[index];

               let calendarDate = new Date(element.date);
               let calendarTimes = new Date(element.time);

               let timesHours = calendarTimes.getHours();
               let timesMinutes = calendarTimes.getMinutes();
               calendarDate.setHours(Number(timesHours), Number(timesMinutes));
               let pipe = index == 0 ? '' : '|';
               valueString = valueString + pipe + this.getDateFromDate(calendarDate);
          }
          return valueString;
     }

     public getDateFromDate(dt) {
          let date = new Date(dt);
          let year = date.getFullYear();
          let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
          let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
          let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
          let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
          let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
          let tdate = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes + ':' + second + '.000';
          return tdate;
     }

     public getPropertyDetailsSearchPayload(filterPayload: any, buildingId: any, cityId: any) {
          if (filterPayload) {
               let payload = {
                    BuildingID: buildingId,
                    MicroMarketIDs: filterPayload['MicroMarketIDs'],
                    TypeOfSpaceIDs: filterPayload['TypeOfSpaceIDs'],
                    CategoryIDs: filterPayload['CategoryIDs'],
                    CityID: filterPayload['CityID'],
                    RentRange: filterPayload['RentRange'],
                    AreaInSqft: filterPayload['AreaInSqFt'],
                    AreaSearchCriteria: filterPayload['AreaSearchCriteria']
               };
               return payload;
          } else {
               let payload = {
                    BuildingID: buildingId,
                    MicroMarketIDs: '--',
                    TypeOfSpaceIDs: '--',
                    CategoryIDs: '--',
                    CityID: cityId,
                    RentRange: '',
                    AreaInSqft: '',
                    AreaSearchCriteria: ''
               };
               return payload;
          }
     }

     public createBuildingResponsePayload(formValue: any) {
          let Header = formValue.Header;
          let BuildingAddress = formValue.BuildingAddress;
          let BuildingDetails = formValue.BuildingDetails;
          let BuildingAmenities = formValue.Amenities;
          let BuildingCommute = formValue.Commute;
          let BuildingCertifications = formValue.BuildingCertifications;
          let BuildingFacilities = formValue.Facilities;
          let BuildingNeighbourhood = formValue.Neighbourhood;
          let BuildingClassifiedInfo = formValue.ClassifiedInfo;
          let ContactPersonBuildingManager = formValue.ContactPersonBuildingManager;
          let ContactPersonLease = formValue.ContactPersonLease;
          let BuildingVisibility = formValue.BuildingVisibility;

          let _tempPayload = {
               BuildingName: Header['BuildingName'],
               BuildingTitle: Header['BuildingTitle'],
               LocationAccuracy: Header['LocationAccuracy'],
               BuildingDescription: Header['BuildingDescription'],
               ExclusivelyMarketedBy: Header['ExclusivelyMarketedBy'],
               LocationLat: Number(Header['LocationLat'] ?? 0),
               LocationLng: Number(Header['LocationLng'] ?? 0),
               LocationAltitude: Number(Header['LocationAltitude'] ?? 0),

               BuildingImages: [],

               City: BuildingAddress['City'],
               State: BuildingAddress['State'],
               AddressLine1: BuildingAddress['AddressLine1'],
               AddressLine2: BuildingAddress['AddressLine2'],
               PinCode: Number(BuildingAddress['PinCode'] ?? 0),

               MicroMarket: BuildingDetails['MicroMarket'],
               OwnershipType: BuildingDetails['OwnershipType'],
               DeveloperName: BuildingDetails['DeveloperName'],
               BuildingStructure: BuildingDetails['BuildingStructure'],
               CarParkingRatio: BuildingDetails['CarParkingRatio'],
               TwoWheelerParkingRatio: BuildingDetails['TwoWheelerParkingRatio'],
               BuildingCode: BuildingDetails['BuildingCode'],
               CampusName: BuildingDetails['CampusName'],
               OperationalHours: BuildingDetails['OperationalHours'],
               CamRetail: BuildingDetails['CamRetail'],
               CamOffice: BuildingDetails['CamOffice'],
               FacilityManagedBy: BuildingDetails['FacilityManagedBy'],
               QuotedEfficiency: BuildingDetails['QuotedEfficiency'],

               BuildYear: Number(BuildingDetails['BuildYear'] ?? 0),
               RetailArea: Number(BuildingDetails['RetailArea'] ?? 0),
               OfficeArea: Number(BuildingDetails['OfficeArea'] ?? 0),
               NoOfRamps: Number(BuildingDetails['NoOfRamps'] ?? 0),
               TotalLeasableArea: Number(BuildingDetails['TotalLeasableArea'] ?? 0),
               NumberOfAssemblyPoints: Number(BuildingDetails['NumberOfAssemblyPoints'] ?? 0),

               CampusBuilding: BuildingDetails['CampusBuilding'] == 'Yes' ? true : false,
               VastuCompliant: BuildingDetails['VastuCompliant'] == 'Yes' ? true : false,
               CarParkingAvailable: BuildingDetails['CarParkingAvailable'] == 'Yes' ? true : false,
               TwoWheelerParkingAvailable: BuildingDetails['TwoWheelerParkingAvailable'] == 'Yes' ? true : false,
               TwentyFourBySevenOperations: BuildingDetails['TwentyFourBySevenOperations'] == 'Yes' ? true : false,

               LeasingManagerName: ContactPersonLease['LeasingManagerName'],
               LeasingManager_Designation: ContactPersonLease['Designation'],
               LeasingManager_Email: ContactPersonLease['Email'],
               LeasingManager_Phone: ContactPersonLease['Phone'],
               BuildingManagerName: ContactPersonBuildingManager['BuildingManagerName'],
               BuildingManager_Designation: ContactPersonBuildingManager['Designation'],
               BuildingManager_Email: ContactPersonBuildingManager['Email'],
               BuildingManager_Phone: ContactPersonBuildingManager['Phone'],

               NearestMetro: BuildingCommute['NearestMetro'],
               NearestMetroStationDistance: Number(BuildingCommute['NearestMetroStationDistance'] ?? 0),
               NearestAirport: BuildingCommute['NearestAirport'],
               NearestAirportDistance: Number(BuildingCommute['NearestAirportDistance'] ?? 0),
               NearestRailwayStation: BuildingCommute['NearestRailwayStation'],
               NearestRailwayStationDistance: Number(BuildingCommute['NearestRailwayStationDistance'] ?? 0),

               NearestHotel: BuildingNeighbourhood['NearestHotel'],
               NearestHotelDistance: Number(BuildingNeighbourhood['NearestHotelDistance'] ?? 0),
               NearestRestaurant: BuildingNeighbourhood['NearestRestaurant'],
               NearestRestaurantDistance: Number(BuildingNeighbourhood['NearestRestaurantDistance'] ?? 0),
               NearbyResidentialCatchment: BuildingNeighbourhood['NearbyResidentialCatchment'],
               NearestResidentialCatchmentDistance: Number(BuildingNeighbourhood['NearestResidentialCatchmentDistance'] ?? 0),

               HVAC: BuildingFacilities['HVAC'] == 'Yes' ? true : false,
               TypeOfSystem: BuildingFacilities['TypeOfSystem'],
               AirFilteration: BuildingFacilities['AirFilteration'] == 'Yes' ? true : false,
               ElevatorsCommon: BuildingFacilities['ElevatorsCommon'] == 'Yes' ? true : false,
               NumberOfElevators: Number(BuildingFacilities['NumberOfElevators'] ?? 0),
               EscalatorsCommon: BuildingFacilities['EscalatorsCommon'] == 'Yes' ? true : false,
               NumberOfServiceElevators: Number(BuildingFacilities['NumberOfServiceElevators'] ?? 0),
               NumberOfParkingElevators: Number(BuildingFacilities['NumberOfParkingElevators'] ?? 0),
               LiftSpeed: BuildingFacilities['LiftSpeed'],
               LiftQuality: BuildingFacilities['LiftQuality'],
               PowerBackup: BuildingFacilities['PowerBackup'] == 'Yes' ? true : false,
               DrainageSystem: BuildingFacilities['DrainageSystem'] == 'Yes' ? true : false,
               FireDetectionSystem: BuildingFacilities['FireDetectionSystem'] == 'Yes' ? true : false,
               NumberOfStaircasesFireEscapes: Number(BuildingFacilities['NumberOfStaircasesFireEscapes'] ?? 0),
               NumberOfStaircasesBasements: Number(BuildingFacilities['NumberOfStaircasesBasements'] ?? 0),
               StaircaseStructure: BuildingFacilities['StaircaseStructure'],
               EarthquakeResistance: BuildingFacilities['EarthquakeResistance'] == 'Yes' ? true : false,
               FireHydrationSystem: BuildingFacilities['FireHydrationSystem'] == 'Yes' ? true : false,
               GarbageDisposalArea: BuildingFacilities['GarbageDisposalArea'] == 'Yes' ? true : false,
               WaterBodies: BuildingFacilities['WaterBodies'] == 'Yes' ? true : false,
               TotalWashrooms: Number(BuildingFacilities['TotalWashrooms'] ?? 0),
               GentsWashrooms: Number(BuildingFacilities['GentsWashrooms'] ?? 0),
               LadiesWashrooms: Number(BuildingFacilities['LadiesWashrooms'] ?? 0),
               HandicapsWashrooms: Number(BuildingFacilities['HandicapsWashrooms'] ?? 0),
               TotalWashbasins: Number(BuildingFacilities['TotalWashbasins'] ?? 0),
               EmergencyExits: Number(BuildingFacilities['EmergencyExits'] ?? 0),

               Gymnasium: BuildingAmenities['Gymnasium'] == 'Yes' ? true : false,
               GymanisumBrand: BuildingAmenities['GymanisumBrand'],
               Creche: BuildingAmenities['Creche'] == 'Yes' ? true : false,
               CrecheBrand: BuildingAmenities['CrecheBrand'],
               FoodCourt: BuildingAmenities['FoodCourt'] == 'Yes' ? true : false,
               FoorCourtBrand: BuildingAmenities['FoodCourtBrand'],
               Auditorium: BuildingAmenities['Auditorium'] == 'Yes' ? true : false,
               RecreationArea: BuildingAmenities['RecreationArea'] == 'Yes' ? true : false,

               BuildingCertifications: BuildingCertifications['Certifications'],

               OccupancyCertificate: BuildingClassifiedInfo['OccupancyCertificate'] == 'Yes' ? true : false,
               OCAwaitedMonth: BuildingClassifiedInfo['OCAwaitedMonth'],
               CompletionCertificate: BuildingClassifiedInfo['CompletionCertificate'] == 'Yes' ? true : false,
               CCAwaitedMonth: BuildingClassifiedInfo['CCAwaitedMonth'],
               FireNOC: BuildingClassifiedInfo['FireNOC'] == 'Yes' ? true : false,
               FireNOCAwaitedMonth: BuildingClassifiedInfo['FireNOCAwaitedMonth'],
               ColumnToColumnRatio: BuildingClassifiedInfo['ColumnToColumnRatio'],
               FloorToFloorHeight: BuildingClassifiedInfo['FloorToFloorHeight'],
               PowerSupply: BuildingClassifiedInfo['PowerSupply'] == 'Yes' ? true : false,
               LTPanel: BuildingClassifiedInfo['LTPanel'] == 'Yes' ? true : false,
               DGSets: BuildingClassifiedInfo['DGSets'] == 'Yes' ? true : false,
               DGSetsCapacity: BuildingClassifiedInfo['DGSetsCapacity'],
               EmergencyLighting: BuildingClassifiedInfo['EmergencyLighting'] == 'Yes' ? true : false,
               WaterSupply: BuildingClassifiedInfo['WaterSupply'] == 'Yes' ? true : false,
               UndergroundTank: BuildingClassifiedInfo['UndergroundTank'] == 'Yes' ? true : false,
               UndergroundTankCapacity: BuildingClassifiedInfo['UndergroundTankCapacity'],
               OverheadTank: BuildingClassifiedInfo['OverheadTank'] == 'Yes' ? true : false,
               OverheadTankCapacity: BuildingClassifiedInfo['OverheadTankCapacity'],
               WaterTreatmentPlant: BuildingClassifiedInfo['WaterTreatmentPlant'] == 'Yes' ? true : false,
               WTPCapacity: BuildingClassifiedInfo['WTPCapacity'],
               SewageTreatmentPlant: BuildingClassifiedInfo['SewageTreatmentPlant'] == 'Yes' ? true : false,
               STPCapacity: BuildingClassifiedInfo['STPCapacity'],
               RainWaterHarvesting: BuildingClassifiedInfo['RainWaterHarvesting'] == 'Yes' ? true : false,

               Visibility: BuildingVisibility['Visibility'],
               UnitRemarks: '',
               IsAvailableForSale: false,
               LastResponseId: 120
          };
          return _tempPayload;
     }

     public createFloorPayload(floor: any) {
          let _tempFloorObject = {
               FloorId: floor.FloorId,
               FloorIdentifier: floor.FloorIdentifier,
               BuildingIdentifier: floor.BuildingIdentifier,
               FloorNumber: floor.FloorNumber,
               BuildingName: floor.BuildingName,
               BuildingTitle: floor.BuildingTitle,
               FloorPlate: floor.FloorPlate,
               FloorStackType: floor.FloorStackType,
               FloorPlanAvailable: floor.FloorPlanAvailable,
               AutoCadAvailable: floor.AutoCadAvailable,
               FloorPlanImages: floor.FloorPlanImages ?? [],
               AutoCadFiles: floor.AutoCadFiles ?? []
          };
          return _tempFloorObject;
     }

     public createUnitsPayload(unitInfo: any) {
          let RentRangeMin = unitInfo.RentRangeMin ?? '0';
          let RentRangeMax = unitInfo.RentRangeMax ?? '0';

          let _unitPayload = {
               UnitId: unitInfo.UnitId,
               FloorId: unitInfo.FloorId,
               BuildingIdentifier: unitInfo.BuildingIdentifier,
               UnitIdentifier: unitInfo.UnitIdentifier,
               FloorIdentifier: unitInfo.FloorIdentifier,
               FloorNumber: unitInfo.FloorNumber,
               BuildingName: unitInfo.BuildingName,
               BuildingTitle: unitInfo.BuildingTitle,
               UnitName: unitInfo.UnitName,
               UnitStatus: unitInfo.UnitStatus,
               Availability: unitInfo.Availability,
               OccupierName: unitInfo.OccupierName,
               RentRange: RentRangeMin + '-' + RentRangeMax,
               UnitArea: unitInfo.UnitArea,
               TypeOfSpace: unitInfo.TypeOfSpace,
               UnitImages: [],
               UnitRemarks: unitInfo.UnitRemarks,
               IsAvailableForSale: unitInfo.IsAvailableForSale,
               LeaseDocumentPath: '',
               UnitBifurcationPossible: unitInfo.UnitBifurcationPossible,
               MinBifurcationArea: unitInfo.MinBifurcationArea,
               UnitCombinationPossible: unitInfo.UnitCombinationPossible,
               CombinationUnits: unitInfo.CombinationUnits,
               OccupierIndustry: unitInfo.OccupierIndustry,
               UnitContacts: [
                    {
                         UnitContactDetails: unitInfo.UnitContactDetails,
                         UnitContactName: unitInfo.UnitContactName,
                         UnitContactDesignation: unitInfo.UnitContactDesignation,
                         UnitContactEmail: unitInfo.UnitContactEmail,
                         UnitContactPhoneNumber: unitInfo.UnitContactPhoneNumber
                    }
               ]
          };

          return _unitPayload;
     }
}
