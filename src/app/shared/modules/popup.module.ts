import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { BuildingPopupComponent } from '../../views/shared/popups/building-popup/building-popup.component';
import { SharedModule } from './shared.module';
import { AdvancePopupComponent } from '../../views/shared/popups/advance-popup/advance-popup.component';
import { OpportunityPopupComponent } from '../../views/shared/popups/opportunity-popup/opportunity-popup.component';
import { AlertBoxComponent } from '../../views/shared/popups/alert-box/alert-box.component';
import { UploadFilesPopupComponent } from '../../views/shared/popups/upload-files-popup/upload-files-popup.component';
import { UploadImagesPopupComponent } from '../../views/shared/popups/upload-images-popup/upload-images-popup.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SmallProgressIndicatorComponent } from '../../views/shared/small-progress-indicator/small-progress-indicator.component';

// prettier-ignore
@NgModule({
  declarations: [
     BuildingPopupComponent,
     AdvancePopupComponent,
     OpportunityPopupComponent,
     AlertBoxComponent,
     UploadFilesPopupComponent,
     UploadImagesPopupComponent,
     SmallProgressIndicatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatMenuModule,
    SharedModule,
    NgxFileDropModule
  ],
  exports: [
     BuildingPopupComponent,
     AdvancePopupComponent,
     AlertBoxComponent,
     SmallProgressIndicatorComponent,
  ],
  providers: [
    MatDatepickerModule, 
    MatNativeDateModule
  ]
})
export class PopupModule { }
