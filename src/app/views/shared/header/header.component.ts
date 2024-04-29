import { Component, ElementRef, OnInit, SimpleChanges, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BroadcastService } from '../../../shared/services/broadcast.service';
import { StorageService } from '../../../shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { FormModel } from '../../../shared/models/form.model';
import { Iuser } from '../../../shared/models/user.model';
import { LayoutModel } from '../../../shared/models/layout.model';
import $ from 'jquery';

@Component({
     selector: 'app-header',
     templateUrl: './header.component.html',
     styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
     @ViewChild('userProfileCardRef') public userProfileCardRef: ElementRef;

     @Input()
     public header: LayoutModel['header'];

     public isUserLoggedIn: boolean = false;
     public user: Iuser;
     public defaultProfilePic: any;
     public userProfileForm: FormGroup;
     public formErrors: any;
     public validationMessage: any;
     public fmodel: FormModel;
     public isShowRightSidebar: boolean = false;
     public isSmartListClientView: boolean = false;
     public smartLinkInfo: any = null;
     public isToggled: boolean = false;
     public isUserProfileToggle: boolean = false;
     public isMobileView: boolean = false;

     public branding: any = {
          logo: null,
          color: null,
          templogo: null
     };

     public navbarLink = [
          {
               name: 'HOME',
               endPoint: '/',
               url: '',
               active: false
          },
          {
               name: 'LISTINGS',
               endPoint: '/property/listing',
               url: 'property/listing',
               active: false
          },
          {
               name: 'PRICING',
               endPoint: '/pricing/plan',
               url: 'pricing/plan',
               active: false
          },
          {
               name: 'CONTACT US',
               endPoint: '/contact',
               url: 'contact',
               active: false
          }
     ];

     // prettier-ignore
     constructor(
          private _broadcastService: BroadcastService,
          private _storageService: StorageService,
          private _router: Router,
          private _dialog: MatDialog,
          private _elemRef: ElementRef,
          private _toastr: ToastrService,
     ) {
          this.fmodel = new FormModel();
          this.routeChangeListner();
     }

     ngOnInit(): void {
          this.isUserLoggedIn = this._storageService.isUserLoggedIn();
          this.user = this._storageService.getUserInfo();
          this.handleHeaderView();
          this._broadcastService.login$.subscribe((message) => {
               if (message == 'ULOGGEDIN' || message == 'ULOGGEDOUT' || message == 'ULOGGEDOUT-MANUAL') {
                    this.isUserLoggedIn = this._storageService.isUserLoggedIn();
                    this.user = this._storageService.getUserInfo();
               }
          });

          this.createUserProfileForm();
     }

     ngAfterViewInit(): void {
          var ua = navigator.userAgent;
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
               this.isMobileView = true;
          }
     }

     ngAfterViewChecked() {
          $('body').click(() => {
               this.isUserProfileToggle = false;
               $('.theme-color-setting').removeClass('theme-open');
          });
          $('.theme-color-setting-body,.theme-color-setting-heading p,.theme-color-setting-btn').click(function (e) {
               e.stopPropagation();
          });
          var h = $('.main-logo img').height() + 30;
          $('.main-wrapper-full-view .main-header.smart-list-branding ~ .haeder-gapper').css('height', h + 'px');
     }

     public handleHeaderView() {}

     ngOnChanges(changes: SimpleChanges): void {
          if (changes.header.currentValue) {
               this.header = { ...changes.header.currentValue };
               if (!this.header.theme) {
                    $(this._elemRef.nativeElement).find('.smart-list-branding').css('background-color', '#ffffff');
               }
          }
     }

     public getBrandingImage() {
          if (this.isSmartListClientView) {
               if (this.branding.logo) {
                    return true;
               } else {
                    return false;
               }
          } else if (this.header.logo) {
               return false;
          } else {
               return true;
          }
     }

     public logout() {
          this._storageService.clearAll();
          this._broadcastService.broadcastUserLoggedIn('ULOGGEDOUT-MANUAL');
          this._router.navigate(['/login']);
     }

     public openSignupDialog() {}

     public openLoginDialog() {}

     public navMenuToggller() {
          var ua = navigator.userAgent;
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
               $('.main-header nav.navbar.nav-header-menu').slideToggle();
          }
     }

     public createUserProfileForm() {
          this.loadFormProperty('userProfileForm');
          let name: any = null;
          let email: any = null;
          let phone: any = null;

          if (this.user && this.user.profile) {
               name = this.user.profile.name ? this.user.profile.name.first : null;
               email = this.user.profile.email;
               phone = this.user.profile.phone;
          }

          this.userProfileForm = new FormGroup({
               name: new FormControl(this.user ? name : null, [Validators.maxLength(60)]),
               email: new FormControl(this.user ? email : null, [Validators.email]),
               phone: new FormControl(this.user ? phone : null, [Validators.pattern('^[0-9]*$'), Validators.maxLength(13)])
          });
     }

     public loadFormProperty(form: string) {
          this.formErrors = this.fmodel.formErrors[form];
          this.validationMessage = this.fmodel.validationMessage[form];
     }

     public changeUserProfileImage(event) {}

     public updateUserProfile() {}

     public profileToggle() {
          this.isShowRightSidebar = !this.isShowRightSidebar;
          if (this.isShowRightSidebar) {
               this.showRightSidebar();
          } else {
               this.hideRightSidebar();
          }
     }

     public goToUserProfile() {
          this.isUserProfileToggle = !this.isUserProfileToggle;
          this._router.navigate(['user', 'profile']);
     }

     public resetPassword() {
          this.isUserProfileToggle = !this.isUserProfileToggle;
          this._router.navigate(['reset-password']);
     }

     public showRightSidebar() {
          let element = $(this._elemRef.nativeElement).find('.profile-short-info');
          element.css({ right: '0px' });
     }

     public hideRightSidebar() {
          let element = $(this._elemRef.nativeElement).find('.profile-short-info');
          element.css({ right: '-100%' });
     }

     public userProfileToggle() {
          this.isUserProfileToggle = !this.isUserProfileToggle;
     }

     public togglerView() {}

     public mobNavMenuToggller() {
          if ($('.side-panel').hasClass('mob-toggle-view')) {
               $('.side-panel').removeClass('mob-toggle-view');
          } else {
               $('.side-panel').addClass('mob-toggle-view');
          }
     }

     public termAndCondition() {
          this.isUserProfileToggle = !this.isUserProfileToggle;
          this._router.navigate(['terms-condition']);
     }

     public privacyPolicy() {
          this.isUserProfileToggle = !this.isUserProfileToggle;
          this._router.navigate(['privacy-policy']);
     }

     public shouldDisplaySignup() {}

     public logValidationError(group: FormGroup = null): void {
          Object.keys(group.controls).forEach((key: string) => {
               const abstractControl = group.get(key);
               if (abstractControl instanceof FormGroup) {
                    this.logValidationError(abstractControl);
               } else {
                    this.formErrors[key] = '';
                    if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
                         const messages = this.validationMessage[key];

                         for (const errorKey in abstractControl.errors) {
                              if (errorKey) {
                                   this.formErrors[key] += messages[errorKey] + ' ';
                              }
                         }
                    }
               }
          });
     }

     public displayAllError(group: FormGroup = null): void {
          Object.keys(group.controls).forEach((key: string) => {
               const abstractControl = group.get(key);
               if (abstractControl instanceof FormGroup) {
                    this.logValidationError(abstractControl);
               } else {
                    this.formErrors[key] = '';
                    if (abstractControl && !abstractControl.valid) {
                         const messages = this.validationMessage[key];

                         for (const errorKey in abstractControl.errors) {
                              if (errorKey) {
                                   this.formErrors[key] += messages[errorKey] + ' ';
                              }
                         }
                    }
               }
          });
     }

     public routeChangeListner() {
          this._router.events
               .pipe(
                    filter((event) => {
                         return event instanceof NavigationEnd;
                    })
               )
               .subscribe((event: NavigationEnd) => {
                    this.handleCurrentUrl();
               });
     }

     public handleCurrentUrl() {
          for (const link of this.navbarLink) {
               if (this._router.url == link.endPoint) {
                    this.navbarLink.map((menu) => {
                         if (menu.endPoint == link.endPoint) {
                              menu.active = true;
                         } else {
                              menu.active = false;
                         }
                    });
               }
          }
     }
}
