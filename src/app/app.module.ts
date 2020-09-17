import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyFormComponent } from './myForm/my-form/my-form.component';
import { CreateComponent } from './Products/create/create.component';
import { DetailComponent } from './Products/detail/detail.component';
import { EditComponent } from './Products/edit/edit.component';
import { ListComponent } from './Products/list/list.component';
import { ProductFormComponent } from './shared/product-form/product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    CreateComponent,
    DetailComponent,
    EditComponent,
    ListComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
