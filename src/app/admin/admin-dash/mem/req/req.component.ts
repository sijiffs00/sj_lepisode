import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dash-mem-req',
  template: `
    <div class="member-request-container">
      <h2>회원 승인 요청</h2>
      <!-- 여기에 승인 대기 중인 회원 목록이 들어갈 거야 -->
      <div class="request-list">
        승인 대기 중인 회원 목록이 여기에 표시됩니다.
      </div>
    </div>
  `,
  styles: [`
    .member-request-container {
      padding: 20px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
  `]
})
export class AdminDashMemReqComponent {
  // 여기에 회원 승인 요청 관련 로직이 들어갈 거야
} 