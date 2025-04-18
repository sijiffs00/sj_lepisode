import { Component } from '@angular/core';

@Component({
  selector: 'app-companies',
  template: `
    <div class="companies-container">
      <h2>기업현황</h2>
      <!-- 여기에 기업 목록 구현 -->
    </div>
  `,
  styles: [`
    .companies-container {
      padding: 16px;
    }
  `]
})
export class CompaniesComponent {} 