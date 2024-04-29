import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
     providedIn: 'root'
})
export class AppSnackbarService {
     public horizontalPosition: MatSnackBarHorizontalPosition = 'right';
     public verticalPosition: MatSnackBarVerticalPosition = 'top';

     // prettier-ignore
     constructor(
          private _snackBar: MatSnackBar,
     ) { }

     public greenSnackBar(message: any) {
          this._snackBar.open(message, '', {
               duration: 3000,
               horizontalPosition: this.horizontalPosition,
               verticalPosition: this.verticalPosition,
               panelClass: ['green-snackbar']
          });
     }

     public redSnackBar(message: any, duration: number = null, action: string = '') {
          this._snackBar.open(message, action, {
               duration: duration | 3000,
               horizontalPosition: this.horizontalPosition,
               verticalPosition: this.verticalPosition,
               panelClass: ['red-snackbar']
          });
     }
}
