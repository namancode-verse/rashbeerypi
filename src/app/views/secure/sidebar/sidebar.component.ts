import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BroadcastService } from '../../../shared/services/broadcast.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Iuser } from '../../../shared/models/user.model';
import $ from 'jquery';

@Component({
     selector: 'app-sidebar',
     templateUrl: './sidebar.component.html',
     styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
     public user: Iuser;
     public isToggled: boolean = false;
     public isMobileView: boolean = false;
     public copyRightText: any;
     public cityChangeSubs: any;
     public isUserLoggedIn: boolean = false;
     public currentURL: any = '';
     public isOpendPanel: boolean = false;
     public menus = [
          {
               name: 'Dashboard',
               alias: 'dashboard',
               url: '/dashboard',
               active: true,
               icon: 'dashboard.svg',
               category: null,
               subcategory: null,
               display: true
          },
          {
               name: 'Users',
               alias: 'user-management',
               url: '/users',
               active: false,
               icon: 'square-listing.png',
               category: null,
               subcategory: null,
               display: true
          }
     ];

     // prettier-ignore
     constructor(
          private _router: Router,
          private _storageService: StorageService,
          private _broadcastService: BroadcastService,
     ) {
          this.user = this._storageService.getUserInfo();
          this._router.events.subscribe((event) => {
               if (event instanceof NavigationEnd) {
                 this.handleCurrentUrl();
                 this.currentURL = this._router.url;
               }
             });
     }

     ngOnInit(): void {
          this.handleCurrentUrl();
          this.isUserLoggedIn = this._storageService.isUserLoggedIn();
     }

     ngOnDestroy(): void {
          if (this.cityChangeSubs) {
               this.cityChangeSubs.unsubscribe();
          }
     }

     public togglerView() {}

     public handleCurrentUrl() {
          let alias = '';
          if (this._router.url == '/dashboard') {
               alias = 'dashboard';
          } else if (this._router.url == '/inventory/buildings') {
               alias = 'inventory-management';
          } else if (this._router.url == '/opportunity') {
               alias = 'opportunity-management';
          } else {
               alias = this._router.url;
          }
          this.handleActiveMenu(alias);
     }

     public handleActiveMenu(alias: any) {
          this.menus.map((menu) => {
               if (menu.alias == alias) {
                    menu.active = true;
               } else {
                    menu.active = false;
               }
          });
     }

     public toggleMenuOnMobile() {}

     ngAfterViewChecked() {
          $('body').click(() => {
               $('.side-panel').removeClass('mob-toggle-view');
          });
          $('.main-header').click(function (e) {
               e.stopPropagation();
          });
     }

     public logout() {
          this._storageService.clearAll();
          this._broadcastService.broadcastUserLoggedIn('ULOGGEDOUT');
          setTimeout(() => {
               this._router.navigateByUrl('');
          }, 10);
     }

     public handleMenuNavigation(menu: any) {
          this.handleActiveMenu(menu.alias);
          this._router.navigateByUrl(menu.url);
     }

     public navigateToNextPage(url: any) {
          this._router.navigateByUrl(url);
     }
}
