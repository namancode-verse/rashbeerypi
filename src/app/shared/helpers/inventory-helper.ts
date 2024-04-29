import { SelectTagOption } from '../interfaces/common.interface';

export class InventoryHelper {
     public defalutBuildingOptions: SelectTagOption[] = [
          {
               id: 1,
               name: 'Yes',
               value: 'Yes',
               selected: false
          },
          {
               id: 2,
               name: 'No',
               value: 'no',
               selected: false
          }
     ];

     public defalutFloorOptions: SelectTagOption[] = [
          {
               id: 1,
               name: 'Yes',
               value: 'Yes',
               selected: false
          },
          {
               id: 2,
               name: 'No',
               value: 'No',
               selected: false
          },
          {
               id: 3,
               name: 'Not Available',
               value: 'Not Available',
               selected: false
          }
     ];

     public getFormField(name: any, label: any, type: any, tag: any, placeholder: any, alias: any, value: any, options: any = []) {
          let payload = {
               name: name,
               tag: tag,
               type: type,
               label: label,
               alias: alias,
               placeholder: placeholder,
               options: options,
               default: {
                    value: value,
                    styles: {
                         disabled: false
                    },
                    validations: [
                         {
                              required: true,
                              message: label + ' is required'
                         },
                         {
                              email: false,
                              message: 'Please enter valid Email'
                         },
                         {
                              pattern: false,
                              regex: '',
                              message: ''
                         },
                         {
                              minLength: false,
                              message: '',
                              length: 10
                         },
                         {
                              maxLength: false,
                              message: '',
                              length: 20
                         }
                    ]
               }
          };
          return payload;
     }

     public getFormFieldLabel(inputString: string): string {
          const words = inputString.split(/(?=[A-Z])|\s+/);
          let newWord = '';
          words.forEach((element) => {
               newWord = newWord + element + ' ';
          });
          return newWord.trim();
     }

     public beautifyLeaseLabel(label: any) {
          let beautifyLabel = label.replace(/([A-Z])/g, ' $1').trim();
          if (beautifyLabel.includes('Inr Sqft Per Month')) {
               let newString = beautifyLabel.replace('Inr Sqft Per Month', '(INR/SQFT/Month)');
               beautifyLabel = newString;
          } else if (beautifyLabel.includes('Inr Per Car Slot Per Month')) {
               let newString = beautifyLabel.replace('Inr Per Car Slot Per Month', '(INR/Car Slot/Month)');
               beautifyLabel = newString;
          } else if (beautifyLabel.includes('In Months')) {
               let newString = beautifyLabel.replace('In Months', '(In Months)');
               beautifyLabel = newString;
          } else if (beautifyLabel.includes('In Years')) {
               let newString = beautifyLabel.replace('In Years', '(In Years)');
               beautifyLabel = newString;
          } else if (beautifyLabel.includes('Sqft')) {
               let newString = beautifyLabel.replace('Sqft', '(In SQFT)');
               beautifyLabel = newString;
          } else if (beautifyLabel.includes('Rcd')) {
               let newString = beautifyLabel.replace('Rcd', '(RCD)');
               beautifyLabel = newString;
          } else if (beautifyLabel.includes('Lcd')) {
               let newString = beautifyLabel.replace('Lcd', '(LCD)');
               beautifyLabel = newString;
          } else if (beautifyLabel.includes('Rent Free')) {
               let newString = beautifyLabel.replace('Rent Free', '(Rent Free)');
               beautifyLabel = newString;
          } else if (beautifyLabel.includes('Inr Per Month')) {
               let newString = beautifyLabel.replace('Inr Per Month', '(INR/Month)');
               beautifyLabel = newString;
          } else if (beautifyLabel.includes('Inr')) {
               let newString = beautifyLabel.replace('Inr', '(INR)');
               beautifyLabel = newString;
          } else if (beautifyLabel.includes('Provided By Lessor')) {
               let newString = beautifyLabel.replace('Provided By Lessor', '(Provided By Lessor)');
               beautifyLabel = newString;
          }

          return beautifyLabel;
     }

     public getFormFieldAlias(inputString: string): string {
          const words = inputString.split(/(?=[A-Z])|\s+/);
          let newWord = '';
          words.forEach((element) => {
               newWord = newWord + element + '-';
          });
          return newWord.toLowerCase().trim().slice(0, -1);
     }

     public inputField(fieldName: any, value: any = null, inputType: any = 'text') {
          let name = fieldName;
          let label = this.getFormFieldLabel(fieldName);
          let alias = this.getFormFieldAlias(fieldName);
          let placeholder = 'Please enter ' + label;
          let tag = 'input';
          let type = inputType;
          let options = [];
          return this.getFormField(name, label, type, tag, placeholder, alias, value, options);
     }

     public leaseInputField(fieldName: any, value: any = null, inputType: any = 'text') {
          let name = fieldName;
          let label = this.beautifyLeaseLabel(fieldName);
          let alias = this.getFormFieldAlias(fieldName);
          let placeholder = 'Please enter ' + label;
          let tag = 'input';
          let type = inputType;
          let options = [];
          return this.getFormField(name, label, type, tag, placeholder, alias, value, options);
     }

     public textareaField(fieldName: any, value: any = null, inputType: any = 'text') {
          let name = fieldName;
          let label = this.getFormFieldLabel(fieldName);
          let alias = this.getFormFieldAlias(fieldName);
          let placeholder = 'Please enter ' + label;
          let tag = 'textarea';
          let type = inputType;
          let options = [];
          return this.getFormField(name, label, type, tag, placeholder, alias, value, options);
     }

     public dropdownField(fieldName: any, value: any = null, inputType: any = 'dropdown', isFloor: boolean = false) {
          let name = fieldName;
          let label = this.getFormFieldLabel(fieldName);
          let alias = this.getFormFieldAlias(fieldName);
          let placeholder = 'Please select ' + label;
          let tag = 'select';
          let type = inputType;
          let options = isFloor ? this.defalutFloorOptions : this.defalutBuildingOptions;
          return this.getFormField(name, label, type, tag, placeholder, alias, value, options);
     }

     public multiDropdownField(fieldName: any, value: any = null, inputType: any = 'multiDropdown') {
          let name = fieldName;
          let label = this.getFormFieldLabel(fieldName);
          let alias = this.getFormFieldAlias(fieldName);
          let placeholder = 'Please select ' + label;
          let tag = 'multi-select';
          let type = inputType;
          return this.getFormField(name, label, type, tag, placeholder, alias, value, this.defalutBuildingOptions);
     }

     public inventoryObjectTemplate = {
          Header: {
               BuildingName: this.inputField('BuildingName'),
               BuildingTitle: this.dropdownField('BuildingTitle'),
               LocationLat: this.inputField('LocationLat'),
               LocationLng: this.inputField('LocationLng'),
               LocationAltitude: this.inputField('LocationAltitude'),
               LocationAccuracy: this.inputField('LocationAccuracy'),
               ExclusivelyMarketedBy: this.inputField('ExclusivelyMarketedBy'),
               BuildingDescription: this.textareaField('BuildingDescription')
          },
          BuildingAddress: {
               AddressLine1: this.inputField('AddressLine1'),
               AddressLine2: this.inputField('AddressLine2'),
               PinCode: this.inputField('PinCode'),
               City: this.dropdownField('City'),
               State: this.dropdownField('State')
          },
          BuildingDetails: {
               MicroMarket: this.dropdownField('MicroMarket'),
               BuildYear: this.inputField('BuildYear'),
               OwnershipType: this.dropdownField('OwnershipType'),
               DeveloperName: this.inputField('DeveloperName'),
               BuildingStructure: this.inputField('BuildingStructure'),
               TotalLeasableArea: this.inputField('TotalLeasableArea'),
               RetailArea: this.inputField('RetailArea'),
               OfficeArea: this.inputField('OfficeArea'),
               CarParkingAvailable: this.dropdownField('CarParkingAvailable'),
               CarParkingRatio: this.inputField('CarParkingRatio'),
               TwoWheelerParkingAvailable: this.dropdownField('TwoWheelerParkingAvailable'),
               TwoWheelerParkingRatio: this.inputField('TwoWheelerParkingRatio'),
               BuildingCode: this.inputField('BuildingCode'),
               CampusBuilding: this.dropdownField('CampusBuilding'),
               CampusName: this.inputField('CampusName'),
               NoOfRamps: this.inputField('NoOfRamps'),
               NumberOfAssemblyPoints: this.inputField('NumberOfAssemblyPoints'),
               OperationalHours: this.inputField('OperationalHours'),
               TwentyFourBySevenOperations: this.dropdownField('TwentyFourBySevenOperations'),
               VastuCompliant: this.dropdownField('VastuCompliant'),
               CamRetail: this.inputField('CamRetail'),
               CamOffice: this.inputField('CamOffice'),
               FacilityManagedBy: this.inputField('FacilityManagedBy'),
               QuotedEfficiency: this.inputField('QuotedEfficiency')
          },
          ContactPersonLease: {
               LeasingManagerName: this.inputField('LeasingManagerName'),
               Designation: this.inputField('Designation'),
               Email: this.inputField('Email'),
               Phone: this.inputField('Phone')
          },
          ContactPersonBuildingManager: {
               BuildingManagerName: this.inputField('BuildingManagerName'),
               Designation: this.inputField('Designation'),
               Email: this.inputField('Email'),
               Phone: this.inputField('Phone')
          },
          Neighbourhood: {
               NearestHotel: this.inputField('NearestHotel'),
               NearestHotelDistance: this.inputField('NearestHotelDistance'),
               NearestRestaurant: this.inputField('NearestRestaurant'),
               NearestRestaurantDistance: this.inputField('NearestRestaurantDistance'),
               NearbyResidentialCatchment: this.inputField('NearbyResidentialCatchment'),
               NearestResidentialCatchmentDistance: this.inputField('NearestResidentialCatchmentDistance')
          },
          BuildingCertifications: {
               Certifications: this.multiDropdownField('Certifications')
          },
          Commute: {
               NearestMetro: this.dropdownField('NearestMetro'),
               NearestMetroStationDistance: this.inputField('NearestMetroStationDistance'),
               NearestAirport: this.dropdownField('NearestAirport'),
               NearestAirportDistance: this.inputField('NearestAirportDistance'),
               NearestRailwayStation: this.inputField('NearestRailwayStation'),
               NearestRailwayStationDistance: this.inputField('NearestRailwayStationDistance')
          },
          Facilities: {
               HVAC: this.dropdownField('HVAC'),
               TypeOfSystem: this.dropdownField('TypeOfSystem'),
               AirFilteration: this.dropdownField('AirFilteration'),
               ElevatorsCommon: this.dropdownField('ElevatorsCommon'),
               NumberOfElevators: this.inputField('NumberOfElevators'),
               EscalatorsCommon: this.inputField('EscalatorsCommon'),
               NumberOfServiceElevators: this.inputField('NumberOfServiceElevators'),
               NumberOfParkingElevators: this.inputField('NumberOfParkingElevators'),
               LiftSpeed: this.inputField('LiftSpeed'),
               LiftQuality: this.dropdownField('LiftQuality'),
               PowerBackup: this.dropdownField('PowerBackup'),
               DrainageSystem: this.dropdownField('DrainageSystem'),
               FireDetectionSystem: this.dropdownField('FireDetectionSystem'),
               NumberOfStaircasesFireEscapes: this.inputField('NumberOfStaircasesFireEscapes'),
               NumberOfStaircasesBasements: this.inputField('NumberOfStaircasesBasements'),
               StaircaseStructure: this.dropdownField('StaircaseStructure'),
               EarthquakeResistance: this.dropdownField('EarthquakeResistance'),
               FireHydrationSystem: this.inputField('FireHydrationSystem'),
               GarbageDisposalArea: this.dropdownField('GarbageDisposalArea'),
               WaterBodies: this.dropdownField('WaterBodies'),
               TotalWashrooms: this.inputField('TotalWashrooms'),
               GentsWashrooms: this.inputField('GentsWashrooms'),
               LadiesWashrooms: this.inputField('LadiesWashrooms'),
               HandicapsWashrooms: this.inputField('HandicapsWashrooms'),
               TotalWashbasins: this.inputField('TotalWashbasins'),
               EmergencyExits: this.inputField('EmergencyExits')
          },
          Amenities: {
               Gymnasium: this.dropdownField('Gymnasium'),
               GymanisumBrand: this.inputField('GymanisumBrand'),
               Creche: this.dropdownField('Creche'),
               CrecheBrand: this.inputField('CrecheBrand'),
               FoodCourt: this.dropdownField('FoodCourt'),
               FoodCourtBrand: this.inputField('FoodCourtBrand'),
               Auditorium: this.dropdownField('Auditorium'),
               RecreationArea: this.inputField('RecreationArea')
          },
          ClassifiedInfo: {
               OccupancyCertificate: this.dropdownField('OccupancyCertificate'),
               OCAwaitedMonth: this.inputField('OCAwaitedMonth'),
               CompletionCertificate: this.dropdownField('CompletionCertificate'),
               CCAwaitedMonth: this.inputField('CCAwaitedMonth'),
               FireNOC: this.dropdownField('FireNOC'),
               FireNOCAwaitedMonth: this.inputField('FireNOCAwaitedMonth'),
               ColumnToColumnRatio: this.inputField('ColumnToColumnRatio'),
               FloorToFloorHeight: this.inputField('FloorToFloorHeight'),
               PowerSupply: this.dropdownField('PowerSupply'),
               LTPanel: this.dropdownField('LTPanel'),
               DGSets: this.dropdownField('DGSets'),
               DGSetsCapacity: this.inputField('DGSetsCapacity'),
               EmergencyLighting: this.dropdownField('EmergencyLighting'),
               WaterSupply: this.dropdownField('WaterSupply'),
               UndergroundTank: this.dropdownField('UndergroundTank'),
               UndergroundTankCapacity: this.inputField('UndergroundTankCapacity'),
               OverheadTank: this.dropdownField('OverheadTank'),
               OverheadTankCapacity: this.inputField('OverheadTankCapacity'),
               WaterTreatmentPlant: this.dropdownField('WaterTreatmentPlant'),
               WTPCapacity: this.inputField('WTPCapacity'),
               SewageTreatmentPlant: this.dropdownField('SewageTreatmentPlant'),
               STPCapacity: this.inputField('STPCapacity'),
               RainWaterHarvesting: this.dropdownField('RainWaterHarvesting')
          },
          BuildingVisibility: {
               Visibility: this.dropdownField('Visibility')
          }
     };

     public inventoryFloorObjectTemplate: any = {
          FloorNumber: this.inputField('FloorNumber'),
          FloorPlate: this.inputField('FloorPlate'),
          FloorStackType: this.dropdownField('FloorStackType', null, 'dropdown', true),
          FloorPlanAvailable: this.dropdownField('FloorPlanAvailable', null, 'dropdown', true),
          AutoCadAvailable: this.dropdownField('AutoCadAvailable', null, 'dropdown', true)
     };

     public inventoryUnitObjectTemplate: any = {
          FloorNumber: this.dropdownField('FloorNumber'),
          UnitName: this.inputField('UnitName'),
          UnitStatus: this.dropdownField('UnitStatus'),
          Availability: this.inputField('Availability'),
          OccupierName: this.inputField('OccupierName'),
          RentRangeMin: this.inputField('RentRangeMin'),
          RentRangeMax: this.inputField('RentRangeMax'),
          UnitArea: this.inputField('UnitArea'),
          TypeOfSpace: this.dropdownField('TypeOfSpace'),
          UnitRemarks: this.inputField('UnitRemarks'),
          IsAvailableForSale: this.inputField('IsAvailableForSale'),
          UnitBifurcationPossible: this.dropdownField('UnitBifurcationPossible'),
          MinBifurcationArea: this.inputField('MinBifurcationArea'),
          UnitCombinationPossible: this.dropdownField('UnitCombinationPossible'),
          CombinationUnits: this.inputField('CombinationUnits'),
          OccupierIndustry: this.dropdownField('OccupierIndustry'),
          UnitContactName: this.inputField('UnitContactName'),
          UnitContactDesignation: this.inputField('UnitContactDesignation'),
          UnitContactEmail: this.inputField('UnitContactEmail'),
          UnitContactPhoneNumber: this.inputField('UnitContactPhoneNumber')
     };

     public inventoryLeaseObjectTemplate: any = {
          AreaDetails: {
               ChargeableAreaSqft: this.leaseInputField('ChargeableAreaSqft'),
               CarpetAreaSqft: this.leaseInputField('CarpetAreaSqft'),
               BuildingName: this.leaseInputField('BuildingName'),
               Tower: this.leaseInputField('Tower'),
               Floor: this.leaseInputField('Floor'),
               UnitNo: this.leaseInputField('UnitNo'),
               OperationalHours: this.leaseInputField('OperationalHours'),
               Address: this.leaseInputField('Address')
          },
          LesseeDetails: {
               Lessee: this.leaseInputField('Lessee'),
               LesseeSigningAuthority: this.leaseInputField('LesseeSigningAuthority'),
               Designation: this.leaseInputField('Designation'),
               Phone: this.leaseInputField('Phone'),
               Email: this.leaseInputField('Email')
          },
          LessorDetails: {
               Lessor: this.leaseInputField('Lessor'),
               LessorSigningAuthority: this.leaseInputField('LessorSigningAuthority'),
               Designation: this.leaseInputField('Designation'),
               Phone: this.leaseInputField('Phone'),
               Email: this.leaseInputField('Email')
          },
          DatesAndTimelines: {
               TypeOfLease: this.leaseInputField('TypeOfLease'),
               LeaseCommencementDateLcd: this.leaseInputField('LeaseCommencementDateLcd'),
               HandOverDate: this.leaseInputField('HandOverDate'),
               RentCommencementDateRcd: this.leaseInputField('RentCommencementDateRcd'),
               OperationalRentFreePeriod: this.leaseInputField('OperationalRentFreePeriod'),
               LeaseTenureInYears: this.leaseInputField('LeaseTenureInYears'),
               LeaseTermInYears: this.leaseInputField('LeaseTermInYears'),
               LeaseRenewalTermInYears: this.leaseInputField('LeaseRenewalTermInYears'),
               LockInPeriod: this.leaseInputField('LockInPeriod'),
               LockInExpiryDate: this.leaseInputField('LockInExpiryDate'),
               FitOutPeriodRentFree: this.leaseInputField('FitOutPeriodRentFree'),
               LeaseExpiryDate: this.leaseInputField('LeaseExpiryDate'),
               LeaseTermExpiryDate: this.leaseInputField('LeaseTermExpiryDate'),
               NoticePeriodInMonths: this.leaseInputField('NoticePeriodInMonths'),
               LeaseStatus: this.leaseInputField('LeaseStatus')
          },
          RentalAndSecurityDetails: {
               RentOnChargeableAreaInrSqftPerMonth: this.leaseInputField('RentOnChargeableAreaInrSqftPerMonth'),
               StartingMonthlyRentInr: this.leaseInputField('StartingMonthlyRentInr'),
               CommonAreaMaintenanceCamInrSqftPerMonth: this.leaseInputField('CommonAreaMaintenanceCamInrSqftPerMonth'),
               RentEscalationTenureAndPercentage: this.leaseInputField('RentEscalationTenureAndPercentage'),
               CamEscalationTenureAndPercentage: this.leaseInputField('CamEscalationTenureAndPercentage'),
               NoOfCarParks: this.leaseInputField('NoOfCarParks'),
               NoOfFreeCarParkingSlots: this.leaseInputField('NoOfFreeCarParkingSlots'),
               AdditionalCarParkingSlots: this.leaseInputField('AdditionalCarParkingSlots'),
               CarParkingChargesInrPerCarSlotPerMonth: this.leaseInputField('CarParkingChargesInrPerCarSlotPerMonth'),
               AdditionalCarParkingChargesInrPerCarSlotPerMonth: this.leaseInputField('AdditionalCarParkingChargesInrPerCarSlotPerMonth'),
               InterestFreeRefundableSecurityDepositInMonths: this.leaseInputField('InterestFreeRefundableSecurityDepositInMonths'),
               InterestFreeRefundableMaintenanceDepositInMonths: this.leaseInputField('InterestFreeRefundableMaintenanceDepositInMonths')
          },
          MiscellaneousInformation: {
               SignageChargesInrPerMonth: this.leaseInputField('SignageChargesInrPerMonth'),
               PowerSupplyProvidedByLessor: this.leaseInputField('PowerSupplyProvidedByLessor'),
               InterestFreeRefundableUtilitiesDepositInMonths: this.leaseInputField('InterestFreeRefundableUtilitiesDepositInMonths')
          }
     };

     public opportunityObjectTemplate: any = {
          FirstName: this.inputField('FirstName'),
          LastName: this.inputField('LastName'),
          Email: this.inputField('Email'),
          PhoneNumber: this.inputField('PhoneNumber'),
          CompanyName: this.inputField('CompanyName'),
          JobTitle: this.inputField('JobTitle'),
          LeadSource: this.inputField('LeadSource'),
          LeadStatus: this.inputField('LeadStatus'),
          IsDemoActive: this.inputField('IsDemoActive'),
          ProductType: this.inputField('ProductType')
     };

     public beautifyLabel(label: any) {
          let beautifyLabel = label.replace(/([A-Z])/g, ' $1').trim();
          return beautifyLabel;
     }
}
