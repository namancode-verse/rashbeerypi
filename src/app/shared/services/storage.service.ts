import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
     providedIn: 'root'
})
export class StorageService {
     private seckey: string = 'Abh!$hekPand!T@Akpand!tD3v^2022';
     private ukey: string = 'user';

     constructor() {}

     public setUserInfo(user: any) {
          user['isUserLoggedIn'] = 1;
          this.setUserToken(user['token']);
          this.set(this.ukey, JSON.stringify(user));
     }

     public getUserInfo() {
          if (this.get(this.ukey)) {
               let user = JSON.parse(this.get(this.ukey));
               return user;
          } else {
               return null;
          }
     }

     public updateUserInfo(user) {
          this.set(this.ukey, JSON.stringify(user));
     }

     public isUserLoggedIn() {
          let user = this.getUserInfo();
          if (user && parseInt(user.isUserLoggedIn)) {
               return true;
          }
          return false;
     }

     public setUserToken(token: any) {
          localStorage.setItem('token', token);
     }

     public getUserToken() {
          return localStorage.getItem('token');
     }

     public setActiveChatRef(data) {
          let user = JSON.parse(this.get(this.ukey));
          user['active-chat'] = data;
          this.updateUserInfo(user);
     }

     public getActiveChatRef() {
          let user = JSON.parse(this.get(this.ukey));
          if (user && user['active-chat']) {
               return user['active-chat'];
          }
          return null;
     }

     public setUserCity(city) {
          this.set('user-city', JSON.stringify(city));
     }

     public getUserCity() {
          if (this.get('user-city')) {
               return JSON.parse(this.get('user-city'));
          }
     }

     public setPricingAndPlansInfo(plan) {
          this.set('pricingandplans', JSON.stringify(plan), 'session');
     }

     public getPricingAndPlansInfo() {
          if (this.get('pricingandplans', 'session')) {
               return JSON.parse(this.get('pricingandplans', 'session'));
          }
          return null;
     }

     public setBuildingAvailablity(data) {
          this.set('buildingAvailablity', JSON.stringify(data));
     }

     public getBuildingAvailablity() {
          if (this.get('buildingAvailablity')) {
               return JSON.parse(this.get('buildingAvailablity'));
          }
          return null;
     }

     public setBuildingFilterInfo(data: any) {
          this.set('filters', JSON.stringify(data));
     }

     public getBuildingFilterInfo() {
          if (this.get('filters')) {
               let filters = JSON.parse(this.get('filters'));
               return filters;
          } else {
               return null;
          }
     }

     public setsearchedFilters(data: any) {
          this.set('searchedFilters', JSON.stringify(data));
     }

     public getsearchedFilters() {
          if (this.get('searchedFilters')) {
               let searchedFilters = JSON.parse(this.get('searchedFilters'));
               return searchedFilters;
          } else {
               return null;
          }
     }

     public setClickedUrlContext(data: any) {
          this.set('curl', JSON.stringify(data));
     }

     public getClickedUrlContext() {
          if (this.get('curl')) {
               return JSON.parse(this.get('curl'));
          } else {
               return null;
          }
     }

     public clearSelectedUnits() {
          localStorage.removeItem('sunits');
     }

     public setSharedSmartLinkInfo(data) {
          this.set('ssld', JSON.stringify(data), 'session');
     }

     public getSharedSmartLinkInfo() {
          if (this.get('ssld', 'session')) {
               return JSON.parse(this.get('ssld', 'session'));
          }
          return null;
     }

     public setSelectedUnits(data) {
          this.set('sunits', JSON.stringify(data));
     }

     public setMasterData(user: any) {
          this.set('constant-fields', JSON.stringify(user));
     }

     public getMasterData() {
          if (this.get('constant-fields')) {
               let payload = JSON.parse(this.get('constant-fields'));
               return payload;
          } else {
               return null;
          }
     }

     public setBuildingIdentificationForUpdate(data: any) {
          this.set('building-identification', JSON.stringify(data));
     }

     public getBuildingIdentificationForUpdate() {
          if (this.get('building-identification')) {
               return JSON.parse(this.get('building-identification'));
          }
          return null;
     }

     public setInventoryBuildingsInformation(data: any) {
          this.set('inven-building-list', JSON.stringify(data));
     }

     public getInventoryBuildingsInformation() {
          if (this.get('inven-building-list')) {
               let payload = JSON.parse(this.get('inven-building-list'));
               return payload;
          } else {
               return null;
          }
     }

     public setInventoryFloorIdForUpdate(data: any) {
          this.set('inven-floor-id', JSON.stringify(data));
     }

     public getInventoryFloorIdForUpdate() {
          if (this.get('inven-floor-id')) {
               return JSON.parse(this.get('inven-floor-id'));
          }
          return null;
     }

     public setInventoryFloorInformation(data: any) {
          this.set('inven-floor-list', JSON.stringify(data));
     }

     public getInventoryFloorInformation() {
          if (this.get('inven-floor-list')) {
               let payload = JSON.parse(this.get('inven-floor-list'));
               return payload;
          } else {
               return null;
          }
     }

     public setInventoryUnitIdForUpdate(data: any) {
          this.set('inven-unit-id', JSON.stringify(data));
     }

     public getInventoryUnitIdForUpdate() {
          if (this.get('inven-unit-id')) {
               return JSON.parse(this.get('inven-unit-id'));
          }
          return null;
     }

     public setInventoryUnitInformation(data: any) {
          this.set('inven-unit-list', JSON.stringify(data));
     }

     public getInventoryUnitInformation() {
          if (this.get('inven-unit-list')) {
               let payload = JSON.parse(this.get('inven-unit-list'));
               return payload;
          } else {
               return null;
          }
     }

     public setInventoryBuildingLeaseIdForUpdate(data: any) {
          this.set('inven-building-lease-id', JSON.stringify(data));
     }

     public getInventoryBuildingLeaseIdForUpdate() {
          if (this.get('inven-building-lease-id')) {
               return JSON.parse(this.get('inven-building-lease-id'));
          }
          return null;
     }

     public setInventoryBuildingLeaseInformation(data: any) {
          this.set('inven-building-lease-list', JSON.stringify(data));
     }

     public getInventoryBuildingLeaseInformation() {
          if (this.get('inven-building-lease-list')) {
               let payload = JSON.parse(this.get('inven-building-lease-list'));
               return payload;
          } else {
               return null;
          }
     }

     private set(key: string, value: any, storage = null): boolean {
          if (storage) {
               if (sessionStorage.getItem(key)) {
                    sessionStorage.removeItem(key);
                    sessionStorage.setItem(key, this.encrypt(value));
               } else {
                    sessionStorage.setItem(key, this.encrypt(value));
               }
               return true;
          } else {
               if (localStorage.getItem(key)) {
                    localStorage.removeItem(key);
                    localStorage.setItem(key, this.encrypt(value));
               } else {
                    localStorage.setItem(key, this.encrypt(value));
               }
               return true;
          }
     }

     private get(key: string, storage = null): string {
          if (storage) {
               if (sessionStorage.getItem(key)) {
                    return this.decrypt(sessionStorage.getItem(key));
               } else {
                    return '';
               }
          } else {
               if (localStorage.getItem(key)) {
                    return this.decrypt(localStorage.getItem(key));
               } else {
                    return '';
               }
          }
     }

     private encrypt(value: string): string {
          return CryptoJS.AES.encrypt(value, this.seckey.trim()).toString();
     }

     private decrypt(text: string) {
          return CryptoJS.AES.decrypt(text, this.seckey.trim()).toString(CryptoJS.enc.Utf8);
     }

     public encryptId(value: string): string {
          return CryptoJS.AES.encrypt(value, this.seckey.trim()).toString();
     }

     public decryptId(text: string) {
          return CryptoJS.AES.decrypt(text, this.seckey.trim()).toString(CryptoJS.enc.Utf8);
     }

     public clearAll() {
          localStorage.clear();
          sessionStorage.clear();
     }
}
