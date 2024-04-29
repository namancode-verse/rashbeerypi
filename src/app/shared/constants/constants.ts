// prettier-ignore
export const inventoryColumns: string[] = [
          'BuildingName',
          'BuildingTitle',
          'City',
          'PinCode',
          'State',
          'BuildingStructure',
          'MicroMarket',
          'BuildYear',
          'OwnershipType',
          'Action'
     ];

// prettier-ignore
export const inventoryFloorColumns: string[] = [
     'FloorNumber',
     'BuildingName',
     'BuildingTitle',
     'FloorPlate',
     'FloorStackType',
     'FloorPlanAvailable',
     'AutoCadAvailable',
     'Action'
];

// prettier-ignore
export const inventoryUnitColumns: string[] = [
     "UnitName",
     "FloorNumber",
     "BuildingName",
     "BuildingTitle",
     "UnitStatus",
     "UnitArea",
     "RentRange",
     "TypeOfSpace",
     "Availability",
     "OccupierName",
     "UnitRemarks",
     "IsAvailableForSale",
     "UnitContactName",
     "UnitContactDesignation",
     "UnitContactEmail",
     "UnitContactPhoneNumber",
     "Action",
];

// prettier-ignore
export const inventoryLeaseColumns: string[] = [
     "BuildingName",
     "FloorNumber",
     "UnitName",
     "TypeOfLease",
     "Lessor",
     "Lessee",
     "ChargeableAreaSqft",
     "LeaseStatus",
     "Action",
];

export const searchFilters = {
     queryParams: null
};

export const inventoryUnitContactFields: string[] = ['UnitContactDetails', 'UnitContactName', 'UnitContactDesignation', 'UnitContactEmail', 'UnitContactPhoneNumber'];
