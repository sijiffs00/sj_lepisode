import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { supabase } from '../../supabase';
import { CommonModule } from '@angular/common';

interface OrgUser {
  id: number;
  name: string;
  position: string;
  department: string;
  company_name: string;
  business: string;
  phone: string;
  email: string;
  tier_name: string;
}

interface DbUser {
  id: number;
  name?: string;
  position?: string;
  department?: string;
  email?: string;
  phone?: string;
  company_id?: number;
}

interface Company {
  id: number;
  name?: string;
  business?: string;
}

@Component({
  selector: 'app-organization-detail',
  template: `
    <div class="org-container">
      <div class="header">
        <img src="assets/gjva_logo.png" alt="GJVA 로고" class="logo">
        <div class="title-row">
          <button class="back-button" (click)="goBack()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <h1 class="title">{{ getCurrentTabTitle() }}</h1>
        </div>
      </div>
      
      <div class="tab-container">
        <button 
          class="tab-button" 
          [class.active]="currentTab === 'chairman'"
          (click)="changeTab('chairman')">
          회장
        </button>
        <button 
          class="tab-button" 
          [class.active]="currentTab === 'advisors'"
          (click)="changeTab('advisors')">
          자문위원
        </button>
        <button 
          class="tab-button" 
          [class.active]="currentTab === 'directors'"
          (click)="changeTab('directors')">
          이사회/고문
        </button>
      </div>

      <div class="org-list">
        <div *ngIf="isLoading" class="loading">
          데이터를 불러오는 중...
        </div>
        
        <div *ngIf="!isLoading && users.length === 0" class="no-results">
          해당 탭에 표시할 회원이 없습니다.
        </div>
        
        <div *ngFor="let user of users" class="user-card">
          <div class="user-header">
            <div>
              <span class="user-name">{{ user.name }}</span>
              <span class="user-role" [class]="getRoleClass(user)">{{ user.tier_name }}</span>
            </div>
            <div class="user-company" *ngIf="user.company_name">
              {{ user.company_name }}
            </div>
          </div>
          
          <div class="user-details">
            <div class="detail-item">
              <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#008EAD">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              <span class="label">소속</span>
              <span class="value">{{ user.company_name || '정보 없음' }}</span>
            </div>
            
            <div class="detail-item">
              <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#008EAD">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              <span class="label">직위/직책</span>
              <span class="value">{{ user.position || '대표' }}</span>
            </div>
            
            <div class="detail-item" *ngIf="user.business">
              <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#008EAD">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              <span class="label">주요사업</span>
              <span class="value">{{ user.business || '도소매/렌트/전자상거래' }}</span>
            </div>
            
            <div class="detail-item">
              <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#008EAD">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              <span class="label">연락처</span>
              <span class="value">{{ user.phone || '010-1234-5678' }}</span>
            </div>
            
            <div class="detail-item">
              <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#008EAD">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              <span class="label">이메일</span>
              <span class="value">{{ user.email || 'example@lepisode.team' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      width: 100%;
    }

    :host ::ng-deep * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .org-container {
      min-height: 100vh;
      background-color: #f5f5f5;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    .header {
      background-color: #008EAD;
      padding: 20px;
      width: 100%;
    }

    .title-row {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }

    .back-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      margin-right: 10px;
      display: flex;
      align-items: center;
    }

    .logo {
      width: 120px;
      height: auto;
      margin-bottom: 10px;
    }

    .title {
      color: white;
      font-size: 24px;
      font-weight: bold;
    }

    .tab-container {
      display: flex;
      background-color: white;
      border-radius: 20px;
      margin: 16px;
      overflow: hidden;
    }

    .tab-button {
      flex: 1;
      padding: 15px 0;
      border: none;
      background: none;
      font-size: 16px;
      font-weight: bold;
      color: #666;
      border-radius: 20px;
    }

    .tab-button.active {
      background-color: #008EAD;
      color: white;
    }

    .org-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 0 16px 16px;
    }

    .loading, .no-results {
      text-align: center;
      padding: 20px;
      background: white;
      border-radius: 16px;
      margin-top: 10px;
    }

    .user-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .user-header {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .user-name {
      font-size: 18px;
      font-weight: bold;
      margin-right: 8px;
    }

    .user-role {
      font-size: 14px;
      padding: 4px 8px;
      border-radius: 4px;
      color: #008EAD;
    }

    .role-chairman {
      color: #ff6b6b;
    }

    .role-advisor {
      color: #008EAD;
    }

    .role-director {
      color: #40c057;
    }

    .user-company {
      font-size: 14px;
      color: #666;
    }

    .user-details {
      padding: 16px;
    }

    .detail-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .check-icon {
      margin-right: 8px;
      margin-top: 2px;
    }

    .label {
      width: 80px;
      color: #333;
      font-weight: bold;
    }

    .value {
      color: #666;
      flex: 1;
    }
  `]
})
export class OrganizationDetailComponent implements OnInit {
  currentTab: string = 'chairman';
  users: OrgUser[] = [];
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 쿼리 파라미터 감지
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'] || 'chairman';
      this.currentTab = tab;
      this.loadUsers();
    });
  }

  changeTab(tab: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge'
    });
  }

  goBack() {
    this.router.navigate(['/main/org']);
  }

  getCurrentTabTitle(): string {
    switch(this.currentTab) {
      case 'chairman': return '회장';
      case 'advisors': return '자문위원';
      case 'directors': return '이사회/고문';
      default: return '조직도';
    }
  }

  getRoleClass(user: OrgUser): string {
    switch(user.tier_name) {
      case '회장': return 'role-chairman';
      case '자문위원': return 'role-advisor';
      case '이사': case '고문': return 'role-director';
      default: return '';
    }
  }

  async loadUsers() {
    this.isLoading = true;
    try {
      console.log('현재 탭:', this.currentTab);
      
      let tierNumber: number;
      
      // 현재 탭에 따라 tier 값 설정
      switch(this.currentTab) {
        case 'chairman':
          tierNumber = 0;
          break;
        case 'advisors':
          tierNumber = 1;
          break;
        case 'directors':
          tierNumber = 2;
          break;
        default:
          tierNumber = 0;
      }
      
      console.log('조회할 티어 번호:', tierNumber);
      
      // 1. org 테이블에서 tier로 필터링하여 해당 역할의 사용자 ID 목록 가져오기
      const { data: orgData, error: orgError } = await supabase
        .from('org')
        .select('id')
        .eq('tier', tierNumber);
      
      if (orgError) {
        console.error('Error fetching org data:', orgError);
        this.users = [];
        return;
      }
      
      if (!orgData || orgData.length === 0) {
        console.log('해당 티어의 회원이 없습니다:', tierNumber);
        this.users = [];
        return;
      }
      
      // org.id 값들이 users.id와 동일하므로 이 id 목록으로 사용자 정보 조회
      const userIds = orgData.map(org => org.id);
      console.log('사용자 ID 목록:', userIds);
      
      // 2. user IDs를 이용해서 users 테이블에서 사용자 정보 가져오기
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .in('id', userIds);
      
      if (userError || !userData || userData.length === 0) {
        console.error('사용자 정보 조회 오류:', userError);
        this.users = [];
        return;
      }
      
      console.log('회원 데이터:', userData);
      
      // 3. company IDs 수집
      const companyIds = userData
        .map(user => user.company_id)
        .filter(id => id !== null && id !== undefined);
      
      // 4. companies 테이블에서 회사 정보 가져오기
      let companyData: Company[] = [];
      if (companyIds.length > 0) {
        const { data: companies, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .in('id', companyIds);
          
        if (!companyError && companies) {
          companyData = companies as Company[];
        } else {
          console.error('회사 정보 조회 오류:', companyError);
        }
      }
      
      console.log('회사 데이터:', companyData);
      
      // 5. 결과 매핑
      this.users = userData.map(user => {
        // tier 값에 따라 tier_name 설정
        let tier_name = '';
        if (tierNumber === 0) tier_name = '회장';
        else if (tierNumber === 1) tier_name = '자문위원';
        else if (tierNumber === 2) tier_name = '이사';
        
        // 사용자에 연결된 회사 정보 찾기
        const company = companyData.find(c => c.id === user.company_id) || {} as Company;
        
        return {
          id: user.id,
          name: user.name || '',
          position: user.position || '',
          department: user.department || '',
          tier_name: tier_name,
          company_name: company.name || '회사정보 없음',
          business: company.business || '',
          phone: user.phone || '',
          email: user.email || ''
        };
      });
      
      console.log('최종 표시할 회원 목록:', this.users);
    } catch (error) {
      console.error('Error loading users:', error);
      this.users = [];
    } finally {
      this.isLoading = false;
    }
  }
} 