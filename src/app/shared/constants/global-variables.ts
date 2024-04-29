import { MicroMarketSelectTagOption, SelectTagOption } from '../interfaces/common.interface';

export class GlobalVariables {
     //
     public cityList: SelectTagOption[] = [];
     public stateList: SelectTagOption[] = [];
     public havcList: SelectTagOption[] = [];
     public unitStatus: SelectTagOption[] = [];
     public floorStackType: SelectTagOption[] = [];
     public buildingTitles: SelectTagOption[] = [];
     public microMarketList: SelectTagOption[] = [];
     public typeOfSpaceList: SelectTagOption[] = [];
     public ownershipTypeList: SelectTagOption[] = [];
     public occupierIndustryList: SelectTagOption[] = [];
     public microMarketListWithCityName: MicroMarketSelectTagOption[] = [];
     public isAbleToAccessLease: boolean = false;

     public liftQualityList: SelectTagOption[] = [
          {
               id: 1,
               name: 'Destination Controlled',
               value: 'Destination Controlled',
               selected: false
          },
          {
               id: 2,
               name: 'Manual',
               value: 'Manual',
               selected: false
          }
     ];

     public staircaseStructureList: SelectTagOption[] = [
          {
               id: 1,
               name: 'Single',
               value: 'Single',
               selected: false
          },
          {
               id: 2,
               name: 'Multiple',
               value: 'Multiple',
               selected: false
          }
     ];

     public buildingVisibilityList: SelectTagOption[] = [
          {
               id: 1,
               name: 'Public',
               value: 'Public',
               selected: false
          },
          {
               id: 2,
               name: 'Private',
               value: 'Private',
               selected: false
          }
     ];

     public certifications: SelectTagOption[] = [
          {
               id: 1,
               name: 'GRIHA',
               value: 'GRIHA',
               selected: true
          },
          {
               id: 2,
               name: 'LEEDS',
               value: 'LEEDS',
               selected: true
          },
          {
               id: 3,
               name: 'DELOS',
               value: 'DELOS',
               selected: false
          },
          {
               id: 4,
               name: 'Green Building',
               value: 'Green Building',
               selected: false
          },
          {
               id: 5,
               name: 'None',
               value: 'None',
               selected: false
          }
     ];

     public initializeConstantsVariables(masterData: any) {
          //
          this.buildingTitles = [];
          let buildingTitlesIndex = 1;
          for (const element of masterData['BuildingTitle']) {
               let payload = {
                    id: Number(buildingTitlesIndex),
                    name: element.Name,
                    value: element.Name,
                    selected: false
               };

               this.buildingTitles.push(payload);
               buildingTitlesIndex = buildingTitlesIndex + 1;
          }

          this.cityList = [];
          for (const element of masterData['City']) {
               let payload = {
                    id: Number(element.Id),
                    name: element.Name,
                    value: element.Name,
                    selected: false
               };
               this.cityList.push(payload);
          }

          this.stateList = [];
          let stateIndex = 1;
          for (const element of masterData['State']) {
               let payload = {
                    id: Number(stateIndex),
                    name: element.Name,
                    value: element.Name,
                    selected: false
               };

               this.stateList.push(payload);
               stateIndex = stateIndex + 1;
          }

          this.ownershipTypeList = [];
          let ownershipTypeIndex = 1;
          for (const element of masterData['OwnershipType']) {
               let payload = {
                    id: Number(ownershipTypeIndex),
                    name: element.Name,
                    value: element.Name,
                    selected: false
               };

               this.ownershipTypeList.push(payload);
               ownershipTypeIndex = ownershipTypeIndex + 1;
          }

          this.havcList = [];
          let havcIndex = 1;
          for (const element of masterData['SystemType']) {
               let payload = {
                    id: Number(havcIndex),
                    name: element.Name,
                    value: element.Name,
                    selected: false
               };

               this.havcList.push(payload);
               havcIndex = havcIndex + 1;
          }

          this.typeOfSpaceList = [];
          let typeOfSpaceIndex = 1;
          for (const element of masterData['TypeOfSpace']) {
               let payload = {
                    id: Number(typeOfSpaceIndex),
                    name: element.Name,
                    value: element.Name,
                    selected: false
               };

               this.typeOfSpaceList.push(payload);
               typeOfSpaceIndex = typeOfSpaceIndex + 1;
          }

          this.floorStackType = [];
          let floorStackTypeIndex = 1;
          for (const element of masterData['StackType']) {
               let payload = {
                    id: Number(floorStackTypeIndex),
                    name: element.Name,
                    value: element.Name,
                    selected: false
               };

               this.floorStackType.push(payload);
               floorStackTypeIndex = floorStackTypeIndex + 1;
          }

          this.unitStatus = [];
          let unitStatusIndex = 1;
          for (const element of masterData['OccupierUnitStatus']) {
               let payload = {
                    id: Number(unitStatusIndex),
                    name: element.Name,
                    value: element.Name,
                    selected: false
               };

               this.unitStatus.push(payload);
               unitStatusIndex = unitStatusIndex + 1;
          }

          this.occupierIndustryList = [];
          let OccupierUnitIndustryIndex = 1;
          for (const element of masterData['OccupierUnitIndustry']) {
               let payload = {
                    id: Number(OccupierUnitIndustryIndex),
                    name: element.Name,
                    value: element.Name,
                    selected: false
               };
               this.occupierIndustryList.push(payload);
               OccupierUnitIndustryIndex = OccupierUnitIndustryIndex + 1;
          }

          this.microMarketListWithCityName = [];
          let MicroMarketIndex = 1;
          for (const element of masterData['MicroMarket']) {
               let cityName = '';
               masterData['City'].forEach((city: any) => {
                    if (element.CityId == city.Id) {
                         cityName = city.Name;
                    }
               });
               let _tempPayload = {
                    id: Number(MicroMarketIndex),
                    name: element.Name,
                    value: element.Name,
                    city: cityName,
                    cityId: element.CityId,
                    selected: false
               };
               this.microMarketListWithCityName.push(_tempPayload);
               MicroMarketIndex = MicroMarketIndex + 1;
          }
     }

     public tempInventoryInfo = {
          Header: {
               BuildingName: 'Willowbrook Apartments',
               BuildingTitle: 'Institutional',
               LocationLat: '28.4970247',
               LocationLng: '77.1614945',
               LocationAltitude: '237.59999084472656',
               LocationAccuracy: '18.69300079345703',
               BuildingDescription: '"Willowbrook Apartments" offers modern living in a serene and picturesque setting. Nestled amidst lush greenery and tranquil surroundings, our apartments provide a perfect blend of comfort and convenience.',
               ExclusivelyMarketedBy: 'Om Pandey',
               BuildingImages: [],
               BuildingAddress: {
                    AddressLine1: 'Gurugram Sector 48 Phase 1 ',
                    AddressLine2: 'Gurugram Sector 48 Phase 2',
                    PinCode: '9800102',
                    City: 'Gurugram',
                    State: 'Haryana'
               }
          },
          BuildingDetails: {
               MicroMarket: 'Sohna Road',
               BuildYear: '2020',
               OwnershipType: 'Single Owner',
               DeveloperName: 'Om Pandey',
               BuildingStructure: '3B+G+5',
               TotalLeasableArea: '25000',
               RetailArea: '15000',
               OfficeArea: '10000',
               CarParkingAvailable: 'Yes',
               CarParkingRatio: '1 Per 120',
               TwoWheelerParkingAvailable: 'Yes',
               TwoWheelerParkingRatio: '1 Per 155',
               BuildingCode: '987062',
               CampusBuilding: 'Yes',
               CampusName: 'New Campus ',
               NoOfRamps: '12',
               NumberOfAssemblyPoints: '16',
               OperationalHours: '24*7',
               TwentyFourBySevenOperations: 'Yes',
               VastuCompliant: 'Yes',
               CamRetail: '120',
               CamOffice: '140',
               FacilityManagedBy: 'Om PandeY',
               QuotedEfficiency: '55',
               ContactPersonLease: {
                    LeasingManager: 'Om Parkash',
                    LeasingManagerName: 'Om Parkash Pandey ',
                    Designation: 'Building Manager ',
                    Email: 'Omkumar887786@gmail.com',
                    Phone: '7464067216'
               },
               ContactPersonBuildingManager: {
                    BuildingManager: 'Aditya Pandey',
                    BuildingManagerName: 'Aditya Pandey ',
                    Designation: 'Building Manager ',
                    Email: 'aadityapandey000999@gmail.com',
                    Phone: '9835405715'
               }
          },
          Commute: {
               NearestMetro: 'Yes',
               NearestMetroStationDistance: '12',
               NearestAirport: 'Yes',
               NearestAirportDistance: '10',
               NearestRailwayStation: 'NRT-132AM',
               NearestRailwayStationDistance: '16'
          },
          Neighbourhood: {
               NearestHotel: 'Star Hotel',
               NearestHotelDistance: '15',
               NearestRestaurant: 'Star Restaurant',
               NearestRestaurantDistance: '10',
               NearbyResidentialCatchment: 'High',
               NearestResidentialCatchmentDistance: '18'
          },
          Facilities: {
               HVAC: 'Yes',
               TypeOfSystem: 'VRF',
               AirFilteration: 'Yes',
               ElevatorsCommon: 'Yes',
               NumberOfElevators: '4',
               EscalatorsCommon: 'Yes',
               NumberOfServiceElevators: '4',
               NumberOfParkingElevators: '2',
               LiftSpeed: '3',
               LiftQuality: 'Destination Controlled',
               PowerBackup: 'Yes',
               DrainageSystem: 'Yes',
               FireDetectionSystem: 'Yes',
               NumberOfStaircasesFireEscapes: '4',
               NumberOfStaircasesBasements: '6',
               StaircaseStructure: 'Single',
               EarthquakeResistance: 'Yes',
               FireHydrationSystem: 'Yes',
               GarbageDisposalArea: 'Yes',
               WaterBodies: 'Yes',
               TotalWashrooms: '4',
               GentsWashrooms: '2',
               LadiesWashrooms: '2',
               HandicapsWashrooms: '4',
               TotalWashbasins: '6',
               EmergencyExits: '120'
          },
          Amenities: {
               Gymnasium: 'Yes',
               GymanisumBrand: 'Om Fitness ',
               Creche: 'Yes',
               CrecheBrand: 'New Creche ',
               FoodCourt: 'Yes',
               FoodCourtBrand: 'Haldiram Restaurant ',
               Auditorium: 'Yes',
               RecreationArea: 'Yes'
          },
          BuildingCertifications: ['GRIHA, LEEDS, DELOS'],
          ClassifiedInfo: {
               OccupancyCertificate: 'Yes',
               OCAwaitedMonth: '2024-12-12',
               CompletionCertificate: 'Yes',
               CCAwaitedMonth: '2024-12-12',
               FireNOC: 'No',
               FireNOCAwaitedMonth: '2022-01-01',
               ColumnToColumnRatio: '3',
               FloorToFloorHeight: '4',
               PowerSupply: 'Yes',
               LTPanel: 'Yes',
               DGSets: 'No',
               DGSetsCapacity: '12400',
               EmergencyLighting: 'Yes',
               WaterSupply: 'Yes',
               UndergroundTank: 'Yes',
               UndergroundTankCapacity: '45000',
               OverheadTank: 'Yes',
               OverheadTankCapacity: '50000',
               WaterTreatmentPlant: 'Yes',
               WTPCapacity: '120000',
               SewageTreatmentPlant: 'Yes',
               STPCapacity: '45800',
               RainWaterHarvesting: 'Yes'
          },
          BuildingVisibility: {
               Visibility: 'Public'
          }
     };

     public _tempInventoryFloorInfo = {
          FloorId: 4129,
          FloorIdentifier: 'Floor-f06a84f6-b91c-4c3e-865e-f55f7e7b1a9c',
          FloorNumber: '0',
          FloorPlate: '24000',
          FloorStackType: 'Office',
          FloorPlanAvailable: 'Yes',
          FloorPlanImages: [],
          AutoCadAvailable: 'Yes',
          AutoCadFiles: [],
          Units: [],
          isActive: true
     };

     public _tempInventoryUnitInfo = {
          UnitId: 12243,
          UnitIdentifier: 'Unit-b98fb823-ccaa-4cda-977d-b511cdae1bd8',
          UnitName: '01',
          UnitStatus: 'Occupied',
          Availability: '2024-12-12',
          OccupierName: 'Standard chartered',
          RentRange: '123-126',
          UnitImages: [],
          UnitArea: '10000',
          TypeOfSpace: 'Furnished (Old fitouts)',
          UnitRemarks: 'Not Available',
          IsAvailableForSale: 'No',
          UnitBifurcationPossible: 'Yes',
          MinBifurcationArea: '0',
          UnitCombinationPossible: 'Yes',
          CombinationUnits: '001, 002, 003',
          UnitContacts: [
               {
                    UnitContactDetails: 'Om Pandey',
                    UnitContactName: 'Ankit Goel',
                    UnitContactDesignation: 'Leasing Manager',
                    UnitContactEmail: 'goel-ankit@dlf.in',
                    UnitContactPhoneNumber: '9818913293'
               }
          ],
          OccupierIndustry: 'Others',
          isActive: true
     };

     public _tempInventoryLeaseInfo = {
          LeaseId: 5,
          BuildingIdentifier: 'Building-a7360b87-aadf-49d6-9d5f-a3017a4740f7',
          LeaseIdentifier: 'e13e0088-c49d-463c-93e7-c57b1d4a4eb2',
          LeasePdfUrl: '',
          LeaseStartDate: '2021-09-01',
          LeaseAbstract: {
               AreaDetails: {
                    ChargeableAreaSqft: '52818',
                    CarpetAreaSqft: '52818',
                    BuildingName: 'DLF Building No. 7A',
                    Tower: 'A',
                    Floor: '6',
                    UnitNo: '001',
                    OperationalHours: '(Mon-Fri) 8am to 8pm (Sat) 8am to 2pm',
                    Address: 'DLF Cyber City Gurgaon'
               },
               LesseeDetails: {
                    Lessee: 'Dyninno lndia LLP',
                    LesseeSigningAuthority: 'Mr. Rakesh Kumar',
                    Designation: 'Building Manager',
                    Phone: '7464067216',
                    Email: 'omkumar887786@gamail.com'
               },
               LessorDetails: {
                    Lessor: 'Chulbul Pandey',
                    LessorSigningAuthority: 'Chulbul Pandey Lessor SU',
                    Designation: 'Dynamic Response Architect',
                    Phone: '9939266744',
                    Email: 'omparkashpandey999@gmail.com'
               },
               DatesAndTimelines: {
                    TypeOfLease: 'Lease',
                    LeaseCommencementDateLcd: '2021-09-01',
                    HandOverDate: '2021-11-30',
                    RentCommencementDateRcd: '2021-11-30',
                    OperationalRentFreePeriod: '6 Months',
                    LeaseTenureInYears: '5',
                    LeaseTermInYears: '4',
                    LeaseRenewalTermInYears: '4',
                    LockInPeriod: '54 Months from LCD',
                    LockInExpiryDate: '2026-02-28',
                    FitOutPeriodRentFree: '3 Months',
                    LeaseExpiryDate: '2026-09-01',
                    LeaseTermExpiryDate: '2025-09-01',
                    NoticePeriodInMonths: '6 Months',
                    LeaseStatus: 'Active'
               },
               RentalAndSecurityDetails: {
                    RentOnChargeableAreaInrSqftPerMonth: '107',
                    StartingMonthlyRentInr: '5651526',
                    CommonAreaMaintenanceCamInrSqftPerMonth: '23.16',
                    RentEscalationTenureAndPercentage: '4% Every 3 Years',
                    CamEscalationTenureAndPercentage: '45',
                    NoOfCarParks: '53',
                    NoOfFreeCarParkingSlots: '0',
                    AdditionalCarParkingSlots: '6',
                    CarParkingChargesInrPerCarSlotPerMonth: '5750',
                    AdditionalCarParkingChargesInrPerCarSlotPerMonth: '6500',
                    InterestFreeRefundableSecurityDepositInMonths: '6 Months',
                    InterestFreeRefundableMaintenanceDepositInMonths: '6 Months'
               },
               MiscellaneousInformation: {
                    SignageChargesInrPerMonth: '240',
                    PowerSupplyProvidedByLessor: '317 KVA @ Rs 4000 per KVA',
                    InterestFreeRefundableUtilitiesDepositInMonths: '230'
               }
          },
          isActive: true
     };

     public globalGeographyWise = [
          {
               Id: 1,
               Name: 'City'
          },
          {
               Id: 2,
               Name: 'Neighborhood'
          },
          {
               Id: 3,
               Name: 'District'
          },
          {
               Id: 4,
               Name: 'Landmark'
          },
          {
               Id: 5,
               Name: 'Postal Code'
          },
          {
               Id: 6,
               Name: 'Region'
          }
     ];
}
