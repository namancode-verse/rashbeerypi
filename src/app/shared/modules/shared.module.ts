import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MultiSelectComponent } from '../../views/shared/multi-select/multi-select.component';
import { BuildingsComponent } from '../../views/secure/buildings/buildings.component';
import { BuildingsSearchComponent } from '../../views/secure/building-search/buildings-search.component';
import { SortDirective } from '../../directive/table-sorting/sort.directive';
import { PieChartComponent } from '../../views/shared/pie-chart/pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarChartComponent } from '../../views/shared/bar-chart/bar-chart.component';

// prettier-ignore
@NgModule({
  declarations: [
     BuildingsComponent,
     MultiSelectComponent,
     BuildingsSearchComponent,
     SortDirective,
     PieChartComponent,
     BarChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    NgxChartsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports:[
     BuildingsComponent,
     MultiSelectComponent,
     BuildingsSearchComponent,
     SortDirective,
     PieChartComponent,
     BarChartComponent
  ],
  providers: [MatDatepickerModule, MatNativeDateModule]
})
export class SharedModule { }
