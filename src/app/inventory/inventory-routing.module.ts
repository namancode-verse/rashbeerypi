import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from '../shared/guards/access.guard';
import { BuildingsComponent } from '../views/secure/buildings/buildings.component';
import { BuildingFloorsComponent } from '../views/secure/building-floors/building-floors.component';
import { BuildingUnitsComponent } from '../views/secure/building-units/building-units.component';
import { BuildingLeasesComponent } from '../views/secure/building-leases/building-leases.component';
import { BuildingFormsComponent } from '../views/secure/building-forms/building-forms.component';

const routes: Routes = [
     {
          path: '',
          component: BuildingsComponent,
          canActivate: [AccessGuard]
     },
     {
          path: 'building',
          component: BuildingFormsComponent,
          canActivate: [AccessGuard]
     },
     {
          path: 'buildings',
          component: BuildingsComponent,
          canActivate: [AccessGuard]
     },
     {
          path: 'floors',
          component: BuildingFloorsComponent,
          canActivate: [AccessGuard]
     },
     {
          path: 'units',
          component: BuildingUnitsComponent,
          canActivate: [AccessGuard]
     },
     {
          path: 'leases',
          component: BuildingLeasesComponent,
          canActivate: [AccessGuard]
     }
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class InventoryRoutingModule {}
