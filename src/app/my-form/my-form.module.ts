import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFormComponent } from './my-form.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: MyFormComponent},

];
@NgModule({
  declarations: [    
    MyFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MyFormModule { }
