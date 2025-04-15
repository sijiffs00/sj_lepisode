import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending',
  template: `
    <div class="pending-container">
      <div class="pending-content">
        <h1>승인 대기 중</h1>
        <p class="message">
          회원가입 신청이 완료되었습니다.<br>
          관리자 승인 후 서비스 이용이 가능합니다.
        </p>
        <div class="info-box">
          <p>승인 소요 시간: 1-2일 (영업일 기준)</p>
          <p>문의: 062-383-3000</p>
        </div>
        <button (click)="goToLogin()" class="back-btn">로그인 페이지로 돌아가기</button>
      </div>
    </div>
  `,
  styles: [`
    .pending-container {
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f9fa;
      padding: 20px;
    }

    .pending-content {
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 480px;
      width: 100%;
    }

    h1 {
      color: #333;
      margin-bottom: 24px;
      font-size: 24px;
    }

    .message {
      color: #666;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .info-box {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 32px;
    }

    .info-box p {
      margin: 8px 0;
      color: #666;
      font-size: 14px;
    }

    .back-btn {
      background: #5BBBB3;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .back-btn:hover {
      background: #4AA6A0;
    }
  `]
})
export class PendingComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
} 