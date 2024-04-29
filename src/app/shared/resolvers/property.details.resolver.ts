import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { config, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';
import { SmartListService } from '../services/smart-list.service';
import { PayloadHelper } from '../helpers/payload-helper';
import { environment } from '../../../environments/environment';

export class ResolvedRouteData {
     // prettier-ignore
     constructor(
          public buildingDetails: any,
          public recentVisitHistory: any = null,
          public error: any = null
          ) {}
}

@Injectable()
export class PropertyDetailsResolver implements Resolve<ResolvedRouteData> {
     public sharedSmartLinkInfo: any;
     public payloadHelper: PayloadHelper;

     // prettier-ignore
     constructor(
          private _dataService: DataService,
          private _smartListService: SmartListService,
          private _storageService: StorageService
         ){
          this.payloadHelper = new PayloadHelper();
          }

     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedRouteData> {
          this.sharedSmartLinkInfo = this._storageService.getSharedSmartLinkInfo();
          let httpResponse = null;
          if (this.sharedSmartLinkInfo) {
               let payload = {
                    BuildingUnitListID: this.sharedSmartLinkInfo.smartListId,
                    AccessPassword: this.sharedSmartLinkInfo.AccessPassword,
                    APIKey: environment.config.keys['public-api']
               };
               httpResponse = this._smartListService.getUserBuildingUnitListDetailsByPassword(payload);
               return httpResponse.pipe(
                    map((reponse) => new ResolvedRouteData(reponse)),
                    catchError((err: any) => of(new ResolvedRouteData(null, err)))
               );
          } else {
               let cityId = this._storageService.getUserCity();
               let fltInfo = this._storageService.getsearchedFilters();
               let payload = this.payloadHelper.getPropertyDetailsSearchPayload(fltInfo, route.params.id, cityId);
               httpResponse = forkJoin([this._dataService.getBuildingDetails(payload), this._dataService.getBuildingDetailVisitHistory(payload)]);
               return httpResponse.pipe(
                    map((reponse) => {
                         return new ResolvedRouteData(reponse[0], reponse[1]);
                    }),
                    catchError((err: any) => of(new ResolvedRouteData(null, err)))
               );
          }
     }
}
