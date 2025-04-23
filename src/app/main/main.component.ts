import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  template: `
    <div class="main-container">
      <div class="logo-container">
        <img src="assets/gjva_logo.png" alt="GJVA 로고" class="logo-image">
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>

      <nav class="bottom-nav">
        <button class="nav-item" [class.active]="currentTab === 'search'" (click)="navigate('search')">
          <i class="nav-icon search-icon"></i>
          <span>통합검색</span>
        </button>
        <button class="nav-item" [class.active]="currentTab === 'members'" (click)="navigate('members')">
          <i class="nav-icon members-icon"></i>
          <span>회원소개</span>
        </button>
        <button class="nav-item" [class.active]="currentTab === 'org'" (click)="navigate('org')">
          <i class="nav-icon org-icon"></i>
          <span>조직도</span>
        </button>
        <button class="nav-item" [class.active]="currentTab === 'companies'" (click)="navigate('companies')">
          <i class="nav-icon company-icon"></i>
          <span>기업현황</span>
        </button>
        <button class="nav-item" [class.active]="currentTab === 'mypage'" (click)="navigate('mypage')">
          <i class="nav-icon mypage-icon"></i>
          <span>마이페이지</span>
        </button>
      </nav>
    </div>
  `,
  styles: [`
    .main-container {
      padding: 16px;
      max-width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .logo-container {
      text-align: center;
      margin-bottom: 16px;
    }

    .logo-image {
      max-width: 150px;
      height: auto;
    }

    .content {
      display: grid;
      gap: 16px;
    }

    .welcome-card {
      background: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .welcome-card h2 {
      color: #333;
      margin: 0 0 8px;
      font-size: clamp(16px, 4.5vw, 20px);
      word-break: keep-all;
    }

    .welcome-card p {
      color: #666;
      margin: 0;
      font-size: clamp(14px, 4vw, 16px);
      line-height: 1.5;
    }

    /* 터치 영역 최적화 */
    .welcome-card {
      min-height: 44px; /* 터치 영역 최소 크기 */
      touch-action: manipulation; /* 터치 최적화 */
    }

    /* 모바일 사파리 대응 */
    @supports (-webkit-touch-callout: none) {
      .main-container {
        padding-left: max(16px, env(safe-area-inset-left));
        padding-right: max(16px, env(safe-area-inset-right));
      }
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .welcome-card {
        background: #2a2a2a;
      }
      .welcome-card h2 {
        color: #fff;
      }
      .welcome-card p {
        color: #ddd;
      }
    }

    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      background: white;
      padding: 8px 0;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      border: none;
      background: none;
      padding: 8px;
      min-width: 64px;
      color: #666;
      font-size: 12px;
      cursor: pointer;
      transition: color 0.2s;
    }

    .nav-item.active {
      color: #5BBBB3;
    }

    .nav-icon {
      width: 24px;
      height: 24px;
      display: block;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    .search-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
    }

    .members-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>');
    }

    .org-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"/></svg>');
    }

    .company-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>');
    }

    .mypage-icon {
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>');
    }

    /* 모바일 사파리 하단 safe-area 대응 */
    @supports (-webkit-touch-callout: none) {
      .bottom-nav {
        padding-bottom: max(8px, env(safe-area-inset-bottom));
      }
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .bottom-nav {
        background: #2a2a2a;
      }
      
      .nav-item {
        color: #999;
      }

      .nav-item.active {
        color: #80CBC7;
      }
    }

    /* 컨텐츠가 하단 네비게이션에 가리지 않도록 패딩 추가 */
    .main-container {
      padding-bottom: calc(64px + env(safe-area-inset-bottom, 0px));
    }
  `]
})
export class MainComponent implements OnInit {
  currentTab = 'search';  // 기본 탭을 검색으로 변경
  userId: number | null = null;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    // 서비스에서 사용자 ID 가져오기
    this.userId = this.userService.getUserId();
    console.log('Main 컴포넌트에서 사용자 ID:', this.userId);

    // 사용자 ID 변경 구독
    this.userService.userId$.subscribe(id => {
      this.userId = id;
      console.log('사용자 ID 업데이트됨:', id);
    });
  }

  navigate(tab: string) {
    this.currentTab = tab;
    this.router.navigate(['/main', tab]);  // 중첩 라우팅을 위해 경로 수정
  }
} 