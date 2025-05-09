import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompaniesComponent } from './companies/companies.component';
import { FilterByIdPipe } from './companies/filter-by-id.pipe';

@NgModule({
  declarations: [
    CompaniesComponent,
    FilterByIdPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CompaniesComponent
  ]
})
export class MainModule { } 