import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routing';

@NgModule({
  declarations: [
    UserComponent,
    DetailsComponent,
    ListComponent
  ],
  imports: [
    RouterModule.forChild(userRoutes),
    CommonModule
  ]
})
export class UserModule { }
