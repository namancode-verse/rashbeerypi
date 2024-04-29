import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

export class ResolvedLayotuDetails {
     constructor(
          public searchFilterAPIResponse : any,
          public geoLocationData: any,
          public error: any = null,
     ) {

     }
}

@Injectable()
export class LayoutResolver implements Resolve<ResolvedLayotuDetails> {

     constructor(
          private _dataService: DataService,
          private _userService : UserService
     ) {

     }

     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedLayotuDetails> {
          let httpResponse = null;
          if(environment.config.load.geolocation) {
               httpResponse = forkJoin([
                    this._dataService.getSearchFilters(),
                    this._userService.getUserGeoLocationFromIP()
               ]);
          } else {
               httpResponse = forkJoin([
                    this._dataService.getSearchFilters()
               ]);
          }
          
          return httpResponse.pipe(
               map((reponse) => new ResolvedLayotuDetails(reponse[0], reponse[1])),
               catchError((err: any) => of(new ResolvedLayotuDetails(null, err)))
          );
     }
}
