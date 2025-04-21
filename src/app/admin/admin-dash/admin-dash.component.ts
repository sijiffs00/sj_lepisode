import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { supabase } from '../../supabase';
import { AdminService } from '../../services/admin.service';

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
                <div class="menu-item-with-badge">
                  <span>회원 승인 요청</span>
                  <span class="badge">{{ pendingCount }}</span>
                </div>
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

    .menu-item-with-badge {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
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

    .badge {
      background-color: #3498db;
      color: white;
      min-width: 20px;
      height: 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      padding: 0 6px;
    }
  `]
})
export class AdminDashComponent implements OnInit {
  isMemMenuOpen = false;
  pendingCount: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    // sessionStorage에서 관리자 정보를 가져와서 로그로 출력할게
    const adminInfo = JSON.parse(sessionStorage.getItem('admin') || '{}');
    console.log('현재 로그인한 관리자 정보:', {
      관리자ID: adminInfo.adminId,
      관리자이름: adminInfo.managerName,
      권한: adminInfo.role,
      회사ID: adminInfo.companyId
    });

    // 초기에 메뉴를 열어두기
    this.isMemMenuOpen = true;
    
    // 관리자 정보가 변경될 때마다 승인 대기 회원 수 업데이트
    this.adminService.adminInfo$.subscribe(adminInfo => {
      if (adminInfo?.companyId) {
        this.fetchPendingCount(adminInfo.companyId);
      }
    });
  }

  async fetchPendingCount(companyId: string) {
    try {
      console.log('승인 대기 회원 수 조회 시작:', companyId);
      
      const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .eq('company_id', companyId)
        .eq('company_approval', 'pending');  // company_approval이 pending인 회원만 조회
      
      if (error) throw error;
      
      console.log('승인 대기 회원 수:', count);
      this.pendingCount = count || 0;
    } catch (err) {
      console.error('승인 대기 회원 수 조회 중 오류 발생:', err);
    }
  }

  navigate(path: string, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
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