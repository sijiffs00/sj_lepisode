import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dash-main',
  template: `
    <div class="main-dashboard">
      <h2>메인 대시보드</h2>
      <!-- 여기에 대시보드 내용이 들어갈 거야! -->
    </div>
  `,
  styles: [`
    .main-dashboard {
      padding: 20px;
    }
  `]
})
export class AdminDashMainComponent {
  constructor() {}
} 