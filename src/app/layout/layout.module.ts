import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../views/shared/home/home.component';
import { HeaderComponent } from '../views/shared/header/header.component';
import { FooterComponent } from '../views/shared/footer/footer.component';
import { SidebarComponent } from '../views/secure/sidebar/sidebar.component';
import { LandingPageComponent } from '../views/shared/landing-page/landing-page.component';
import { SignupComponent } from '../views/public/signup/signup.component';
import { DashboardComponent } from '../views/secure/dashboard/dashboard.component';
import { AboutUsComponent } from '../views/public/about-us/about-us.component';
import { ContactUsComponent } from '../views/shared/contact-us/contact-us.component';
import { ProductsComponent } from '../views/public/products/products.component';
import { DataService } from '../shared/services/data.service';
import { AppSnackbarService } from '../shared/services/app-snackbar.service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../views/public/login/login.component';
import { SharedModule } from '../shared/modules/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../shared/services/inventory.service';
import { MatButtonModule } from '@angular/material/button';
import { PopupModule } from '../shared/modules/popup.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PlacementDriveService } from '../shared/services/placement-drive.service';
// prettier-ignore
@NgModule({
     declarations: [
	     LayoutComponent,
     	HomeComponent,
     	HeaderComponent,
     	FooterComponent,
     	SidebarComponent,
     	LandingPageComponent,
     	SignupComponent,
     	DashboardComponent,
     	AboutUsComponent,
     	ContactUsComponent,
     	ProductsComponent,
     	LoginComponent,
     ],
     imports: [
     	CommonModule,
     	LayoutRoutingModule,
     	HttpClientModule,
     	MatDialogModule,
          InfiniteScrollModule,
          SharedModule,
     	FormsModule,
          ReactiveFormsModule,
          MatButtonModule,
          PopupModule,
          MatExpansionModule,
          MatFormFieldModule,
          MatInputModule,
          MatDatepickerModule,
          MatButtonModule,
          MatTableModule,
          MatIconModule,
          MatMenuModule
     ],
     exports:[],
     providers: [
     	DataService,
     	AppSnackbarService,
          InventoryService,
          PlacementDriveService
     ]
})
export class LayoutModule {}
