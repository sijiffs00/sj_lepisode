import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminDashMainComponent } from './admin-dash/main/main.component';
import { AdminDashMemComponent } from './admin-dash/mem/mem.component';
import { AdminDashCoComponent } from './admin-dash/co/co.component';
import { AdminLoginComponent } from './admin-login.component';
import { AdminDashMemListComponent } from './admin-dash/mem/list/list.component';
import { AdminDashMemReqComponent } from './admin-dash/mem/req/req.component';

// 여기가 라우팅 설정이야! 주소를 입력하면 어떤 페이지로 이동할지 정해주는 부분이지.
const routes: Routes = [
  {
    path: 'dash',
    component: AdminDashComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' }, // 기본으로 main 페이지로 이동해!
      { path: 'main', component: AdminDashMainComponent },
      { 
        path: 'mem', 
        component: AdminDashMemComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: AdminDashMemListComponent },
          { path: 'req', component: AdminDashMemReqComponent }
        ]
      },
      { path: 'co', component: AdminDashCoComponent }
    ]
  },
  { path: 'login', component: AdminLoginComponent }  // AdminLoginComponent 라우팅 추가
];

@NgModule({
  declarations: [
    AdminDashComponent,
    AdminDashMainComponent,
    AdminDashMemComponent,
    AdminDashCoComponent,
    AdminLoginComponent,
    AdminDashMemListComponent,
    AdminDashMemReqComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    AdminDashComponent,
    AdminLoginComponent
  ]
})
export class AdminModule { } 