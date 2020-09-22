import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Services/auth.guard';


const routes: Routes = [
  {path: 'create', component: CreateComponent},
  {path: 'detail/:id', component: DetailComponent, canActivate : [AuthGuard]},
  {path: 'edit/:id', component: EditComponent, canActivate : [AuthGuard]},
  {path: '', component: ListComponent}
];

@NgModule({
  declarations: [
    CreateComponent,
    DetailComponent,
    EditComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsModule { }
