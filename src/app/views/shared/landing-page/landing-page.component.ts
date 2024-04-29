import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/services/storage.service';
import { BroadcastService } from '../../../shared/services/broadcast.service';

@Component({
     selector: 'app-landing-page',
     templateUrl: './landing-page.component.html',
     styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

     public isUserLoggedIn: boolean = false;

     constructor(
          private _storageService: StorageService,
          private _broadcastService: BroadcastService,
          private _router: Router
     ) {

     }

     ngOnInit(): void {
          this.isUserLoggedIn = this._storageService.isUserLoggedIn();
          this._broadcastService.login$.subscribe((message) => {
               if (message == 'ULOGGEDIN' || message == 'ULOGGEDOUT') {
                    this.isUserLoggedIn = this._storageService.isUserLoggedIn();
               }
          });
          if (this.isUserLoggedIn) {
               this._router.navigate(['dashboard']);
          }
     }
}
