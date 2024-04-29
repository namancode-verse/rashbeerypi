export interface SelectedFiles {
     type: any;
     fileName: any;
     location: any;
}
export interface UploadFilePopupBox {
     fieldName: any;
     fieldId: any;
     boxTitle: any;
     isMultiple: boolean;
}

export interface ImageUploadHelper {
     status: boolean;
     category: any;
     key: any;
     level: any;
     responseId?: any;
     acceptFileType?: any;
     surveyId?: any;
     buildingId?: any;
     buildingIdentifier?: any;
     floorIdentifier?: any;
     unitIdentifier?: any;
     headerTitle?: any;
     uploadMultiple?: boolean;
     files?: any;
}
