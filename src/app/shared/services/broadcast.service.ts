import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class BroadcastService {
     public userLoggedInSource: Subject<any> = new Subject<any>();
     public login$ = this.userLoggedInSource.asObservable();

     public broadcastUserLoggedIn(message: string) {
          this.userLoggedInSource.next(message);
     }

     public onLeaseCityChangeSource: Subject<any> = new Subject<any>();
     public onLeaseCityChange$ = this.onLeaseCityChangeSource.asObservable();

     public triggerOnLeaseCityChange(data: any) {
          this.onLeaseCityChangeSource.next(data);
     }

     public retainSearchParamsSource: Subject<any> = new Subject<any>();
     public retainSearchParams$ = this.retainSearchParamsSource.asObservable();

     public triggerRetainSearchParams(data: any) {
          this.retainSearchParamsSource.next(data);
     }

     public onChangeCitySource: Subject<any> = new Subject<any>();
     public onChangeCity$ = this.onChangeCitySource.asObservable();

     public triggerCityChangeEvent(data: any) {
          this.onChangeCitySource.next(data);
     }

     public onChangeBuildingAvailabilitySource: Subject<any> = new Subject<any>();
     public onChangeBuildingAvailability$ = this.onChangeBuildingAvailabilitySource.asObservable();

     public triggerBuildingAvailabilityChangeEvent(data: any) {
          this.onChangeBuildingAvailabilitySource.next(data);
     }

     public updateHomepageAnalyticsInfoSource: Subject<any> = new Subject<any>();
     public updateHomepageAnalyticsInfo$ = this.updateHomepageAnalyticsInfoSource.asObservable();

     public triggerUpdateHomepageAnalyticsInfo(data: any) {
          this.updateHomepageAnalyticsInfoSource.next(data);
     }

     public searchPayloadListener: Subject<any> = new Subject<any>();
     public searchPayloadListenerEvent$ = this.searchPayloadListener.asObservable();

     public broadcastSearchPayloadListener(data: any) {
          this.searchPayloadListener.next(data);
     }

     public togglePropertyViewSource: Subject<any> = new Subject<any>();
     public togglePropertyView$ = this.togglePropertyViewSource.asObservable();

     public triggerTogglePropertyView(data: any) {
          this.togglePropertyViewSource.next(data);
     }

     public loginSignupAction: Subject<any> = new Subject<any>();
     public loginSignupEvent$ = this.loginSignupAction.asObservable();

     public broadcastLoginSignupEvent(type: string) {
          this.loginSignupAction.next(type);
     }

     public sideMenuSource: Subject<any> = new Subject<any>();
     public sideMenuActive$ = this.sideMenuSource.asObservable();

     public broadcastSideMenuSource(url: any) {
          this.sideMenuSource.next(url);
     }

     public buildingFloorsSource: Subject<any> = new Subject<any>();
     public buildingFloorsEvent$ = this.buildingFloorsSource.asObservable();

     public triggerBuildingFloorsSubscription(url: any) {
          this.buildingFloorsSource.next(url);
     }

     public buildingUnitsSource: Subject<any> = new Subject<any>();
     public buildingUnitsEvent$ = this.buildingUnitsSource.asObservable();

     public triggerBuildingUnitsSubscription(url: any) {
          this.buildingUnitsSource.next(url);
     }

     public buildingLeasesSource: Subject<any> = new Subject<any>();
     public buildingLeasesEvent$ = this.buildingLeasesSource.asObservable();

     public triggerBuildingLeasesSubscription(url: any) {
          this.buildingLeasesSource.next(url);
     }
}
