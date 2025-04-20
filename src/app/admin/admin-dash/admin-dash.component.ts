import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  template: `
    <div class="admin-dashboard">
      <!-- 왼쪽 네비게이션 바야! -->
      <nav class="sidebar">
        <ul>
          <li [class.active]="isActive('main')" (click)="navigate('main')">
            <i class="fas fa-home"></i> 메인
          </li>
          <li [class.active]="isActive('mem')" (click)="navigate('mem')">
            <i class="fas fa-users"></i> 회원 관리
          </li>
          <li [class.active]="isActive('co')" (click)="navigate('co')">
            <i class="fas fa-building"></i> 회사 관리
          </li>
        </ul>
      </nav>
      
      <!-- 오른쪽에는 선택된 페이지의 내용이 보일 거야! -->
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      display: flex;
      height: 100vh;
    }
    
    .sidebar {
      width: 250px;
      background-color: #2c3e50;
      color: white;
      padding: 20px;
    }
    
    .sidebar ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .sidebar li {
      padding: 15px;
      cursor: pointer;
      margin-bottom: 10px;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
    
    .sidebar li:hover {
      background-color: #34495e;
    }
    
    .sidebar li.active {
      background-color: #3498db;
    }
    
    .sidebar i {
      margin-right: 10px;
    }
    
    .content {
      flex: 1;
      padding: 20px;
      background-color: #f5f6fa;
    }
  `]
})
export class AdminDashComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navigate(path: string) {
    // 현재 라우트를 기준으로 자식 라우트로 이동해!
    this.router.navigate([path], { relativeTo: this.route });
  }

  isActive(path: string): boolean {
    return this.router.url.includes(`/admin/dash/${path}`);
  }
} 