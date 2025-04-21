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
          <li [class.active]="isActive('mem')" (click)="toggleMemMenu()">
            <div class="menu-item">
              <span><i class="fas fa-users"></i> 회원 관리</span>
              <i class="fas" [class.fa-chevron-down]="!isMemMenuOpen" [class.fa-chevron-up]="isMemMenuOpen"></i>
            </div>
            <ul class="submenu" [class.open]="isMemMenuOpen">
              <li [class.active]="isActive('mem/list')" (click)="navigate('mem/list', $event)">
                회원 목록
              </li>
              <li [class.active]="isActive('mem/req')" (click)="navigate('mem/req', $event)">
                회원 승인 요청
              </li>
            </ul>
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
    
    .sidebar > ul > li {
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

    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .submenu {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      margin-top: 10px;
      margin-left: 20px;
    }

    .submenu.open {
      max-height: 200px;
    }

    .submenu li {
      padding: 10px;
      margin-bottom: 5px;
      border-radius: 3px;
      font-size: 0.9em;
      opacity: 0.8;
    }

    .submenu li:hover {
      opacity: 1;
      background-color: #34495e;
    }

    .submenu li.active {
      background-color: #3498db;
      opacity: 1;
    }
  `]
})
export class AdminDashComponent {
  isMemMenuOpen = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navigate(path: string, event?: MouseEvent) {
    if (event) {
      event.stopPropagation(); // 하위 메뉴 클릭시 상위 메뉴 이벤트 전파 방지
    }
    this.router.navigate([path], { relativeTo: this.route });
  }

  toggleMemMenu() {
    this.isMemMenuOpen = !this.isMemMenuOpen;
  }

  isActive(path: string): boolean {
    return this.router.url.includes(`/admin/dash/${path}`);
  }
} 