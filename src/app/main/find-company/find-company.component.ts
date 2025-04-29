import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../../supabase';
import { UserService } from '../../services/user.service';
import { UserInfo } from '../../interfaces/user.interface';

interface CompanySearchResult {
  id: string;
  name: string;
  industry: string;
  address: string;
  logo_url?: string;
}

@Component({
  selector: 'app-find-company',
  template: `
    <div class="find-company-container">
      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <div class="header">
        <button class="back-button" (click)="goBack()">
          <span class="back-icon">〈</span>
        </button>
        <h1>기업찾기</h1>
      </div>

      <div class="user-info" *ngIf="userInfo">
        <p>{{ userInfo.name }}님, 찾으시는 기업을 검색해주세요.</p>
      </div>

      <div class="search-container">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="상호명으로 검색"
            (keyup.enter)="search()"
          >
          <button *ngIf="searchQuery" class="clear-button" (click)="clearSearch()">
            <img src="assets/icons/close.svg" alt="지우기" class="close-icon">
          </button>
          <button class="search-button" (click)="search()">
            <img src="assets/icons/search.svg" alt="검색" class="search-icon">
          </button>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="empty-state" *ngIf="!hasSearched">
          <img src="assets/icons/search-big.svg" alt="검색" class="search-illustration">
          <p>기업명을 검색해주세요.</p>
        </div>

        <div class="results" *ngIf="hasSearched">
          <div class="no-results" *ngIf="searchResults.length === 0">
            <img src="assets/icons/document.svg" alt="문서" class="no-results-icon">
            <p class="no-results-text">'{{ searchQuery }}' 검색결과가 없습니다.</p>
          </div>

          <div class="company-list" *ngIf="searchResults.length > 0">
            <div class="company-item" *ngFor="let company of searchResults">
              <div class="company-logo">
                <img [src]="company.logo_url || 'assets/default-company-logo.png'" alt="기업 로고">
              </div>
              <div class="company-info">
                <div class="company-name">{{ company.name }}</div>
                <div class="company-phone">12-345-12345</div>
                <div class="company-details">
                  <div class="detail-item">
                    <img src="assets/icons/industry.svg" alt="업종" class="detail-icon">
                    <span>{{ company.industry || '도소매/엔터/전자상거래' }}</span>
                  </div>
                  <div class="detail-item">
                    <img src="assets/icons/location.svg" alt="위치" class="detail-icon">
                    <span>{{ company.address || '광주광역시 북구 용주로 30번길 33 0아트캐슬 203호 ~ 204호' }}</span>
                  </div>
                </div>
                <button class="join-button" (click)="joinCompany(company)" [disabled]="isJoining">
                  {{ isJoining ? '처리중...' : '가입신청' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-register" *ngIf="searchResults.length === 0 && hasSearched">
        <div class="register-content">
          <p class="prompt-text">등록된 기업이 없으신가요?</p>
          <button class="register-button" (click)="goToRegister()">
            <span class="plus-icon">+</span>
            기업 등록
          </button>
        </div>
      </div>

      <div class="loading" *ngIf="isLoading">
        <div class="loading-spinner"></div>
        <p>검색 중...</p>
      </div>
    </div>
  `,
  styles: [`
    .find-company-container {
      background: #FFFFFF;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .content-wrapper {
      flex: 1;
      padding-bottom: 80px;
    }

    .header {
      display: flex;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #F0F0F0;
      position: sticky;
      top: 0;
      background: #FFFFFF;
      z-index: 10;
    }

    .back-button {
      background: none;
      border: none;
      padding: 0;
      margin-right: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .back-icon {
      font-size: 24px;
      color: #333333;
      line-height: 1;
    }

    h1 {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      color: #333333;
    }

    .search-container {
      padding: 16px;
    }

    .search-box {
      position: relative;
      width: 100%;
    }

    input {
      width: 100%;
      padding: 12px 40px 12px 16px;
      border: 1px solid #EEEEEE;
      border-radius: 8px;
      font-size: 15px;
      outline: none;
      background: #FAFAFA;
      color: #333333;
    }

    input::placeholder {
      color: #999999;
    }

    .search-button {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .search-icon {
      width: 20px;
      height: 20px;
      opacity: 0.4;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 120px;
    }

    .search-illustration {
      width: 48px;
      height: 48px;
      margin-bottom: 12px;
      opacity: 0.2;
    }

    .empty-state p {
      font-size: 15px;
      color: #999999;
      margin: 0;
    }

    .results {
      padding: 0 16px;
    }

    .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 120px;
      text-align: center;
    }

    .no-results-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      opacity: 0.3;
    }

    .no-results-text {
      font-size: 15px;
      color: #666666;
      margin: 0;
    }

    .bottom-register {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #FFFFFF;
      border-top: 1px solid #EEEEEE;
      padding: 16px;
    }

    .register-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 500px;
      margin: 0 auto;
      width: 100%;
    }

    .prompt-text {
      font-size: 14px;
      color: #666666;
      margin: 0;
    }

    .register-button {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      border: 1px solid #5BBBB3;
      border-radius: 100px;
      background: #FFFFFF;
      color: #5BBBB3;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .plus-icon {
      margin-right: 4px;
      font-size: 16px;
      font-weight: 400;
    }

    .register-button:hover {
      background: #F5FFFE;
    }

    .company-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .company-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 24px 16px;
      background: #FFFFFF;
      border-bottom: 1px solid #EEEEEE;
      cursor: pointer;
      transition: all 0.2s;
    }

    .company-item:last-child {
      border-bottom: none;
    }

    .company-logo {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #EEEEEE;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      flex-shrink: 0;
    }

    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .company-info {
      flex: 1;
      min-width: 0;
    }

    .company-name {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 4px;
    }

    .company-phone {
      font-size: 14px;
      color: #666666;
      margin-bottom: 8px;
    }

    .company-details {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #666666;
    }

    .detail-icon {
      width: 16px;
      height: 16px;
      opacity: 0.6;
    }

    .join-button {
      width: 100%;
      padding: 12px;
      background: #FFFFFF;
      color: #5BBBB3;
      border: 1px solid #5BBBB3;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .join-button:hover {
      background: #F5FFFE;
    }

    .loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #5BBBB3;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    .loading p {
      color: #666666;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .clear-button {
      position: absolute;
      right: 48px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-icon {
      width: 20px;
      height: 20px;
      opacity: 0.4;
    }

    .error-message {
      background-color: #ffebee;
      color: #c62828;
      padding: 12px;
      margin: 8px;
      border-radius: 4px;
      text-align: center;
    }

    .user-info {
      padding: 16px;
      color: #666;
      font-size: 14px;
      text-align: center;
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .find-company-container {
        background: #1A1A1A;
      }

      .header {
        background: #1A1A1A;
        border-bottom-color: #333333;
      }

      .back-icon {
        color: #FFFFFF;
      }

      h1 {
        color: #FFFFFF;
      }

      input {
        background: #2A2A2A;
        border-color: #333333;
        color: #FFFFFF;
      }

      input::placeholder {
        color: #666666;
      }

      .company-item {
        background: #1A1A1A;
        border-bottom-color: #333333;
      }

      .company-logo {
        background: #2A2A2A;
        border-color: #333333;
      }

      .company-name {
        color: #FFFFFF;
      }

      .company-phone {
        color: #999999;
      }

      .detail-item {
        color: #999999;
      }

      .join-button {
        background: #2A2A2A;
        color: #5BBBB3;
        border-color: #5BBBB3;
      }

      .join-button:hover {
        background: rgba(91, 187, 179, 0.1);
      }

      .loading {
        background: rgba(0, 0, 0, 0.8);
      }

      .loading-spinner {
        border-color: #333333;
        border-top-color: #5BBBB3;
      }

      .loading p {
        color: #FFFFFF;
      }

      .bottom-register {
        background: #1A1A1A;
        border-top-color: #333333;
      }

      .no-results-text,
      .prompt-text {
        color: #999999;
      }
    }
  `]
})
export class FindCompanyComponent implements OnInit {
  searchQuery: string = '';
  hasSearched: boolean = false;
  isLoading: boolean = false;
  searchResults: CompanySearchResult[] = [];
  userInfo: UserInfo | null = null;
  userId: number | null = null;
  errorMessage: string = '';
  isJoining: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.userService.setUserId(this.userId);
    } else {
      this.userId = this.userService.getUserId();
    }
    
    if (this.userId) {
      this.loadUserInfo();
    } else {
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

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', this.userId)
        .single();

      if (userError) throw userError;

      this.userInfo = userData;
      console.log('사용자 정보 로드됨:', this.userInfo);
      
    } catch (error) {
      console.error('정보 로드 중 오류:', error);
      this.errorMessage = '정보를 불러오는 중 오류가 발생했습니다.';
    } finally {
      this.isLoading = false;
    }
  }

  goBack() {
    this.router.navigate(['/main/mypage']);
  }

  clearSearch() {
    this.searchQuery = '';
    this.hasSearched = false;
    this.searchResults = [];
  }

  async search() {
    if (!this.searchQuery.trim()) return;

    try {
      this.isLoading = true;
      this.errorMessage = '';

      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .ilike('name', `%${this.searchQuery}%`);

      if (error) throw error;

      this.searchResults = data || [];
      this.hasSearched = true;

    } catch (error) {
      console.error('검색 중 오류:', error);
      this.errorMessage = '검색 중 오류가 발생했습니다.';
    } finally {
      this.isLoading = false;
    }
  }

  goToRegister() {
    if (!this.userInfo) {
      this.errorMessage = '사용자 정보를 불러올 수 없습니다.';
      return;
    }
    this.router.navigate(['/main/register-company']);
  }

  async joinCompany(company: CompanySearchResult) {
    if (!this.userInfo || !this.userId) {
      this.errorMessage = '사용자 정보를 불러올 수 없습니다.';
      return;
    }

    try {
      this.isJoining = true;
      this.errorMessage = '';

      // 이미 회사에 소속되어 있는지 확인
      if (this.userInfo.company_id) {
        this.errorMessage = '이미 다른 기업에 소속되어 있습니다.';
        return;
      }

      // 사용자의 company_id 업데이트
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          company_id: company.id,
          auth_status: 'pending'  // 승인 대기 상태로 설정
        })
        .eq('id', this.userId);

      if (updateError) throw updateError;

      // 성공 메시지 표시
      alert(`${company.name}에 가입 신청이 완료되었습니다.\n관리자 승인 후 이용하실 수 있습니다.`);
      
      // 마이페이지로 리다이렉트
      this.router.navigate(['/main/mypage']);

    } catch (error) {
      console.error('기업 가입 신청 중 오류:', error);
      this.errorMessage = '기업 가입 신청 중 오류가 발생했습니다.';
    } finally {
      this.isJoining = false;
    }
  }
} 