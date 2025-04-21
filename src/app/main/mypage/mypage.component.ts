import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { supabase } from '../../supabase';
import { UserInfo } from '../../interfaces/user.interface';

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

        <button class="edit-button" (click)="editProfile()">
          <i class="edit-icon"></i>
          회원정보 수정
        </button>
      </div>

      <div class="loading" *ngIf="isLoading">
        정보를 불러오는 중...
      </div>

      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
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

    .profile-card {
      background: #FFFFFF;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .profile-card {
        background: #2a2a2a;
      }

      .user-name {
        color: #fff;
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
    }
  `]
})
export class MyPageComponent implements OnInit {
  userId: number | null = null;
  userInfo: UserInfo | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userId = this.userService.getUserId();
    if (this.userId) {
      this.loadUserInfo();
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

      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          company:company_id (
            name
          )
        `)
        .eq('id', this.userId)
        .single();

      if (error) throw error;

      this.userInfo = data;
      console.log('사용자 정보 로드됨:', this.userInfo);
      
    } catch (error) {
      console.error('사용자 정보 로드 중 오류:', error);
      this.errorMessage = '사용자 정보를 불러오는 중 오류가 발생했습니다.';
    } finally {
      this.isLoading = false;
    }
  }

  editProfile() {
    // 프로필 수정 기능은 나중에 구현할게!
    console.log('프로필 수정 버튼 클릭됨');
  }
} 