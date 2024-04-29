import { Component } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { BroadcastService } from '../shared/services/broadcast.service';
import { LayoutModel } from '../shared/models/layout.model';

@Component({
     selector: 'app-layout',
     templateUrl: './layout.component.html',
     styleUrl: './layout.component.scss'
})
export class LayoutComponent {
     public isUserLoggedIn: boolean = false;
     public layout: LayoutModel;

     // prettier-ignore
     constructor(
		private _storageService: StorageService,
		private _broadcastService: BroadcastService
	) {}

     ngOnInit() {
          this.isUserLoggedIn = this._storageService.isUserLoggedIn();
          this._broadcastService.login$.subscribe((message) => {
               if (message == 'ULOGGEDIN' || message == 'ULOGGEDOUT') {
                    this.isUserLoggedIn = this._storageService.isUserLoggedIn();
               }
          });
     }
}
