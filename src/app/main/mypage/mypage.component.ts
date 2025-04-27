import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { supabase } from '../../supabase';
import { UserInfo } from '../../interfaces/user.interface';

interface CompanyInfo {
  id: string;
  name: string;
  logo_url: string;
  industry: string;
  ceo_name: string;
  address: string;
  members: any[];
  approval_status: string;
  memberCount?: number;
}

@Component({
  selector: 'app-mypage',
  template: `
    <div class="mypage-container">
      <h1 class="page-title">내 프로필</h1>

      <div class="profile-card" *ngIf="userInfo">
        <div class="user-name">
          {{ userInfo.name }}
          <span class="auth-badge" [class.pending]="userInfo.auth_status !== 'approved'">
            {{ userInfo.auth_status === 'approved' ? '승인완료' : '승인 대기' }}
          </span>
        </div>

        <div class="info-list">
          <div class="info-item">
            <div class="icon-label">
              <i class="info-icon building-icon"></i>
              <span class="label">소속</span>
            </div>
            <div class="value">{{ userInfo.company?.name || '미입력' }}</div>
          </div>

          <div class="info-item">
            <div class="icon-label">
              <i class="info-icon position-icon"></i>
              <span class="label">직위/직책</span>
            </div>
            <div class="value">{{ userInfo.position || '미입력' }}</div>
          </div>

          <div class="info-item">
            <div class="icon-label">
              <i class="info-icon phone-icon"></i>
              <span class="label">연락처</span>
            </div>
            <div class="value">{{ userInfo.contact || '미입력' }}</div>
          </div>

          <div class="info-item">
            <div class="icon-label">
              <i class="info-icon email-icon"></i>
              <span class="label">이메일</span>
            </div>
            <div class="value">{{ userInfo.email || '미입력' }}</div>
          </div>
        </div>

        <div class="button-container">
          <button class="edit-button" (click)="editProfile()">
            <i class="edit-icon"></i>
            회원정보 수정
          </button>
        </div>
      </div>

      <h1 class="page-title company-title">내 기업</h1>

      <div class="company-card" *ngIf="companyInfo">
        <div class="company-header">
          <div class="company-logo">
            <img [src]="companyInfo.logo_url || 'assets/default-company-logo.png'" alt="기업 로고">
          </div>
          <span class="approval-badge" [class.pending]="companyInfo.approval_status !== 'approved'">
            {{ companyInfo.approval_status === 'approved' ? '승인완료' : '승인 대기' }}
          </span>
        </div>

        <div class="company-name">
          {{ companyInfo.name }}
        </div>
        <div class="company-industry">
          {{ companyInfo.industry || '도소매/엔터/전자상거래' }}
        </div>

        <div class="company-info-list">
          <div class="company-info-item">
            <div class="icon-label">
              <i class="info-icon ceo-icon"></i>
              <span class="label">대표자명</span>
            </div>
            <div class="value">{{ companyInfo.ceo_name }}</div>
          </div>

          <div class="company-info-item">
            <div class="icon-label">
              <i class="info-icon location-icon"></i>
              <span class="label">소재지</span>
            </div>
            <div class="value">{{ companyInfo.address }}</div>
          </div>

          <div class="company-info-item">
            <div class="icon-label">
              <i class="info-icon members-icon"></i>
              <span class="label">구성원</span>
            </div>
            <div class="value">
              {{ companyInfo.memberCount || 0 }}명
              <button class="view-members-button">목록으로</button>
            </div>
          </div>
        </div>
      </div>

      <button class="logout-button" (click)="logout()">
        로그아웃
      </button>

      <button class="delete-account-button" (click)="confirmDeleteAccount()">
        회원탈퇴
      </button>

      <div class="loading" *ngIf="isLoading">
        정보를 불러오는 중...
      </div>

      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <!-- 탈퇴 확인 모달 -->
      <div class="modal" *ngIf="showDeleteConfirm">
        <div class="modal-content">
          <h2>회원탈퇴 확인</h2>
          <p>정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
          <div class="modal-buttons">
            <button class="cancel-button" (click)="showDeleteConfirm = false">취소</button>
            <button class="confirm-button" (click)="deleteAccount()">탈퇴하기</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mypage-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #5BBBB3;
      margin: 0 0 24px 0;
    }

    .company-title {
      margin-top: 40px;
    }

    .profile-card, .company-card {
      background: #FFFFFF;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .company-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .company-logo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #E0E0E0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .approval-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      background: #FFF3E0;
      color: #FF9800;
    }

    .approval-badge.approved {
      background: #E8F5E9;
      color: #4CAF50;
    }

    .company-name {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .company-industry {
      font-size: 14px;
      color: #666;
      margin-bottom: 24px;
    }

    .company-info-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .company-info-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .view-members-button {
      margin-left: 12px;
      padding: 4px 12px;
      border: 1px solid #5BBBB3;
      border-radius: 16px;
      color: #5BBBB3;
      background: transparent;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .view-members-button:hover {
      background: #5BBBB3;
      color: white;
    }

    .ceo-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666666"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>');
    }

    .location-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666666"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>');
    }

    .members-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666666"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>');
    }

    .user-name {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .auth-badge {
      font-size: 14px;
      padding: 4px 12px;
      background: #E8F5E9;
      color: #4CAF50;
      border-radius: 20px;
      font-weight: normal;
    }

    .auth-badge.pending {
      background: #FFF3E0;
      color: #FF9800;
    }

    .info-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .icon-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .info-icon {
      width: 24px;
      height: 24px;
      background-size: 20px;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.6;
    }

    .label {
      font-size: 14px;
      color: #666;
    }

    .value {
      font-size: 16px;
      color: #333;
      padding-left: 32px;
    }

    .building-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666666"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>');
    }

    .position-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666666"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>');
    }

    .phone-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666666"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>');
    }

    .email-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666666"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>');
    }

    .edit-button {
      width: 100%;
      margin-top: 32px;
      padding: 16px;
      border: none;
      border-radius: 12px;
      background: #F5F5F5;
      color: #666;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .edit-button:hover {
      background: #EEEEEE;
    }

    .edit-icon {
      width: 20px;
      height: 20px;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666666"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    .logout-button {
      width: 100%;
      margin-top: 24px;
      padding: 12px;
      border: 1px solid #E0E0E0;
      border-radius: 8px;
      background: #FFFFFF;
      color: #666666;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .logout-button:hover {
      background: #F5F5F5;
    }

    .delete-account-button {
      margin-top: 12px;
      width: 100%;
      padding: 12px;
      border: 1px solid #FF5252;
      border-radius: 8px;
      background: transparent;
      color: #FF5252;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .delete-account-button:hover {
      background: #FF5252;
      color: white;
    }

    .loading {
      text-align: center;
      padding: 20px;
      color: #666;
    }

    .error-message {
      color: #f44336;
      text-align: center;
      padding: 20px;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 24px;
      border-radius: 16px;
      max-width: 400px;
      width: 90%;
    }

    .modal-content h2 {
      margin: 0 0 16px 0;
      color: #333;
    }

    .modal-content p {
      margin: 0 0 24px 0;
      color: #666;
    }

    .modal-buttons {
      display: flex;
      gap: 12px;
    }

    .cancel-button {
      flex: 1;
      padding: 12px;
      border: 1px solid #666;
      border-radius: 8px;
      background: transparent;
      color: #666;
      cursor: pointer;
    }

    .confirm-button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 8px;
      background: #FF5252;
      color: white;
      cursor: pointer;
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .profile-card, .company-card {
        background: #2a2a2a;
      }

      .user-name, .company-name {
        color: #fff;
      }

      .company-industry {
        color: #999;
      }

      .value {
        color: #fff;
      }

      .edit-button {
        background: #333;
        color: #fff;
      }

      .edit-button:hover {
        background: #444;
      }

      .view-members-button {
        border-color: #5BBBB3;
        color: #5BBBB3;
      }

      .view-members-button:hover {
        background: #5BBBB3;
        color: #2a2a2a;
      }

      .logout-button {
        background: #333;
        color: #fff;
      }

      .logout-button:hover {
        background: #444;
      }

      .delete-account-button {
        background: #333;
        color: #fff;
      }

      .delete-account-button:hover {
        background: #444;
      }
    }
  `]
})
export class MyPageComponent implements OnInit {
  userId: number | null = null;
  userInfo: UserInfo | null = null;
  companyInfo: CompanyInfo | null = null;
  isLoading = false;
  errorMessage = '';
  showDeleteConfirm = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // 로컬 스토리지에서 userId 가져오기 (추가)
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.userService.setUserId(this.userId); // userService에도 userId 설정
    } else {
      // userService에서 가져오기
      this.userId = this.userService.getUserId();
    }
    
    if (this.userId) {
      this.loadUserInfo();
    } else {
      // userId가 없으면 로그인 페이지로 리다이렉트
      this.router.navigate(['/login']);
    }

    this.userService.userId$.subscribe(id => {
      this.userId = id;
      if (id) {
        this.loadUserInfo();
      }
    });
  }

  async loadUserInfo() {
    try {
      this.isLoading = true;
      this.errorMessage = '';

      // 사용자 정보와 회사 정보를 함께 가져오기
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select(`
          *,
          company:company_id (*)
        `)
        .eq('id', this.userId)
        .single();

      if (userError) throw userError;

      this.userInfo = userData;
      
      // 회사 정보가 있으면 추가 정보 로드
      if (userData.company_id) {
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('id', userData.company_id)
          .single();

        if (companyError) throw companyError;
        this.companyInfo = companyData;
        
        // 실제 구성원 수 가져오기
        const { count, error: countError } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', userData.company_id);
          
        if (!countError) {
          // 회사 정보에 실제 구성원 수 업데이트
          if (this.companyInfo) {
            this.companyInfo.memberCount = count || 0;
          }
        }
      }

      console.log('사용자 정보 로드됨:', this.userInfo);
      console.log('회사 정보 로드됨:', this.companyInfo);
      
    } catch (error) {
      console.error('정보 로드 중 오류:', error);
      this.errorMessage = '정보를 불러오는 중 오류가 발생했습니다.';
    } finally {
      this.isLoading = false;
    }
  }

  editProfile() {
    if (this.userId) {
      this.router.navigate(['/main/mypage/update'], {
        queryParams: { id: this.userId }
      });
    }
  }

  async logout() {
    try {
      await this.userService.logout();
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      this.errorMessage = '로그아웃 중 오류가 발생했습니다.';
    }
  }

  confirmDeleteAccount() {
    this.showDeleteConfirm = true;
  }

  async deleteAccount() {
    try {
      this.isLoading = true;
      this.errorMessage = '';
      await this.userService.deleteAccount();
    } catch (error) {
      console.error('회원탈퇴 중 오류 발생:', error);
      this.errorMessage = '회원탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.';
    } finally {
      this.isLoading = false;
      this.showDeleteConfirm = false;
    }
  }
} 