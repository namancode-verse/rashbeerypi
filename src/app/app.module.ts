import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MatNativeDateModule } from '@angular/material/core';

// prettier-ignore
@NgModule({
     declarations: [
          AppComponent,
     ],
     imports: [
          BrowserModule,
          AppRoutingModule,
          ToastrModule.forRoot({
               positionClass: 'toast-top-center',
               preventDuplicates: true,
               closeButton: true
          }),
          NgxSpinnerModule.forRoot({ type: 'ball-pulse' }),
          BrowserAnimationsModule,
          RecaptchaModule,
          RecaptchaFormsModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule,
          MatNativeDateModule
     ],
     providers: [
          {
               provide: HTTP_INTERCEPTORS,
               useClass: TokenInterceptor,
               multi: true
          },

     ],
     bootstrap: [AppComponent]
})
export class AppModule {}
