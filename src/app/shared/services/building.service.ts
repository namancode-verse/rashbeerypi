import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
     providedIn: 'root'
})
export class BuildingService extends BaseService {
     public headers: HttpHeaders;

     // prettier-ignore
     constructor(
          protected _http: HttpClient,
     ) {
          super();
     }

     public login(payload: any) {
          let url = this.devCoreURL + '/user/login';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getAllBuildingResponse(userName: any = '', pageOffset: any, pageSize: any, searchQuery: any) {
          let url = this.devCoreURL + '/responses?pageOffset=' + pageOffset + '&pageSize=' + pageSize + searchQuery;
          if (userName != '') {
               url = url + '&surveyorId=' + userName;
          }
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingResponseByResponseId(resId: any) {
          let url = this.devCoreURL + '/responses/' + resId + '?diff=true';
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public uploadBuildingFile(payload: any) {
          let url = this.devCoreURL + '/responses/bulk/buildings';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public uploadBuildingFloorsFile(payload: any) {
          let url = this.devCoreURL + '/responses/bulk/buildings/withfloors';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public uploadBuildingFloorUnitsFile(payload: any) {
          let url = this.devCoreURL + '/responses/bulk/buildings/withfloornunits';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public uploadFloorUnitsFile(payload: any, buildingIdentifier: any) {
          let url = this.devCoreURL + '/responses/bulk/buildings/' + buildingIdentifier + '/floorunits';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public uploadFloorFile(payload: any, buildingIdentifier: any) {
          let url = this.devCoreURL + '/responses/bulk/buildings/' + buildingIdentifier + '/floors';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public uploadFloorUnitFile(payload: any, buildingIdentifier: any, floorIdentifier: any) {
          let url = this.devCoreURL + '/responses/bulk/buildings/' + buildingIdentifier + '/floors/' + floorIdentifier + '/units';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public uploadBuildingFiles(payload: any, endPoint: any) {
          let url = this.devCoreURL + endPoint;
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createLeaseDetails(payload: any) {
          let url = this.devCoreURL + '/responses/buildings/lease-upload';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateLeaseDetails(payload: any) {
          let url = this.devCoreURL + '/responses/buildings/lease-upload';
          return this._http.put(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public removeBuildingImages(payload: any) {
          let url = this.devCoreURL + '/responses/buildings/remove-files';
          return this._http.delete(url, { headers: { 'Content-Type': 'application/json' }, body: payload }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public removeSurveyImages(payload: any) {
          let url = this.devCoreURL + '/surveys/buildings/remove-files';
          return this._http.delete(url, { headers: { 'Content-Type': 'application/json' }, body: payload }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public verifyBuildingResponse(payload: any, responseId: any) {
          let url = this.devCoreURL + '/responses/' + responseId + '/verify';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateBuildingResponse(payload: any, responseId: any) {
          let url = this.devCoreURL + '/responses/' + responseId + '/building';
          return this._http.put(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateBuildingSurvey(payload: any, surveyId: any) {
          let url = this.devCoreURL + '/surveys/' + surveyId + '/building';
          return this._http.put(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createBuildingFloor(payload: any, responseId: any) {
          let url = this.devCoreURL + '/responses/' + responseId + '/floors';
          return this._http.post(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createSurveyFloor(payload: any, surveyId: any) {
          let url = this.devCoreURL + '/surveys/' + surveyId + '/floors';
          return this._http.post(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateBuildingFloor(payload: any, responseId: any) {
          let url = this.devCoreURL + '/responses/' + responseId + '/floors';
          return this._http.put(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateSurveyFloor(payload: any, surveyId: any) {
          let url = this.devCoreURL + '/surveys/' + surveyId + '/floors';
          return this._http.put(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createBuildingFloorUnit(payload: any, responseId: any) {
          let url = this.devCoreURL + '/responses/' + responseId + '/units';
          return this._http.post(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createSurveyFloorUnit(payload: any, surveyId: any) {
          let url = this.devCoreURL + '/surveys/' + surveyId + '/units';
          return this._http.post(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateBuildingFloorUnit(payload: any, responseId: any) {
          let url = this.devCoreURL + '/responses/' + responseId + '/units';
          return this._http.put(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateSurveyFloorUnit(payload: any, surveyId: any) {
          let url = this.devCoreURL + '/surveys/' + surveyId + '/units';
          return this._http.put(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getApprovedBuildingResponse(userName: any = '', pageOffset: any, pageSize: any, searchQuery: any) {
          let url = this.devCoreURL + '/buildings?pageOffset=' + pageOffset + '&pageSize=' + pageSize + searchQuery;
          if (userName != '') {
               url = url + '&surveyorId=' + userName;
          }
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getScheduleSurveys(searchQuery: any) {
          let url = this.devCoreURL + '/surveys' + searchQuery;
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingByBuildingId(buildingIdentifier: any) {
          let url = this.devCoreURL + '/buildings/' + buildingIdentifier;
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getBuildingSurveyBySurveyId(surveyId: any) {
          let url = this.devCoreURL + '/surveys/' + surveyId;
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getAllUsers() {
          let url = this.devCoreURL + '/users';
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createSurvey(payload: any) {
          let url = this.devCoreURL + '/surveys';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createBuildingResponse(payload: any) {
          let url = this.devCoreURL + '/responses';
          return this._http.post(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateSurveyStatus(payload: any, surveyId: any) {
          let url = this.devCoreURL + '/surveys/' + surveyId;
          return this._http.patch(url, payload, { headers: { 'Content-Type': 'application/json' } }).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public submitBuildingSurveyBySurveyId(surveyId: any) {
          let url = this.devCoreURL + '/surveys/' + surveyId + '/submit';
          return this._http.post(url, {}).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public removeBuildingFloor(responseId: any, floorIdentifier: any) {
          let url = this.devCoreURL + '/responses/' + responseId + '/floors/' + floorIdentifier;
          return this._http.delete(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public removeBuildingFloorUnit(responseId: any, floorIdentifier: any, unitIdentifier: any) {
          let url = this.devCoreURL + '/responses/' + responseId + '/floors/' + floorIdentifier + '/units/' + unitIdentifier;
          return this._http.delete(url).pipe(map(this.handleMap), catchError(this.handleError));
     }
}
