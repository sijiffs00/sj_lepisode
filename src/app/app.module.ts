import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { AdminModule } from './admin/admin.module';
import { MainModule } from './main/main.module';

// 메인 페이지의 자식 컴포넌트들 import
import { SearchComponent } from './main/search/search.component';
import { MembersComponent } from './main/members/members.component';
import { OrganizationComponent } from './main/organization/organization.component';
import { OrganizationDetailComponent } from './main/organization/organization-detail.component';
import { CompanyDetailComponent } from './main/companies/company-detail/company-detail.component';
import { MyPageComponent } from './main/mypage/mypage.component';
import { CompanyService } from './services/company.service';
import { SupabaseService } from './services/supabase.service';
import { UpdateComponent } from './pages/update/update.component';
import { DataExampleComponent } from './components/data-example/data-example.component';
import { FindCompanyComponent } from './main/find-company/find-company.component';
import { RegisterCompanyComponent } from './main/register-company/register-company.component';
import { IndustrySelectComponent } from './main/industry-select/industry-select.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    SearchComponent,
    MembersComponent,
    OrganizationComponent,
    OrganizationDetailComponent,
    CompanyDetailComponent,
    MyPageComponent,
    UpdateComponent,
    DataExampleComponent,
    FindCompanyComponent,
    RegisterCompanyComponent,
    IndustrySelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    AdminModule,
    MainModule
  ],
  providers: [
    CompanyService,
    SupabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }