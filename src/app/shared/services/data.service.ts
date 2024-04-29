import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
     providedIn: 'root'
})
export class DataService extends BaseService {
     public headers: HttpHeaders;

     // prettier-ignore
     constructor(
          protected _http: HttpClient
     ) {
          super();
     }

     public broadcastMessage(payload) {
          let url = this.apiUrl + 'demo';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public login(payload: any) {
          let url = environment.config.api.url + 'login';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getSearchFilters() {
          let url = this.apiUrl + 'getbuildingsearchfilters';
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingList(data: any) {
          let url = this.apiUrl + 'call?Proc=GetBuildingList';
          return this._http.post(url, data).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public searchBuildingByFilter(data: any) {
          let url = this.apiUrl + 'call?Proc=SearchBuildingByFilters';
          return this._http.post(url, data).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public searchBuildingByFilterText(data: any) {
          let url = this.apiUrl + 'call?Proc=SearchBuildingByFreeText';
          return this._http.post(url, data).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingDetails(data: any) {
          let url = this.apiUrl + 'call?Proc=GetBuildingDetails';
          return this._http.post(url, data).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingDetailVisitHistory(data: any) {
          let url = this.apiUrl + 'call?Proc=GetBuildingDetailVisitHistory';
          return this._http.post(url, data).pipe(map(this.handleMap), catchError(this.handleError));
     }
}
