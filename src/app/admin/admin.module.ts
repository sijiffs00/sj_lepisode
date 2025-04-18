import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminDashComponent } from './admin-dash.component';

@NgModule({
  declarations: [
    AdminDashComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'dashboard', component: AdminDashComponent },
      { path: 'companies', loadComponent: () => import('./company-list.component').then(m => m.CompanyListComponent) }
    ])
  ],
  exports: [
    AdminDashComponent
  ]
})
export class AdminModule { } 