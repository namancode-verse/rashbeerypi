import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/services/data.service';
import { AppSnackbarService } from '../shared/services/app-snackbar.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/modules/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PopupModule } from '../shared/modules/popup.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { InventoryService } from '../shared/services/inventory.service';
import { InventoryRoutingModule } from './inventory-routing.module';
import { BuildingFloorsComponent } from '../views/secure/building-floors/building-floors.component';
import { BuildingUnitsComponent } from '../views/secure/building-units/building-units.component';
import { BuildingLeasesComponent } from '../views/secure/building-leases/building-leases.component';
import { BuildingFormsComponent } from '../views/secure/building-forms/building-forms.component';
import { MatStepperModule } from '@angular/material/stepper';
import { BuildingResponseService } from '../shared/services/building.response.service';

// prettier-ignore
@NgModule({
     declarations: [
         BuildingFloorsComponent,
         BuildingUnitsComponent,
         BuildingLeasesComponent,
         BuildingFormsComponent
     ],
     imports: [
     	CommonModule,
     	InventoryRoutingModule,
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
          MatMenuModule,
          MatStepperModule
     ],
     exports:[],
     providers: [
     	DataService,
     	AppSnackbarService,
          InventoryService,
          BuildingResponseService
     ]
})
export class InventoryModule {}
