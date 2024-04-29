import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { map, catchError, timeout } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
     providedIn: 'root'
})
export class SignupLoginService extends BaseService {
     public headers: HttpHeaders;

     constructor(protected _http: HttpClient, private _storageService: StorageService) {
          super();
     }

     public loginToAdminUsers(payload: any) {
          let url = 'https://admin-stage-api.repositree.io/user/login';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public sendSignupPhoneAndEmailOTP(payload: any) {
          let url = environment.config.api.url + 'onboarding/send-otp';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public resendSignupPhoneAndEmailOTP(payload: any) {
          let url = environment.config.api.url + 'onboarding/resend-otp';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public registerUser(payload: any) {
          let url = environment.config.api.url + 'onboarding/register';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createPlanOrder(payload: any) {
          let url = environment.config.api.url + 'orders';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public updateRazorpayResponse(payload: any, orderId) {
          let url = environment.config.api.url + 'orders' + '/' + orderId;
          return this._http.patch(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public loginUser(payload: any) {
          let url = environment.config.api.url + 'login';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getUserInfo(userId) {
          let url = environment.config.api.url + 'users/profile' + '/' + userId;
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public sendForgotPasswordEmailOTP(payload: any) {
          let url = environment.config.api.url + 'forgot-password/send-otp';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public resendForgotPasswordEmailOTP(payload: any) {
          let url = environment.config.api.url + 'forgot-password/resend-otp';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public resetPassword(payload: any) {
          let url = environment.config.api.url + 'forgot-password/reset-password';
          return this._http.post(url, payload).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public sendContactEmail(data) {
          let url = environment.config.api.url + 'contact-us';
          return this._http.post(url, data).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getPublicMasterData() {
          let url = environment.config.api.url + '/public/master-data?query=States,ProductTypes';
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public getSubscriptionUsers(tenantId: any) {
          let url = environment.config.api.url + 'tenants/' + tenantId + '/users-list';
          return this._http.get(url).pipe(map(this.handleMap), catchError(this.handleError));
     }

     public createNewSubscriptionUser(data: any, tenantId: any) {
          let url = environment.config.api.url + 'tenants/' + tenantId + '/users';
          return this._http.post(url, data).pipe(map(this.handleMap), catchError(this.handleError));
     }
}
