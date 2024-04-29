import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../shared/services/storage.service';
import { BroadcastService } from '../../../shared/services/broadcast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PlacementDriveService } from '../../../shared/services/placement-drive.service';

@Component({
     selector: 'app-users',
     templateUrl: './users.component.html',
     styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
     public users: any = [];

     // prettier-ignore
     constructor(
       private _router: Router,
       private _toaster: ToastrService,
       private _dialog: MatDialog,
       private _storageService: StorageService,
       private _broadcastService: BroadcastService,
       private _spinner: NgxSpinnerService,
       private _placementDriveService:PlacementDriveService

  ) {
       this.getAllStudents();
     
  }

     ngOnInit(): void {}

     public getAllStudents() {
          this._spinner.show();
          this._placementDriveService.getAllStudents().subscribe({
               next: (res) => {
                    this._spinner.hide();

                    if (res.data && res.data.length > 0) {
                         this.users = [];
                         res.data.forEach((user: any) => {
                              let tempUserInfo: any = {
                                   firstName: user.name.first,
                                   lastName: user.name.last,
                                   id: user._id,
                                   email: user.email,
                                   gender: user.gender,
                                   dob: user.dob
                              };
                              this.users.push(tempUserInfo);
                         });
                    }
               },
               error: (error) => {
                    this._spinner.hide();
                    this._toaster.error(error.message);
               }
          });
     }
}
