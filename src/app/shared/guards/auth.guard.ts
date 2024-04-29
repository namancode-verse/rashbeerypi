import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
     providedIn: 'root'
})
export class AuthGuard implements CanActivate {

     constructor(
          private _router: Router,
          private _storageService: StorageService
     ) {

     }

     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          if (!this._storageService.isUserLoggedIn()) {
               return true;
          }
          return false;
     }


     canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          if (this._storageService.isUserLoggedIn()) {
               return true;
          }
          return false;
     }
}
