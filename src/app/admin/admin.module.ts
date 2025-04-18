import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminDashComponent } from './admin-dash.component';
import { CompanyListComponent } from './company-list.component';

@NgModule({
  declarations: [
    AdminDashComponent,
    CompanyListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    AdminDashComponent,
    CompanyListComponent
  ]
})
export class AdminModule { } 