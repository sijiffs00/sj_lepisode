import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  template: `
    <div class="main-container">
      <!-- 메인 컨텐츠 영역 -->
      <div class="content">
        <div class="header">
          <h1>광주전남벤처기업협회</h1>
        </div>

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
            <!-- 상단 헤더 -->
            <div class="mypage-header">
              <div class="logo">
                <img src="assets/gjva-logo.png" alt="GJVA">
                <span>(사)광주전남벤처기업협회</span>
              </div>
              <button class="auth-button">권한인증</button>
            </div>

            <h2>마이페이지</h2>

            <!-- 내 프로필 섹션 -->
            <section class="profile-section">
              <h3>내 프로필</h3>
              <div class="profile-card">
                <div class="name-row">
                  <span class="name">양주성</span>
                  <span class="position">이사</span>
                  <button class="status-badge">승인 완료</button>
                </div>
                <div class="info-list">
                  <div class="info-item">
                    <span class="check-icon">✓</span>
                    <span class="label">소속</span>
                    <span class="value">(주)레피소드주식회사</span>
                  </div>
                  <div class="info-item">
                    <span class="check-icon">✓</span>
                    <span class="label">직위/직책</span>
                    <span class="value">대표</span>
                  </div>
                  <div class="info-item">
                    <span class="check-icon">✓</span>
                    <span class="label">연락처</span>
                    <span class="value">010-1234-5678</span>
                  </div>
                  <div class="info-item">
                    <span class="check-icon">✓</span>
                    <span class="label">이메일</span>
                    <span class="value">example&#64;lepisode.team</span>
                  </div>
                </div>
              </div>
              <button class="action-button">회원 정보 수정</button>
              <button class="action-button">회원 탈퇴</button>
            </section>

            <!-- 내 기업 섹션 -->
            <section class="company-section">
              <h3>내 기업</h3>
              <div class="company-card">
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
              <button class="action-button">구성원 목록</button>
              <button class="action-button">기업 정보 수정</button>
              <button class="action-button">기업 나가기</button>
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

    .mypage-header {
      background: #3C8BB5;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logo img {
      height: 24px;
    }

    .auth-button {
      background: white;
      color: #3C8BB5;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .profile-section, .company-section {
      background: white;
      margin: 16px;
      border-radius: 12px;
      overflow: hidden;
    }

    h3 {
      background: #3C8BB5;
      color: white;
      margin: 0;
      padding: 16px;
      font-size: 16px;
      font-weight: 500;
    }

    .profile-card {
      padding: 20px 16px;
    }

    .name-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #EEEEEE;
    }

    .name {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .position {
      color: #3C8BB5;
      font-size: 14px;
    }

    .status-badge {
      margin-left: auto;
      background: #E8F5FF;
      color: #3C8BB5;
      border: none;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
    }

    .info-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    .check-icon {
      color: #3C8BB5;
    }

    .label {
      color: #666;
      width: 80px;
    }

    .value {
      color: #333;
      flex: 1;
    }

    .company-card {
      padding: 20px 16px;
    }

    .company-logo {
      width: 100%;
      height: 120px;
      background: #000;
      border-radius: 8px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .company-info h4 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }

    .company-info p {
      color: #666;
      font-size: 14px;
      margin: 4px 0;
    }

    .action-button {
      width: calc(100% - 32px);
      margin: 8px 16px;
      padding: 12px;
      background: white;
      border: 1px solid #DDD;
      border-radius: 8px;
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }

    .action-button:last-child {
      margin-bottom: 16px;
    }

    /* 하단 네비게이션 바 스타일 */
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 64px;
      background: white;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid #EEEEEE;
      padding: 0 16px;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      width: 20%;
    }

    .nav-icon {
      font-size: 20px;
      color: #999;
    }

    .nav-text {
      font-size: 11px;
      font-weight: 500;
      color: #999;
    }

    .nav-item.active .nav-icon {
      color: #5BBBB3;
    }

    .nav-text.active {
      color: #5BBBB3;
    }

    /* 반응형 스타일 */
    @media (min-width: 768px) {
      .content {
        max-width: 768px;
        margin: 0 auto;
      }

      .bottom-nav {
        max-width: 768px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  `]
})
export class MainComponent {
  currentTab: 'search' | 'notice' | 'org' | 'company' | 'mypage' = 'mypage';

  constructor(private router: Router) {}
} 