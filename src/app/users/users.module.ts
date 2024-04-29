import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersroutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';
import { UsersComponent } from '../views/secure/users/users.component';

// prettier-ignore

@NgModule({
	declarations: [
		UsersComponent
	],
	imports: [
		CommonModule,
		UsersroutingModule,
		FormsModule,
        SharedModule
	]
})
export class UsersModule { }
