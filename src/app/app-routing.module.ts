import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyOrderComponent } from './orders/my-order/my-order.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { AuthGuard } from './Services/auth.guard';



const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'home', component: HomeComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'cart-page', component: CartPageComponent, canActivate : [AuthGuard]},
  {path: 'my-order', component: MyOrderComponent, canActivate : [AuthGuard]},
  {path: 'order-details', component: OrderDetailsComponent, canActivate : [AuthGuard]},
  {
    path: '',
    loadChildren: () => import('./my-form/my-form.module').then(m => m.MyFormModule)
  },
  {
    path: 'products', canActivate : [AuthGuard],
    loadChildren: () => import('./Products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
