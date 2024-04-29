import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { map, catchError, timeout } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
     providedIn: 'root'
})
export class OpportunityService extends BaseService {
     public headers: HttpHeaders;

     // prettier-ignore
     constructor(
        private _http: HttpClient, 
        private _storageService: StorageService
        ) {
          super();
     }

     public createOpportunity(payload: any) {
          let url = environment.config.api.devOnBoardURL + 'opportunities';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getOpportunities() {
          let url = environment.config.api.devOnBoardURL + 'opportunities';
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getOpportunityById(id: any) {
          let url = environment.config.api.devOnBoardURL + 'opportunities/' + id;
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateOpportunityById(payload: any, id: any) {
          let url = environment.config.api.devOnBoardURL + 'opportunities/' + id;
          return this._http.put(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public deleteOpportunityById(id: any) {
          let url = environment.config.api.devOnBoardURL + 'opportunities/' + id;
          return this._http.delete(url).pipe(map(this.handleMap), catchError(this.handleError));
     }
}
