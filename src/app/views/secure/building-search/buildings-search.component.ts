import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { GlobalVariables } from '../../../shared/constants/global-variables';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../shared/services/storage.service';
import { BroadcastService } from '../../../shared/services/broadcast.service';
import { DataService } from '../../../shared/services/data.service';
import { FormModel } from '../../../shared/models/form.model';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import moment from 'moment/moment';
import $ from 'jquery';

@Component({
     selector: 'app-buildings-search',
     templateUrl: './buildings-search.component.html',
     styleUrls: ['./buildings-search.component.scss'],
     encapsulation: ViewEncapsulation.None
})
export class BuildingsSearchComponent implements OnInit, OnDestroy, AfterViewInit {
     @ViewChild('rentRangeCardRef') public rentRangeCardRef: ElementRef;
     @ViewChild('areaRangeCardRef') public areaRangeCardRef: ElementRef;

     public isUserLoggedIn: boolean = false;
     public showRangeSlider: boolean = false;
     public filterPayload: any;
     public buildings = [];
     public buildingList = [];
     public buildingSearchForm: FormGroup;
     public isHomeUrl: boolean = false;
     public isBrokersUrl: boolean = false;
     public isPropertyListingPage: boolean = false;
     public viewMorePropertyFlag: boolean = false;
     public filterSubscription: any;
     public formErrors: any;
     public validationMessage: any;
     public formModel: FormModel;
     public hasChangedForm: boolean = false;
     public isMobileView: boolean = false;
     public propertySearchSubscription: any;
     public currentPropertyView: any = 'GRID';
     public searchFilterDetails = [];

     public city: any;
     public userInfo: any = {};
     public citiesList: any = [];
     public previousUrl: string = null;
     public currentUrl: string = null;
     public routerSubscription: any = null;
     public isFreeUser: boolean = true;
     public dsettings = {};
     public microMarkets: any = [];
     public cityChangeSubs: any = [];
     public buildingAvailability: number = 0;
     public globalVariables: GlobalVariables;
     public geographyWise = [];

     public selectedMoveInDateTime: any = '';

     public clearIconFlags = {
          isValidMicroMarket: false,
          isValidTypeOfSpace: false,
          isValidFreeText: false,
          isValidCategory: false
     };

     public sdropdownfilter = {
          micromarket: [],
          typeofspace: [],
          category: []
     };

     public rcard = {
          rentRange: {
               display: false,
               value: {
                    min: 0,
                    max: 0
               },
               dtext: null,
               isApplied: false
          },
          areaInSqFt: {
               display: false,
               value: {
                    min: 0,
                    max: 0
               },
               dtext: null,
               isApplied: false
          }
     };

     public searchedFor: any = {
          building: {
               label: 'Building',
               value: false
          },
          floor: {
               label: 'BuildingFloor',
               value: false
          },
          unit: {
               label: 'OccupierUnit',
               value: false
          }
     };

     // prettier-ignore
     constructor(
          private _broadcastService: BroadcastService,
          private _storageService: StorageService,
          private _dataService: DataService,
          private _elemRef: ElementRef,
          private _router: Router,

     ) {
          this.formModel = new FormModel();
          this.userInfo = this._storageService.getUserInfo();
          this.isUserLoggedIn = this._storageService.isUserLoggedIn();

          if(this._storageService.getBuildingAvailablity()){
               this.buildingAvailability = this._storageService.getBuildingAvailablity();
          }

          this.globalVariables = new GlobalVariables();
          this.geographyWise = this.globalVariables.globalGeographyWise;

          let masterData = this._storageService.getMasterData();
          if (masterData) {
               this.globalVariables.initializeConstantsVariables(masterData['masters']);
          }
     }

     ngOnInit(): void {
          if (this._router.url == '/' || this._router.url == '/home' || this._router.url == '/dashboard') {
               this.isHomeUrl = true;
          }

          this.createBuildingSearchForm();
          this.handleBroadcastSubscription();
          this.setAllFilterDetails();
          this.executeDSetting();

          this.cityChangeSubs = this._broadcastService.onLeaseCityChange$.subscribe((payload) => {});

          $(document).on('click', '.range-card-header .dropdown-menu', function (e: any) {
               e.stopPropagation();
          });
     }

     ngAfterViewInit(): void {}

     ngOnDestroy(): void {
          if (this.cityChangeSubs) {
               this.cityChangeSubs.unsubscribe();
          }
          if (this.filterSubscription) {
               this.filterSubscription.unsubscribe();
          }

          if (this.propertySearchSubscription) {
               this.propertySearchSubscription.unsubscribe();
          }
     }

     public handleBroadcastSubscription() {
          this.propertySearchSubscription = this._broadcastService.retainSearchParams$.subscribe((res) => {
               this.setSearchFieldValues(res);
          });
     }

     public setSearchFieldValues(filterParams: any) {
          if (filterParams) {
               if (filterParams.FreeText && filterParams.FreeText !== -1) {
                    this.buildingSearchForm.get('freeTextSearchBox').setValue(filterParams.FreeText);
               } else {
                    if (filterParams.MicroMarketIDs) {
                         this.sdropdownfilter.micromarket = [];
                         filterParams.MicroMarketIDs.split('|').map((id) => {
                              this.searchFilterDetails['MicroMarket']
                                   .filter((item) => item.Id == id)
                                   .map((item) => {
                                        this.sdropdownfilter.micromarket.push(item);
                                   });
                         });
                         this.buildingSearchForm.get('micromarket').setValue(this.sdropdownfilter.micromarket);
                    }
                    if (filterParams.TypeOfSpaceIDs) {
                         this.sdropdownfilter.typeofspace = [];
                         filterParams.TypeOfSpaceIDs.split('|').map((id) => {
                              this.searchFilterDetails['TypeOfSpace']
                                   .filter((item) => item.Id == id)
                                   .map((item) => {
                                        this.sdropdownfilter.typeofspace.push(item);
                                   });
                         });
                         this.buildingSearchForm.get('typeOfSpace').setValue(this.sdropdownfilter.typeofspace);
                    }
                    if (filterParams.CategoryIDs) {
                         this.sdropdownfilter.category = [];
                         filterParams.CategoryIDs.split('|').map((id) => {
                              this.searchFilterDetails['Category']
                                   .filter((item) => item.Id == id)
                                   .map((item) => {
                                        this.sdropdownfilter.category.push(item);
                                   });
                         });
                         this.buildingSearchForm.get('category').setValue(this.sdropdownfilter.category);
                    }

                    if (filterParams.RentRange) {
                         let rrange = filterParams.RentRange.split('-');
                         let min = parseInt(rrange[0]);
                         let max = parseInt(rrange[1]);
                         this.rcard.rentRange.dtext = min + '-' + max;
                         this.buildingSearchForm.get('rentRange').get('rmin').setValue(min);
                         this.buildingSearchForm.get('rentRange').get('rmax').setValue(max);
                         this.rcard.rentRange.isApplied = true;
                    }

                    if (filterParams.AreaInSqFt) {
                         let area = filterParams.AreaInSqFt.split('-');
                         let min = parseInt(area[0]);
                         let max = parseInt(area[1]);
                         this.rcard.areaInSqFt.dtext = min + '-' + max;
                         this.buildingSearchForm.get('areaInSqFt').get('amin').setValue(min);
                         this.buildingSearchForm.get('areaInSqFt').get('amax').setValue(max);
                         this.rcard.areaInSqFt.isApplied = true;
                    }

                    if (filterParams['AreaSearchCriteria']) {
                         let dynamicFieldKey = filterParams['AreaSearchCriteria'];
                         Object.keys(this.searchedFor).forEach((key: string) => {
                              if (key == this.getFeildKeys(dynamicFieldKey)) {
                                   this.searchedFor[key]['value'] = true;
                              } else {
                                   this.searchedFor[key]['value'] = false;
                              }
                         });
                    }
               }
          }
     }

     public getFeildKeys(field: any) {
          if (field == 'Building') {
               return 'building';
          } else if (field == 'BuildingFloor') {
               return 'floor';
          } else {
               return 'unit';
          }
     }

     public executeDSetting() {
          this.dsettings = {
               singleSelection: false,
               idField: 'Id',
               textField: 'Name',
               selectAllText: 'Select All',
               unSelectAllText: 'UnSelect All',
               itemsShowLimit: 1,
               allowSearchFilter: true
          };
     }

     @HostListener('document:click', ['$event'])
     public documentClick(event: KeyboardEvent): void {
          if (this.rentRangeCardRef) {
               if (!this.rentRangeCardRef.nativeElement.contains(event.target)) {
                    this.rcard.rentRange.display = false;
               }
          }
          if (this.areaRangeCardRef) {
               if (!this.areaRangeCardRef.nativeElement.contains(event.target)) {
                    this.rcard.areaInSqFt.display = false;
               }
          }
     }

     public setAllFilterDetails() {
          if (this._storageService.getMasterData()) {
               let masterData = this._storageService.getMasterData();
               if (masterData['masters'] && masterData['masters']['BuildingTitle']) {
                    this.searchFilterDetails['BuildingTitle'] = masterData['masters']['BuildingTitle'];
               }
               if (masterData['masters'] && masterData['masters']['TypeOfSpace']) {
                    this.searchFilterDetails['TypeOfSpace'] = masterData['masters']['TypeOfSpace'];
               }
               this.searchFilterDetails['GeographyWise'] = this.geographyWise;
          }
     }

     public createBuildingSearchForm() {
          this.buildingSearchForm = new FormGroup({
               city: new FormControl(this.city),
               available: new FormControl(this.buildingAvailability),
               freeTextSearchBox: new FormControl(null),
               micromarket: new FormControl(null),
               typeOfSpace: new FormControl(null),
               category: new FormControl(null),
               rentRange: new FormGroup({
                    rmin: new FormControl('', [Validators.pattern('^[0-9]{1,4}$')]),
                    rmax: new FormControl('', [Validators.pattern('^[0-9]{1,4}$')])
               }),
               areaInSqFt: new FormGroup({
                    amin: new FormControl('', [Validators.pattern('^[0-9]{1,7}$')]),
                    amax: new FormControl('', [Validators.pattern('^[0-9]{1,7}$')])
               })
          });
          this.onChangeSearchFormValue();
          this.loadFormProperty('building-search-form');
     }

     public handleRangeCardView(slider) {
          if (slider == 'rent-range') {
               setTimeout(() => {
                    this.rcard.rentRange.display = !this.rcard.rentRange.display;
                    this.rcard.areaInSqFt.display = false;
               }, 0);
          } else {
               setTimeout(() => {
                    this.rcard.areaInSqFt.display = !this.rcard.areaInSqFt.display;
                    this.rcard.rentRange.display = false;
               }, 0);
          }
     }

     public onChangeRangeValue(slider) {
          if (slider == 'rent-range') {
               let rvalue = this.buildingSearchForm.get('rentRange').value;
               this.rcard.rentRange.value.min = rvalue.rmin ? rvalue.rmin : 0;
               this.rcard.rentRange.value.max = rvalue.rmax ? rvalue.rmax : 0;
               if (this.rcard.rentRange.value.min && this.rcard.rentRange.value.max) {
                    this.rcard.rentRange.dtext = this.rcard.rentRange.value.min + '-' + this.rcard.rentRange.value.max;
               } else {
                    this.rcard.rentRange.dtext = null;
               }
          } else {
               let avalue = this.buildingSearchForm.get('areaInSqFt').value;
               this.rcard.areaInSqFt.value.min = avalue.amin ? avalue.amin : 0;
               this.rcard.areaInSqFt.value.max = avalue.amax ? avalue.amax : 0;
               if (this.rcard.areaInSqFt.value.min && this.rcard.areaInSqFt.value.max) {
                    this.rcard.areaInSqFt.dtext = this.rcard.areaInSqFt.value.min + '-' + this.rcard.areaInSqFt.value.max;
               } else {
                    this.rcard.areaInSqFt.dtext = null;
               }
          }
     }

     public onCityChanged() {
          let fdata = this.buildingSearchForm.value;
          this.city = fdata.city;
          setTimeout(() => {
               this.buildingSearchForm.get('city').setValue(this.city);
               this._broadcastService.triggerCityChangeEvent(this.city);
          });
          this._broadcastService.triggerBuildingAvailabilityChangeEvent(Number(this.buildingAvailability));
          if (this._router.url == '/home' || this._router.url == '/') {
               this._broadcastService.triggerUpdateHomepageAnalyticsInfo({ cityId: this.city });
          }
     }

     public handleCityByBroadCast(cityId: any) {
          this.city = cityId;
          setTimeout(() => {
               this.buildingSearchForm.get('city').setValue(cityId);
          });
          this._broadcastService.triggerBuildingAvailabilityChangeEvent(Number(this.buildingAvailability));
          if (this._router.url == '/home' || this._router.url == '/') {
               this._broadcastService.triggerUpdateHomepageAnalyticsInfo({ cityId: cityId });
          }
     }

     public getSearchPayloadOnCityChanged(cityId: any) {
          return {
               MicroMarketIDs: '--',
               TypeOfSpaceIDs: '--',
               CategoryIDs: '--',
               RentRange: '',
               AreaInSqFt: '',
               CityID: cityId,
               OnlyAvailable: this.buildingAvailability,
               AreaSearchCriteria: '',
               UsePortfolioMapping: 0,
               APIKey: environment.config.keys['public-api']
          };
     }

     public resetSearchForm() {
          this.buildingSearchForm.reset();
          this.rcard.rentRange.value.min = 0;
          this.rcard.rentRange.value.max = 0;
          this.rcard.rentRange.dtext = null;
          this.rcard.areaInSqFt.value.min = 0;
          this.rcard.areaInSqFt.value.max = 0;
          this.rcard.areaInSqFt.dtext = null;
          this.buildingSearchForm.get('available').setValue(this.buildingAvailability);
     }

     public searchBuildingByFilter(searchType: string) {
          if (this.buildingSearchForm.valid) {
               let fdata = this.buildingSearchForm.value;
               let payload = null;
               this.rcard.rentRange.display = false;
               this.rcard.areaInSqFt.display = false;
               if (searchType == 'FreeTextSearch') {
                    payload = {
                         FreeText: fdata.freeTextSearchBox ? fdata.freeTextSearchBox : -1,
                         CityID: fdata.city,
                         OnlyAvailable: this.buildingAvailability,
                         APIKey: environment.config.keys['public-api']
                    };
                    this._storageService.setsearchedFilters(null);
               }

               if (searchType == 'FilterSearch') {
                    let rentRange = null;
                    let areaInSqFt = null;
                    this.setDefaultAvailibility(1);
                    if (this.rcard.rentRange.isApplied) {
                         if (fdata.rentRange.rmin && fdata.rentRange.rmax) {
                              rentRange = fdata.rentRange.rmin + '-' + fdata.rentRange.rmax;
                         } else if (fdata.rentRange.min) {
                              rentRange = fdata.rentRange.rmin + '-' + fdata.rentRange.rmin;
                         } else if (fdata.rentRange.max) {
                              rentRange = fdata.rentRange.rmax + '-' + fdata.rentRange.rmax;
                         }
                    }

                    if (this.rcard.areaInSqFt.isApplied) {
                         if (fdata.areaInSqFt.amin && fdata.areaInSqFt.amax) {
                              areaInSqFt = fdata.areaInSqFt.amin + '-' + fdata.areaInSqFt.amax;
                         } else if (fdata.areaInSqFt.min) {
                              areaInSqFt = fdata.areaInSqFt.amin + '-' + fdata.areaInSqFt.amin;
                         } else if (fdata.areaInSqFt.max) {
                              areaInSqFt = fdata.areaInSqFt.amax + '-' + fdata.areaInSqFt.amax;
                         }
                    }

                    let micromarket = '';
                    let typeofspace = '';
                    let category = '';

                    if (fdata.micromarket) {
                         fdata.micromarket.map((item, key) => {
                              key != fdata.micromarket.length - 1 ? (micromarket += item.Id + '|') : (micromarket += item.Id);
                         });
                    }

                    if (fdata.typeOfSpace) {
                         fdata.typeOfSpace.map((item, key) => {
                              key != fdata.typeOfSpace.length - 1 ? (typeofspace += item.Id + '|') : (typeofspace += item.Id);
                         });
                    }

                    if (fdata.category) {
                         fdata.category.map((item, key) => {
                              key != fdata.category.length - 1 ? (category += item.Id + '|') : (category += item.Id);
                         });
                    }

                    payload = {
                         MicroMarketIDs: micromarket ? micromarket : '--',
                         TypeOfSpaceIDs: typeofspace ? typeofspace : '--',
                         CategoryIDs: category ? category : '--',
                         RentRange: rentRange ? rentRange : '',
                         AreaInSqFt: areaInSqFt ? areaInSqFt : '',
                         CityID: fdata.city,
                         OnlyAvailable: this.buildingAvailability,
                         AreaSearchCriteria: '',
                         UsePortfolioMapping: 0,
                         APIKey: environment.config.keys['public-api']
                    };

                    Object.keys(this.searchedFor).forEach((key: string) => {
                         if (this.searchedFor[key]['value'] == true) {
                              payload['AreaSearchCriteria'] = this.searchedFor[key]['label'];
                         }
                    });
                    this._storageService.setsearchedFilters(payload);
               }
               this._broadcastService.broadcastSearchPayloadListener({ searchPayload: payload });
          } else {
               this.displayFormError(this.buildingSearchForm);
          }
     }

     public setDefaultAvailibility(value: number) {
          this.buildingAvailability = value;
          this._storageService.setBuildingAvailablity(this.buildingAvailability);
          this.buildingSearchForm.get('available').setValue(this.buildingAvailability);
     }

     public isNotNull(data) {
          return data && data != 'null' ? true : false;
     }

     public getBuildingImages(images) {
          return images.split(',');
     }

     public triggerClickEvent(event) {
          let element = $(this._elemRef.nativeElement).find('.micromarket');
     }

     public loadFormProperty(form) {
          this.formErrors = this.formModel.formErrors[form];
          this.validationMessage = this.formModel.validationMessage[form];
     }

     public logValidationError(group: FormGroup = null): void {
          Object.keys(group.controls).forEach((key: string) => {
               const abstractControl = group.get(key);
               if (abstractControl instanceof FormGroup) {
                    this.logValidationError(abstractControl);
               } else {
                    this.formErrors[key] = '';
                    if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
                         const messages = this.validationMessage[key];
                         for (const errorKey in abstractControl.errors) {
                              if (errorKey) {
                                   this.formErrors[key] += messages[errorKey] + ' ';
                              }
                         }
                    }
               }
          });
     }

     public displayFormError(group: FormGroup = null): void {
          Object.keys(group.controls).forEach((key: string) => {
               const abstractControl = group.get(key);
               if (abstractControl instanceof FormGroup) {
                    this.logValidationError(abstractControl);
               } else {
                    this.formErrors[key] = '';
                    if (abstractControl && !abstractControl.valid) {
                         const messages = this.validationMessage[key];
                         for (const errorKey in abstractControl.errors) {
                              if (errorKey) {
                                   this.formErrors[key] += messages[errorKey] + ' ';
                              }
                         }
                    }
               }
          });
     }

     public searchWithFreeText() {
          this.removeFormErrors();
          this.toggleSearchCriteria('Clean');
          this.arrangeFormFieldValue('FreeTextSearch');
          setTimeout(() => {
               this.searchBuildingByFilter('FreeTextSearch');
          }, 200);
     }

     public searchWithFilter(event: any = {}) {
          this.arrangeFormFieldValue('FilterSearch');
          setTimeout(() => {
               this.searchBuildingByFilter('FilterSearch');
          }, 200);
     }

     public clearAndSeachBuilding(fieldName: any) {
          if (fieldName == 'FreeText') {
               this.clearFieldValue('FreeText');
               this.toggleSearchCriteria('Clean');
               this.setDefaultAvailibility(0);
               this.searchWithFreeText();
          } else {
               if (fieldName == 'MicroMarket') {
                    this.clearFieldValue('MicroMarket');
               } else if (fieldName == 'TypeOfSpace') {
                    this.clearFieldValue('TypeOfSpace');
               } else if (fieldName == 'Category') {
                    this.clearFieldValue('Category');
               } else if (fieldName == 'RentRange') {
                    this.removeFormErrors();
                    this.rcard.rentRange.isApplied = false;
                    this.clearFieldValue('RentRange');
               } else if (fieldName == 'AreaSQFT') {
                    this.removeFormErrors();
                    this.rcard.areaInSqFt.isApplied = false;
                    this.clearFieldValue('AreaSQFT');
               }
               this.searchWithFilter();
          }
     }

     public findByRentAndAreaInSQFT(type: string) {
          this.arrangeFormFieldValue('FilterSearch');
          if (type == 'RentRange') {
               let rentRange = this.buildingSearchForm.get('rentRange');
               if (rentRange.valid) {
                    this.rcard.rentRange.isApplied = true;
                    let min = rentRange.get('rmin');
                    let max = rentRange.get('rmax');
                    if (min.value && max.value) {
                         this.onChangeRangeValue('rent-range');
                         this.removeFormErrors();
                         this.searchBuildingByFilter('FilterSearch');
                    }
                    $(this._elemRef.nativeElement).find('.rent-range-dropdown-menu').removeClass('show');
               } else {
                    this.rcard.rentRange.isApplied = false;
                    this.displayFormError(this.buildingSearchForm);
               }
          } else {
               let areaInSqFt = this.buildingSearchForm.get('areaInSqFt');
               if (areaInSqFt.valid) {
                    let min = areaInSqFt.get('amin');
                    let max = areaInSqFt.get('amax');
                    if (min.value && max.value) {
                         this.rcard.areaInSqFt.isApplied = true;
                         this.removeFormErrors();
                         this.onChangeRangeValue('area-sqft');
                         this.searchBuildingByFilter('FilterSearch');
                         $(this._elemRef.nativeElement).find('.area-dropdown-menu').removeClass('show');
                    } else {
                         let isSelectedAreaCategory: boolean = false;
                         Object.keys(this.searchedFor).forEach((key: string) => {
                              if (this.searchedFor[key]['value'] == true) {
                                   isSelectedAreaCategory = true;
                              }
                         });
                         if (isSelectedAreaCategory) {
                              this.reInitializeAreaValidations(min, max);
                         } else {
                              this.removeFormErrors();
                              $(this._elemRef.nativeElement).find('.area-dropdown-menu').removeClass('show');
                         }
                    }
               } else {
                    this.rcard.areaInSqFt.isApplied = false;
                    this.displayFormError(this.buildingSearchForm);
               }
          }
     }

     public reInitializeAreaValidations(min: AbstractControl, max: AbstractControl) {
          if (!min.value) {
               this.formErrors['amin'] = 'Min Area is required. ';
          } else {
               this.formErrors['amin'] = '';
          }
          if (!max.value) {
               this.formErrors['amax'] = 'Max Area is required. ';
          } else {
               this.formErrors['amax'] = '';
          }
     }

     public arrangeFormFieldValue(field: any) {
          if (field == 'FilterSearch') {
               this.clearFieldValue('FreeText');
          }
          if (field == 'FreeTextSearch') {
               this.clearFieldValue('MicroMarket');
               this.clearFieldValue('TypeOfSpace');
               this.clearFieldValue('Category');
               this.clearFieldValue('AreaSQFT');
               this.clearFieldValue('RentRange');
          }
     }

     public clearFieldValue(fieldName: any) {
          if (fieldName == 'FreeText') {
               this.buildingSearchForm.get('freeTextSearchBox').setValue('');
          } else if (fieldName == 'MicroMarket') {
               this.buildingSearchForm.get('micromarket').setValue([]);
          } else if (fieldName == 'TypeOfSpace') {
               this.buildingSearchForm.get('typeOfSpace').setValue([]);
          } else if (fieldName == 'Category') {
               this.buildingSearchForm.get('category').setValue([]);
          } else if (fieldName == 'RentRange') {
               this.rcard.rentRange.dtext = null;
               this.rcard.rentRange.value.min = 0;
               this.rcard.rentRange.value.max = 0;
               this.buildingSearchForm.get('rentRange').get('rmin').setValue('');
               this.buildingSearchForm.get('rentRange').get('rmax').setValue('');
          } else {
               this.rcard.areaInSqFt.dtext = null;
               this.rcard.areaInSqFt.value.min = 0;
               this.rcard.areaInSqFt.value.max = 0;
               Object.keys(this.searchedFor).forEach((key: string) => {
                    this.searchedFor[key]['value'] = false;
               });
               this.buildingSearchForm.get('areaInSqFt').get('amin').setValue('');
               this.buildingSearchForm.get('areaInSqFt').get('amax').setValue('');
          }
     }

     public onChangeSearchFormValue() {
          this.buildingSearchForm.get('freeTextSearchBox').valueChanges.subscribe((x) => {
               if (x && x.length > 0) {
                    this.clearIconFlags.isValidFreeText = true;
               } else {
                    this.clearIconFlags.isValidFreeText = false;
               }
          });
          this.buildingSearchForm.get('micromarket').valueChanges.subscribe((x) => {
               if (x && x.length > 0) {
                    this.clearIconFlags.isValidMicroMarket = true;
               } else {
                    this.clearIconFlags.isValidMicroMarket = false;
               }
          });
          this.buildingSearchForm.get('typeOfSpace').valueChanges.subscribe((x) => {
               if (x && x.length > 0) {
                    this.clearIconFlags.isValidTypeOfSpace = true;
               } else {
                    this.clearIconFlags.isValidTypeOfSpace = false;
               }
          });
          this.buildingSearchForm.get('category').valueChanges.subscribe((x) => {
               if (x && x.length > 0) {
                    this.clearIconFlags.isValidCategory = true;
               } else {
                    this.clearIconFlags.isValidCategory = false;
               }
          });
     }

     public getDisplayOfAdvanceFilter() {
          if (this.isMobileView) {
               return true;
          } else {
               if (this.isUserLoggedIn) {
                    if (this.isHomeUrl) {
                         return true;
                    }
                    return false;
               }
               return false;
          }
     }

     public removeFormErrors() {}

     public togglePropertyView() {
          if (this.currentPropertyView == 'GRID') {
               this.currentPropertyView = 'MAP';
               this._broadcastService.triggerTogglePropertyView({});
          } else {
               this.currentPropertyView = 'GRID';
               this._broadcastService.triggerTogglePropertyView({});
          }
     }

     public navigateToNextScreen(path) {
          this._router.navigateByUrl(path);
     }

     public toggleSearchCriteria(category: any) {
          Object.keys(this.searchedFor).forEach((key: string) => {
               if (key == category) {
                    if (this.searchedFor[key]['value'] == true) {
                         this.searchedFor[key]['value'] = false;
                    } else {
                         this.searchedFor[key]['value'] = true;
                    }
               } else {
                    this.searchedFor[key]['value'] = false;
               }
          });
     }

     public onChangeBuildingAvailability(value: any) {
          let tempCity = this.buildingSearchForm.value.city;
          this.city = tempCity;
          this.resetSearchForm();
          this.buildingAvailability = Number(value);
          setTimeout(() => {
               this.toggleSearchCriteria('Clean');
               this.buildingSearchForm.get('city').setValue(tempCity);
               this.buildingSearchForm.get('available').setValue(this.buildingAvailability);
          });
          this._storageService.setsearchedFilters(null);
          this._storageService.setBuildingAvailablity(Number(this.buildingAvailability));
          this._broadcastService.triggerBuildingAvailabilityChangeEvent(Number(this.buildingAvailability));
     }

     public getMoveInDateTime(dateTime: any) {
          this.selectedMoveInDateTime = moment(dateTime.value).format('YYYY-MM-DD');
     }
}
