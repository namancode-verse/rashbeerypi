import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunityRoutingModule } from './opportunity-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';

// prettier-ignore

@NgModule({
	declarations: [
	],
	imports: [
		CommonModule,
		OpportunityRoutingModule,
		FormsModule,
        SharedModule
	]
})
export class OpportunityModule { }
