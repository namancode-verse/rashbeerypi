export interface BuildingDataType {
     FieldType: any;
     FieldValue: any;
     FieldTitle: any;
     FieldOptions?: any[];
}

export interface SelectTagOption {
     id: any;
     name: any;
     value: any;
     selected: boolean;
}

export interface MicroMarketSelectTagOption {
     id: any;
     name: any;
     value: any;
     city: any;
     cityId: any;
     selected: boolean;
}

export interface BuildingFields {
     BuildingId: string;
     BuildingName: string;
     BuildingDescription: string;
     BuildingTitle: string;
     City: string;
     PinCode: string;
     State: string;
     BuildingStructure: string;
     MicroMarket: string;
     BuildYear: string;
     OwnershipType: string;
     BuildingIdentifier: string;
     IsActive: boolean;
}

export interface BuildingFloorFields {
     FloorId: string;
     BuildingIdentifier: string;
     FloorIdentifier: string;
     FloorNumber: string;
     BuildingName: string;
     BuildingTitle: string;
     FloorPlate: string;
     FloorStackType: string;
     FloorPlanAvailable: string;
     AutoCadAvailable: string;
     FloorPlanImages: string;
     AutoCadFiles: string;
     IsActive: boolean;
}

export interface BuildingUnitFields {
     UnitId: string;

     FloorId: string;
     BuildingIdentifier: string;
     UnitIdentifier: string;
     FloorIdentifier: string;
     FloorNumber: string;
     UnitName: string;
     UnitStatus: string;
     Availability: string;
     OccupierName: string;
     RentRange: string;
     UnitArea: string;
     TypeOfSpace: string;
     UnitRemarks: string;
     IsAvailableForSale: string;
     UnitContact: any;
     UnitContactName: string;
     UnitContactDesignation: string;
     UnitContactEmail: string;
     UnitContactPhoneNumber: string;
     UnitBifurcationPossible: string;
     MinBifurcationArea: any;
     UnitCombinationPossible: string;
     CombinationUnits: any;
     OccupierIndustry: any;
     IsActive: boolean;
}
export interface BuildingLeaseFields {
     UnitId: string;
     FloorId: string;
     LeaseId: string;
     FloorNumber: string;
     BuildingName: string;
     UnitName: string;
     ChargeableAreaSqft: string;
     BuildingIdentifier: string;
     TypeOfLease: string;
     Lessor: string;
     Lessee: string;
     LeaseStatus: string;
}
