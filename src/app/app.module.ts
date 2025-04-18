import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin/admin-login.component';
import { AdminModule } from './admin/admin.module';

// 메인 페이지의 자식 컴포넌트들 import
import { SearchComponent } from './main/search/search.component';
import { MembersComponent } from './main/members/members.component';
import { OrganizationComponent } from './main/organization/organization.component';
import { CompaniesComponent } from './main/companies/companies.component';
import { MyPageComponent } from './main/mypage/mypage.component';
import { CompanyService } from './services/company.service';
import { SupabaseService } from './services/supabase.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    AdminLoginComponent,
    // 새로운 컴포넌트들 등록
    SearchComponent,
    MembersComponent,
    OrganizationComponent,
    CompaniesComponent,
    MyPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdminModule,
    CommonModule
  ],
  providers: [
    CompanyService,
    SupabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }