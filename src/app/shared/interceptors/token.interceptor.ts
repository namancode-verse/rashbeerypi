import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { BroadcastService } from '../services/broadcast.service';
import { throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
     // prettier-ignore
     constructor(
          private _storageService: StorageService,
          private _router: Router,
          // private _toastr: ToastrService,
          private _broadcastService: BroadcastService
     ) {
     }

     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          req = req.clone({
               setHeaders: {
                    Authorization: this._storageService.getUserToken() !== null ? 'Bearer ' + this._storageService.getUserToken() : ''
               }
          });
          return next.handle(req).pipe(
               catchError((error) => {
                    if (error instanceof HttpErrorResponse) {
                    }
                    return throwError(() => {
                         return error;
                    });
               })
          );
     }
}
