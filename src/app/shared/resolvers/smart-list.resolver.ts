import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { DateHelper } from '../helpers/date-helper';
import { SmartListService } from '../services/smart-list.service';
import { environment } from '../../../environments/environment';

export class ResolvedSmartListDetails {
     constructor(public smartListData: any, public error: any = null) {}
}

@Injectable()
export class SmartListResolver implements Resolve<ResolvedSmartListDetails> {
     public sharedSmartLinkInfo: any;
     public from: Date = new Date();
     public to: Date = new Date();
     public dateHelper: DateHelper;

     // prettier-ignore
     constructor(
          private _smartListService: SmartListService,
          private _storageService: StorageService
     ) {
          this.dateHelper = new DateHelper();
          this.from = this.dateHelper.getFromDate(3);
          this.to = this.dateHelper.getToDate();
     }

     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedSmartListDetails> {
          this.sharedSmartLinkInfo = this._storageService.getSharedSmartLinkInfo();
          let httpResponse = null;
          if (this.sharedSmartLinkInfo) {
               if (this.sharedSmartLinkInfo.accessByRole && this.sharedSmartLinkInfo.accessByRole == 'Client') {
                    let payload = {
                         BuildingUnitListID: this.sharedSmartLinkInfo.smartListId,
                         AccessPassword: this.sharedSmartLinkInfo.AccessPassword,
                         APIKey: environment.config.keys['public-api']
                    };
                    httpResponse = this._smartListService.getUserBuildingUnitListDetailsByPassword(payload);
               }
          }
          return httpResponse.pipe(
               map((reponse) => new ResolvedSmartListDetails(reponse)),
               catchError((err: any) => of(new ResolvedSmartListDetails(null, err)))
          );
     }
}
