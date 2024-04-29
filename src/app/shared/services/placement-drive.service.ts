import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
     providedIn: 'root'
})
export class PlacementDriveService extends BaseService {
     public headers: HttpHeaders;

     // prettier-ignore
     constructor(
          protected _http: HttpClient,
     ) {
          super();
     }

     public getAllStudents() {
          let url = this.placementDriveURL + '/users';
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }
}
