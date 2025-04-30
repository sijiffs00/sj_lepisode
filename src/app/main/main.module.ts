import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies/companies.component';
import { FilterByIdPipe } from './companies/filter-by-id.pipe';

@NgModule({
  declarations: [
    CompaniesComponent,
    FilterByIdPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompaniesComponent
  ]
})
export class MainModule { } 