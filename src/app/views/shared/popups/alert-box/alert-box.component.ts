import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
     selector: 'app-alert-box',
     templateUrl: './alert-box.component.html',
     styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {
     public dialogBoxInfo: any = {};

     // prettier-ignore
     constructor(
     @Inject(MAT_DIALOG_DATA) private _DIALOG_DATA: any,
     private _dialogRef: MatDialogRef<AlertBoxComponent>,
       ) {
          this.dialogBoxInfo = this._DIALOG_DATA;
       }

     ngOnInit(): void {}

     public closeDialogBox(status: any) {
          this._dialogRef.close({ status: status });
     }
}
