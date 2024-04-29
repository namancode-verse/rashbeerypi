import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { map, catchError, timeout } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
     providedIn: 'root'
})
export class BuildingResponseService extends BaseService {
     public headers: HttpHeaders;

     // prettier-ignore
     constructor(
        private _http: HttpClient, 
        private _storageService: StorageService
        ) {
          super();
     }

     public createBuildingResponse(payload: any) {
          let url = environment.config.api.devCoreURL + 'building';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingResponses() {
          let url = environment.config.api.devCoreURL + 'building';
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingResponseById(id: any) {
          let url = environment.config.api.devCoreURL + 'building/' + id;
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateBuildingResponseById(payload: any, id: any) {
          let url = environment.config.api.devCoreURL + 'building/' + id;
          return this._http.put(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public deleteBuildingResponseById(id: any) {
          let url = environment.config.api.devCoreURL + 'building/' + id;
          return this._http.delete(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createBuildingFloor(payload: any) {
          let url = environment.config.api.devCoreURL + 'floor';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingFloors() {
          let url = environment.config.api.devCoreURL + 'floor';
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingFloorById(id: any) {
          let url = environment.config.api.devCoreURL + 'floor/' + id;
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateBuildingFloorById(payload: any, id: any) {
          let url = environment.config.api.devCoreURL + 'floor/' + id;
          return this._http.put(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public deleteBuildingFloorById(id: any) {
          let url = environment.config.api.devCoreURL + 'floor/' + id;
          return this._http.delete(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createBuildingUnit(payload: any) {
          let url = environment.config.api.devCoreURL + 'unit';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingUnits() {
          let url = environment.config.api.devCoreURL + 'unit';
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingUnitById(id: any) {
          let url = environment.config.api.devCoreURL + 'unit/' + id;
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateBuildingUnitById(payload: any, id: any) {
          let url = environment.config.api.devCoreURL + 'unit/' + id;
          return this._http.put(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public deleteBuildingUnitById(id: any) {
          let url = environment.config.api.devCoreURL + 'unit/' + id;
          return this._http.delete(url).pipe(map(this.handleMap), catchError(this.handleError));
     }
}
