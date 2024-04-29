import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
     selector: 'app-lease-management',
     templateUrl: './lease-management.component.html',
     styleUrl: './lease-management.component.scss'
})
export class LeaseManagementComponent implements OnInit {
     public currentURL: any = '';

     // prettier-ignore
     constructor(
          private _router: Router
          ) {
          this.currentURL = this._router.url;
          this._router.events.subscribe((event) => {
               if (event instanceof NavigationEnd) {
                    this.currentURL = this._router.url;
               }
          });
     }

     ngOnInit(): void {}
}
