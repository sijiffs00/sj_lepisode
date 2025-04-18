import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  template: `
    <div class="admin-layout">
      <!-- 왼쪽 네비게이션 바 -->
      <nav class="side-navbar">
        <div class="nav-header">
          <h3>관리자 메뉴</h3>
        </div>
        <ul class="nav-menu">
          <li class="nav-item" [class.active]="currentMenu === 'dashboard'">
            <a (click)="navigateTo('dashboard')">
              <i class="fas fa-chart-line"></i>대시보드
            </a>
          </li>
          <li class="nav-item" [class.active]="currentMenu === 'members'" [class.expanded]="expandedMenus.members">
            <a (click)="toggleSubmenu('members')">
              <i class="fas fa-users"></i>
              회원관리
              <i class="fas" [class.fa-chevron-down]="!expandedMenus.members" [class.fa-chevron-up]="expandedMenus.members"></i>
            </a>
            <ul class="submenu" [class.show]="expandedMenus.members">
              <li class="submenu-item" [class.active]="currentSubmenu === 'member-list'">
                <a (click)="navigateTo('member-list')">
                  <i class="fas fa-list"></i>회원 목록
                </a>
              </li>
              <li class="submenu-item" [class.active]="currentSubmenu === 'member-approval'">
                <a (click)="navigateTo('member-approval')">
                  <i class="fas fa-user-check"></i>회원 승인 요청
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item" [class.active]="currentMenu === 'companies'" [class.expanded]="expandedMenus.companies">
            <a (click)="toggleSubmenu('companies')">
              <i class="fas fa-building"></i>
              기업관리
              <i class="fas" [class.fa-chevron-down]="!expandedMenus.companies" [class.fa-chevron-up]="expandedMenus.companies"></i>
            </a>
            <ul class="submenu" [class.show]="expandedMenus.companies">
              <li class="submenu-item" [class.active]="currentSubmenu === 'company-list'">
                <a (click)="navigateTo('company-list')">
                  <i class="fas fa-list"></i>기업 목록
                </a>
              </li>
              <li class="submenu-item" [class.active]="currentSubmenu === 'company-approval'">
                <a (click)="navigateTo('company-approval')">
                  <i class="fas fa-building-circle-check"></i>기업 승인 요청
                </a>
              </li>
              <li class="submenu-item" [class.active]="currentSubmenu === 'company-member-approval'">
                <a (click)="navigateTo('company-member-approval')">
                  <i class="fas fa-user-plus"></i>기업 구성원 승인 요청
                </a>
              </li>
              <li class="submenu-item" [class.active]="currentSubmenu === 'company-edit-requests'">
                <a (click)="navigateTo('company-edit-requests')">
                  <i class="fas fa-pen-to-square"></i>기업 정보 수정 요청
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item" [class.active]="currentMenu === 'organization'">
            <a (click)="navigateTo('organization')">
              <i class="fas fa-sitemap"></i>조직도 관리
            </a>
          </li>
          <li class="nav-item" [class.active]="currentMenu === 'admins'">
            <a (click)="navigateTo('admins')">
              <i class="fas fa-user-shield"></i>관리자 관리
            </a>
          </li>
        </ul>
      </nav>

      <!-- 메인 컨텐츠 영역 -->
      <div class="main-content">
        <header class="admin-header" *ngIf="currentSubmenu !== 'company-list'">
          <div class="admin-info">
            <h2>👋 안녕하세요, {{adminInfo?.managerName}}님!</h2>
            <p class="role-tag">{{adminInfo?.role}}</p>
          </div>
          <button class="logout-btn" (click)="logout()">로그아웃</button>
        </header>

        <div class="dashboard-content">
          <div class="welcome-card" *ngIf="currentMenu === 'dashboard'">
            <h1>관리자 대시보드</h1>
            <p>오늘도 좋은 하루 되세요!</p>
          </div>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }

    /* 사이드 네비게이션 바 스타일 */
    .side-navbar {
      width: 250px;
      background: #2c3e50;
      color: white;
      padding: 20px 0;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      overflow-y: auto;
    }

    .nav-header {
      padding: 0 20px 20px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .nav-header h3 {
      margin: 0;
      font-size: 18px;
      color: #ecf0f1;
    }

    .nav-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      padding: 0;
      transition: background 0.3s;
    }

    .nav-item a {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      color: #ecf0f1;
      text-decoration: none;
      transition: all 0.3s;
      cursor: pointer;
    }

    .nav-item a i {
      margin-right: 10px;
      width: 20px;
      text-align: center;
    }

    .nav-item a i:last-child {
      margin-left: auto;
      margin-right: 0;
      font-size: 12px;
    }

    .nav-item:hover {
      background: #34495e;
    }

    .nav-item.active {
      background: #3498db;
    }

    .nav-item.active a {
      color: white;
    }

    /* 서브메뉴 스타일 */
    .submenu {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      background: #34495e;
    }

    .submenu.show {
      max-height: 300px; /* 기업관리 하위메뉴가 더 많으니 높이를 늘려줌 */
    }

    .submenu-item a {
      padding-left: 50px !important;
      font-size: 14px;
    }

    .submenu-item.active {
      background: #2980b9;
    }

    /* 메인 컨텐츠 영역 스타일 */
    .main-content {
      flex: 1;
      margin-left: 250px;
      background: #f5f5f5;
      min-height: 100vh;
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
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .welcome-card {
      padding: 20px;
      border-bottom: 1px solid #eee;
    }

    .welcome-card h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 24px;
    }

    .welcome-card p {
      margin: 10px 0 0 0;
      color: #7f8c8d;
    }
  `]
})
export class AdminDashComponent implements OnInit {
  adminInfo: any = null;
  currentMenu = 'dashboard';
  currentSubmenu = '';
  expandedMenus = {
    members: false,
    companies: false
  };

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

    // URL에 따라 현재 메뉴 상태 설정
    const url = this.router.url;
    if (url.includes('member')) {
      this.currentMenu = 'members';
      this.expandedMenus.members = true;
      this.currentSubmenu = url.split('/').pop() || '';
    } else if (url.includes('company')) {
      this.currentMenu = 'companies';
      this.expandedMenus.companies = true;
      this.currentSubmenu = url.split('/').pop() || '';
    }
  }

  toggleSubmenu(menu: string) {
    switch (menu) {
      case 'members':
        this.expandedMenus.members = !this.expandedMenus.members;
        if (this.expandedMenus.members) {
          this.expandedMenus.companies = false;
        }
        break;
      case 'companies':
        this.expandedMenus.companies = !this.expandedMenus.companies;
        if (this.expandedMenus.companies) {
          this.expandedMenus.members = false;
        }
        break;
    }
  }

  navigateTo(route: string) {
    switch (route) {
      case 'dashboard':
        this.currentMenu = 'dashboard';
        this.currentSubmenu = '';
        this.router.navigate(['/admin/dash']);
        break;
      case 'member-list':
        this.currentMenu = 'members';
        this.currentSubmenu = 'member-list';
        this.router.navigate(['/admin/dash/member-list']);
        break;
      case 'member-approval':
        this.currentMenu = 'members';
        this.currentSubmenu = 'member-approval';
        this.router.navigate(['/admin/dash/member-approval']);
        break;
      case 'company-list':
        this.currentMenu = 'companies';
        this.currentSubmenu = 'company-list';
        this.router.navigate(['/admin/dash/company-list']);
        break;
      case 'company-approval':
        this.currentMenu = 'companies';
        this.currentSubmenu = 'company-approval';
        this.router.navigate(['/admin/dash/company-approval']);
        break;
      case 'company-member-approval':
        this.currentMenu = 'companies';
        this.currentSubmenu = 'company-member-approval';
        this.router.navigate(['/admin/dash/company-member-approval']);
        break;
      case 'company-edit-requests':
        this.currentMenu = 'companies';
        this.currentSubmenu = 'company-edit-requests';
        this.router.navigate(['/admin/dash/company-edit-requests']);
        break;
      case 'organization':
        this.currentMenu = 'organization';
        this.currentSubmenu = '';
        this.router.navigate(['/admin/dash/organization']);
        break;
      case 'admins':
        this.currentMenu = 'admins';
        this.currentSubmenu = '';
        this.router.navigate(['/admin/dash/admins']);
        break;
    }
  }

  logout() {
    // 세션 스토리지에서 관리자 정보 삭제
    sessionStorage.removeItem('admin');
    // 로그인 페이지로 이동
    this.router.navigate(['/admin/login']);
  }
} 