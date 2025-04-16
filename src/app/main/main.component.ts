import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../supabase';

interface UserProfile {
  id: number;
  name: string;
  position: string;
  auth_status: string;
  company_appl: string;
  department: string;
  contact: string;
  email: string;
}

@Component({
  selector: 'app-main',
  template: `
    <div class="main-container">
      <!-- 메인 컨텐츠 영역 -->
      <div class="content">
        <!-- 각 탭에 따른 컨텐츠 영역 -->
        <div [ngSwitch]="currentTab">
          <!-- 통합검색 -->
          <div *ngSwitchCase="'search'" class="content-area">
            <h2>통합검색</h2>
            <div class="search-box">
              <input type="text" placeholder="검색어를 입력하세요" class="search-input">
              <button class="search-button">검색</button>
            </div>
          </div>

          <!-- 회원소개 -->
          <div *ngSwitchCase="'notice'" class="content-area">
            <h2>회원소개</h2>
            <div class="member-list">
              <p>회원 목록이 표시될 영역입니다.</p>
            </div>
          </div>

          <!-- 조직도 -->
          <div *ngSwitchCase="'org'" class="content-area">
            <h2>조직도</h2>
            <div class="org-chart">
              <p>조직도가 표시될 영역입니다.</p>
            </div>
          </div>

          <!-- 기업현황 -->
          <div *ngSwitchCase="'company'" class="content-area">
            <h2>기업현황</h2>
            <div class="company-stats">
              <p>기업 통계가 표시될 영역입니다.</p>
            </div>
          </div>

          <!-- 마이페이지 -->
          <div *ngSwitchCase="'mypage'" class="content-area mypage">
            <h2>마이페이지</h2>

            <!-- 내 프로필 섹션 -->
            <section class="profile-section">
              <h3>내 프로필</h3>
              <div class="profile-card" *ngIf="userProfile">
                <div class="profile-header">
                  <span class="name" [class.empty]="!userProfile.name">{{ userProfile.name || '미입력' }}</span>
                  <span class="position" [class.empty]="!userProfile.position">{{ userProfile.position || '미입력' }}</span>
                  <button class="auth-badge" [class.empty]="!userProfile.auth_status">{{ userProfile.auth_status || '미입력' }}</button>
                </div>
                <div class="profile-info">
                  <div class="info-row">
                    <span class="check">✓</span>
                    <span class="label">소속</span>
                    <span class="value" [class.empty]="!userProfile.company_appl">{{ userProfile.company_appl || '미입력' }}</span>
                  </div>
                  <div class="info-row">
                    <span class="check">✓</span>
                    <span class="label">직위/직책</span>
                    <span class="value" [class.empty]="!userProfile.position">{{ userProfile.position || '미입력' }}</span>
                  </div>
                  <div class="info-row">
                    <span class="check">✓</span>
                    <span class="label">연락처</span>
                    <span class="value" [class.empty]="!userProfile.contact">{{ userProfile.contact || '미입력' }}</span>
                  </div>
                  <div class="info-row">
                    <span class="check">✓</span>
                    <span class="label">이메일</span>
                    <span class="value" [class.empty]="!userProfile.email">{{ userProfile.email || '미입력' }}</span>
                  </div>
                </div>
                <div class="profile-actions">
                  <button class="profile-button">회원 정보 수정</button>
                  <button class="profile-button">회원 탈퇴</button>
                </div>
              </div>
              <div *ngIf="!userProfile" class="loading">
                프로필 정보를 불러오는 중...
              </div>
            </section>

            <!-- 내 기업 섹션 -->
            <section class="company-section">
              <h3>내 기업</h3>
              <div *ngIf="userProfile?.company_appl; else noCompany" class="company-card">
                <div class="company-logo">
                  <img src="assets/corona-logo.png" alt="회사 로고">
                </div>
                <div class="company-info">
                  <h4>(주)레피소드주식회사</h4>
                  <p class="ceo">김현수</p>
                  <p class="category">도소매/렌터/전자상거래</p>
                  <p class="address">광주시 서구 쌍촌동 961-4 203호</p>
                  <button class="status-badge">승인 완료</button>
                </div>
              </div>
              <ng-template #noCompany>
                <div class="no-company">
                  <div class="no-company-content">
                    <img src="assets/company_icon.png" alt="회사 아이콘" class="company-icon">
                    <p class="message">기업을 등록해주세요.</p>
                    <button class="register-button">기업등록 <span class="arrow">></span></button>
                  </div>
                </div>
              </ng-template>
              <div *ngIf="userProfile?.company_appl" class="company-actions">
                <button class="action-button">구성원 목록</button>
                <button class="action-button">기업 정보 수정</button>
                <button class="action-button">기업 나가기</button>
              </div>
              <button class="logout-button" (click)="logout()">로그아웃</button>
              <div class="withdraw-text">>회원탈퇴</div>
            </section>
          </div>
        </div>
      </div>

      <!-- 하단 네비게이션 바 -->
      <nav class="bottom-nav">
        <button class="nav-item" [class.active]="currentTab === 'search'" (click)="currentTab = 'search'">
          <span class="nav-icon">🔍</span>
          <span class="nav-text" [class.active]="currentTab === 'search'">통합검색</span>
        </button>
        <button class="nav-item" [class.active]="currentTab === 'notice'" (click)="currentTab = 'notice'">
          <span class="nav-icon">👥</span>
          <span class="nav-text" [class.active]="currentTab === 'notice'">회원소개</span>
        </button>
        <button class="nav-item" [class.active]="currentTab === 'org'" (click)="currentTab = 'org'">
          <span class="nav-icon">📊</span>
          <span class="nav-text" [class.active]="currentTab === 'org'">조직도</span>
        </button>
        <button class="nav-item" [class.active]="currentTab === 'company'" (click)="currentTab = 'company'">
          <span class="nav-icon">🏢</span>
          <span class="nav-text" [class.active]="currentTab === 'company'">기업현황</span>
        </button>
        <button class="nav-item" [class.active]="currentTab === 'mypage'" (click)="currentTab = 'mypage'">
          <span class="nav-icon">👤</span>
          <span class="nav-text" [class.active]="currentTab === 'mypage'">마이페이지</span>
        </button>
      </nav>
    </div>
  `,
  styles: [`
    .main-container {
      width: 100%;
      min-height: 100vh;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
      padding: 20px 16px;
      padding-bottom: 80px;
    }

    .header {
      margin-bottom: 24px;
    }

    .header h1 {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .content-area {
      background: #F8F9FA;
      border-radius: 12px;
      padding: 20px;
      min-height: 200px;
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 20px 16px;
    }

    /* 통합검색 스타일 */
    .search-box {
      display: flex;
      gap: 8px;
    }

    .search-input {
      flex: 1;
      padding: 12px;
      border: 1px solid #DDD;
      border-radius: 8px;
      font-size: 14px;
    }

    .search-button {
      padding: 12px 24px;
      background: #5BBBB3;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 500;
    }

    /* 마이페이지 스타일 */
    .mypage {
      background: #F8F9FA;
      padding: 0;
    }

    .profile-section, .company-section {
      background: white;
      margin: 16px;
      border-radius: 12px;
      overflow: hidden;
    }

    h3 {
      background: #0891B2;
      color: white;
      margin: 0;
      padding: 16px;
      font-size: 16px;
      font-weight: 500;
    }

    .company-card {
      padding: 20px 16px;
      display: flex;
      gap: 16px;
    }

    .company-logo {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
    }

    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .company-info {
      flex: 1;
    }

    .company-info h4 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }

    .company-info p {
      margin: 4px 0;
      color: #666;
      font-size: 14px;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      background: #E0F2FE;
      color: #0891B2;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      border: none;
      margin-top: 8px;
    }

    .action-button {
      display: block;
      width: calc(100% - 32px);
      margin: 8px 16px;
      padding: 12px;
      background: #F1F5F9;
      border: none;
      border-radius: 8px;
      color: #334155;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
    }

    .action-button:last-child {
      margin-bottom: 16px;
    }

    /* 프로필 카드 스타일 */
    .profile-card {
      padding: 20px;
      background: white;
    }

    .empty {
      color: #94A3B8 !important;
      font-style: italic;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
    }

    .name {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }

    .position {
      font-size: 16px;
      color: #0891B2;
    }

    .auth-badge {
      margin-left: auto;
      padding: 4px 12px;
      background: #E0F2FE;
      color: #0891B2;
      border: none;
      border-radius: 20px;
      font-size: 12px;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .check {
      color: #0891B2;
      font-size: 16px;
    }

    .label {
      width: 80px;
      color: #666;
      font-size: 14px;
    }

    .value {
      color: #333;
      font-size: 14px;
    }

    .profile-actions {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .profile-button {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 8px;
      background: #F1F5F9;
      color: #334155;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }

    /* 하단 네비게이션 바 스타일 */
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      display: flex;
      justify-content: space-around;
      padding: 8px;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
    }

    .nav-icon {
      font-size: 24px;
    }

    .nav-text {
      font-size: 12px;
      color: #94A3B8;
    }

    .nav-text.active {
      color: #0891B2;
    }

    /* 기업 없을 때 스타일 */
    .no-company {
      padding: 40px 20px;
      text-align: center;
    }

    .no-company-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .company-icon {
      width: 64px;
      height: 64px;
      opacity: 0.7;
    }

    .message {
      color: #64748B;
      font-size: 16px;
      margin: 0;
    }

    .register-button {
      background: #0891B2;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .arrow {
      font-size: 18px;
      margin-top: -2px;
    }

    .company-actions {
      margin-top: 16px;
    }

    .logout-button {
      width: 100%;
      padding: 12px;
      margin-top: 16px;
      background: none;
      color: #64748B;
      border: 1px solid #64748B;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.2s, border-color 0.2s;
    }

    .logout-button:hover {
      color: #475569;
      border-color: #475569;
    }

    .withdraw-text {
      color: #64748B;
      text-align: left;
      padding: 8px 16px;
      margin-top: 8px;
      font-size: 14px;
      cursor: pointer;
    }
  `]
})
export class MainComponent implements OnInit {
  currentTab: 'search' | 'notice' | 'org' | 'company' | 'mypage' = 'mypage';
  userProfile: UserProfile | null = null;

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      this.userProfile = userProfile;
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    }
  }

  async logout() {
    try {
      // Supabase 로그아웃 실행
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // 로그인 페이지로 이동
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      alert('로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  }
} 