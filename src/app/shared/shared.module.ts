import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphaOnlyDirective } from './Directives/alpha-only.directive';
import { AlphaNumericOnlyDirective } from './Directives/alphanumeric-only.directive';
import { AlphaSpaceOnlyDirective } from './Directives/alphaspace-only.directive';
import { NumericOnlyDirective } from './Directives/numeric-only.directive';
import { UsernameDirective } from './Directives/username.directive';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

const routes: Routes = [

  {path: 'product-form', component: ProductFormComponent}
];

@NgModule({
  declarations: [
    ProductFormComponent,
    AlphaOnlyDirective,
    NumericOnlyDirective,
    AlphaNumericOnlyDirective,
    AlphaSpaceOnlyDirective,
    UsernameDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductFormComponent,
    AlphaOnlyDirective,
    NumericOnlyDirective,
    AlphaNumericOnlyDirective,
    AlphaSpaceOnlyDirective,
    UsernameDirective,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
