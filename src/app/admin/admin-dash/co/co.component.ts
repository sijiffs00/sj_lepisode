import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dash-co',
  template: `
    <div class="company-management">
      <h2>회사 관리</h2>
      <!-- 여기에 회사 목록이나 관리 기능이 들어갈 거야! -->
    </div>
  `,
  styles: [`
    .company-management {
      padding: 20px;
    }
  `]
})
export class AdminDashCoComponent {
  constructor() {}
} 