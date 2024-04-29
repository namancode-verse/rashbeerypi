import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { BuildingsComponent } from '../views/secure/buildings/buildings.component';
import { AccessGuard } from '../shared/guards/access.guard';
import { DashboardComponent } from '../views/secure/dashboard/dashboard.component';

const routes: Routes = [
     {
          path: '',
          component: LayoutComponent,
          children: [
               {
                    path: '',
                    component: DashboardComponent,
                    canActivate: [AccessGuard]
               },
               {
                    path: 'dashboard',
                    component: DashboardComponent,
                    canActivate: [AccessGuard]
               },
               {
                    path: 'users',
                    loadChildren: () => import('./../users/users.module').then((m) => m.UsersModule)
               }
          ]
     }
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class LayoutRoutingModule {}
