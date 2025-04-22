import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';

// 메인 페이지의 자식 컴포넌트들 import
import { SearchComponent } from './main/search/search.component';
import { MembersComponent } from './main/members/members.component';
import { OrganizationComponent } from './main/organization/organization.component';
import { CompaniesComponent } from './main/companies/companies.component';
import { MyPageComponent } from './main/mypage/mypage.component';
import { UpdateComponent } from './pages/update/update.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'main', 
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },  // 기본으로 검색 페이지 보여주기
      { path: 'search', component: SearchComponent },
      { path: 'members', component: MembersComponent },
      { path: 'org', component: OrganizationComponent },
      { path: 'companies', component: CompaniesComponent },
      { path: 'mypage', component: MyPageComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'main/mypage/update', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }