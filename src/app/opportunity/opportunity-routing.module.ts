import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpportunityComponent } from '../views/secure/opportunity/opportunity.component';

const routes: Routes = [
     {
          path: '',
          component: OpportunityComponent
     }
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class OpportunityRoutingModule {}
