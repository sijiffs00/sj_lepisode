import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dash-mem-list',
  template: `
    <div class="member-list-container">
      <h2>회원 목록</h2>
      <!-- 여기에 회원 목록 테이블이나 리스트가 들어갈 거야 -->
      <div class="member-list">
        회원 목록이 여기에 표시됩니다.
      </div>
    </div>
  `,
  styles: [`
    .member-list-container {
      padding: 20px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
  `]
})
export class AdminDashMemListComponent {
  // 여기에 회원 목록 관련 로직이 들어갈 거야
} 