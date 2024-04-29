import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../public/login/login.component';
import { StorageService } from '../../../shared/services/storage.service';
import { BroadcastService } from '../../../shared/services/broadcast.service';

@Component({
     selector: 'app-home',
     templateUrl: './home.component.html',
     styleUrls: ['./home.component.scss']
})
export class HomeComponent {
     public isUserLoggedIn: boolean = false;

     //prettier-ignore
     constructor(
          private _storageService: StorageService, 
          private _broadcastService: BroadcastService, 
          private _dialog: MatDialog
     ) {}

     ngOnInit() {
          this.isUserLoggedIn = this._storageService.isUserLoggedIn();
          this._broadcastService.login$.subscribe((message) => {
               if (message == 'ULOGGEDIN' || message == 'ULOGGEDOUT') {
                    this.isUserLoggedIn = this._storageService.isUserLoggedIn();
               }
          });
     }

     public openLoginDialog() {
          this._dialog.open(LoginComponent, { panelClass: 'login-dialog-panel', disableClose: true });
     }
}
