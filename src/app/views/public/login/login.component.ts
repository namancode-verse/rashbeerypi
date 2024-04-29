import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormModel } from '../../../shared/models/form.model';
import { StorageService } from '../../../shared/services/storage.service';
import { DataService } from '../../../shared/services/data.service';
import { BroadcastService } from '../../../shared/services/broadcast.service';
import { SignupLoginService } from '../../../shared/services/signup-login.service';

@Component({
     selector: 'app-login',
     templateUrl: './login.component.html',
     styleUrls: ['./login.component.scss'],
     encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
     public loginForm: FormGroup;
     public formErrors: any;
     public validationMessage: any;
     public formModel: FormModel;

     // prettier-ignore
     constructor(
          private _router: Router,
          private _spinner: NgxSpinnerService,
          private _toastr: ToastrService,
          private _storageService: StorageService,
          private _broadcastService: BroadcastService,
          private _dataService: DataService,
          private _signupLoginService: SignupLoginService,
     ) {
          this.formModel = new FormModel();
     }

     ngOnInit(): void {
          this.createLoginForm();
     }

     public createLoginForm() {
          this.loginForm = new FormGroup({
               username: new FormControl(null, [Validators.required]),
               password: new FormControl(null, [Validators.required])
          });
          this.loadFormProperty('login');
     }

     public login() {
          if (this.loginForm.valid) {
               let fdata = this.loginForm.getRawValue();
               let loginPayload = {
                    source: 'app',
                    email: fdata.username,
                    password: fdata.password
               };
               // this._spinner.show();
               // this._dataService.login(loginPayload).subscribe({
               //      next: (res) => {
               //           this.executeLoginProcess(res);
               //      },
               //      error: (error) => {
               //           this._spinner.hide();
               //           this._toastr.error(error.message);
               //      }
               // });
               let tempResponse = {
                    token: 'XYZ',
                    userInfo: loginPayload
               };
               this.executeLoginProcess(tempResponse);
          } else {
               this.displayFormError(this.loginForm);
               this._toastr.error('Kindly provide all the necessary details!');
          }
     }

     public executeLoginProcess(response: any) {
          this._spinner.hide();
          this._storageService.setUserInfo(response);
          this._storageService.setUserToken(response);
          this._broadcastService.broadcastUserLoggedIn('ULOGGEDIN');
          this._router.navigate(['']);
     }

     public loadFormProperty(form) {
          this.formErrors = this.formModel.formErrors[form];
          this.validationMessage = this.formModel.validationMessage[form];
     }

     public forgetPassword() {}

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

     public displayFormError(group: FormGroup = null): void {
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

     public navigateToMainApp() {
          window.open('https://repositree.io/', '_blank');
     }

     public resolvedCaptcha(captchaResponse: string) {
          this.loginForm.get('recaptcha').setValue(captchaResponse);
     }
}
