import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './Services/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { MyOrderComponent } from './orders/my-order/my-order.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    ProductDetailComponent,
    CartPageComponent,
    MyOrderComponent,
    OrderDetailsComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
