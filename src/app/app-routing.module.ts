import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/public/login/login.component';
import { PricingComponent } from './views/shared/pricing/pricing.component';
import { AboutUsComponent } from './views/public/about-us/about-us.component';
import { ContactUsComponent } from './views/shared/contact-us/contact-us.component';
import { ProductsComponent } from './views/public/products/products.component';
import { HomeComponent } from './views/shared/home/home.component';

const routes: Routes = [
     {
          path: 'login',
          component: LoginComponent
     },
     {
          path: 'pricing',
          component: PricingComponent
     },
     {
          path: 'products',
          component: ProductsComponent
     },
     {
          path: 'about',
          component: AboutUsComponent
     },
     {
          path: 'contact',
          component: ContactUsComponent
     },
     {
          path: '',
          loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule)
     }
];

@NgModule({
     imports: [RouterModule.forRoot(routes)],
     exports: [RouterModule]
})
export class AppRoutingModule {}
