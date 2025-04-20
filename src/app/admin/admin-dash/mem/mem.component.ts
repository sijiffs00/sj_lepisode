import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dash-mem',
  template: `
    <div class="member-management">
      <h2>회원 관리</h2>
      <!-- 여기에 회원 목록이나 관리 기능이 들어갈 거야! -->
    </div>
  `,
  styles: [`
    .member-management {
      padding: 20px;
    }
  `]
})
export class AdminDashMemComponent {
  constructor() {}
} 