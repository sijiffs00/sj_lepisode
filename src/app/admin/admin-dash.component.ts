import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  template: `
    <div class="admin-dash-container">
      <header class="admin-header">
        <div class="admin-info">
          <h2>👋 안녕하세요, {{adminInfo?.managerName}}님!</h2>
          <p class="role-tag">{{adminInfo?.role}}</p>
        </div>
        <button class="logout-btn" (click)="logout()">로그아웃</button>
      </header>

      <div class="dashboard-content">
        <div class="welcome-card">
          <h1>관리자 대시보드</h1>
          <p>오늘도 좋은 하루 되세요!</p>
        </div>

        <!-- 여기에 실제 대시보드 내용을 추가할 수 있어 -->
      </div>
    </div>
  `,
  styles: [`
    .admin-dash-container {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 20px;
    }

    .admin-header {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .admin-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .admin-info h2 {
      margin: 0;
      color: #333;
      font-size: 20px;
    }

    .role-tag {
      background: #5BBBB3;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 14px;
      margin: 0;
    }

    .logout-btn {
      background: #ff4444;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .logout-btn:hover {
      background: #ff2222;
    }

    .dashboard-content {
      margin-top: 20px;
    }

    .welcome-card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .welcome-card h1 {
      margin: 0;
      color: #333;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .welcome-card p {
      margin: 0;
      color: #666;
      font-size: 16px;
    }
  `]
})
export class AdminDashComponent implements OnInit {
  adminInfo: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // 세션 스토리지에서 관리자 정보 가져오기
    const adminData = sessionStorage.getItem('admin');
    if (!adminData) {
      // 관리자 정보가 없으면 로그인 페이지로 이동
      this.router.navigate(['/admin/login']);
      return;
    }
    this.adminInfo = JSON.parse(adminData);
  }

  logout() {
    // 세션 스토리지에서 관리자 정보 삭제
    sessionStorage.removeItem('admin');
    // 로그인 페이지로 이동
    this.router.navigate(['/admin/login']);
  }
} 