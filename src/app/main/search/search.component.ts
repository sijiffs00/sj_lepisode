import { Component } from '@angular/core';
import { supabase } from '../../supabase';

interface User {
  id: string;
  name: string;
  position?: string;
  contact?: string;
  email?: string;
  department?: string;
  company_id?: string;
  company?: {
    id: string;
    name: string;
    industry: string;
  };
}

interface Company {
  id: string;
  name: string;
  industry: string;
  address?: string;
}

interface SearchResult {
  type: 'user' | 'company';
  id: string;
  name: string;
  position?: string;
  contact?: string;
  email?: string;
  department?: string;
  company?: {
    name: string;
    industry: string;
  };
  ceo_name?: string;
  logo_url?: string;
  industry?: string;
  address?: string;
  homepage_url?: string;
}

@Component({
  selector: 'app-search',
  template: `
    <div class="search-container">
      <div class="header">
        <img src="assets/gjva_logo.png" alt="GJVA 로고" class="logo">
        <h1 class="title">통합 검색</h1>
      </div>
      
      <div class="search-box">
        <input 
          type="text" 
          class="search-input" 
          placeholder="검색어를 입력해 주세요."
          [(ngModel)]="searchQuery"
          (keydown.enter)="$event.preventDefault(); handleSearch()"
        >
        <button class="search-button" (click)="handleSearch()">
          <i class="search-icon"></i>
        </button>
      </div>

      <div class="search-results" *ngIf="!isLoading && hasSearched">
        <!-- 회원 섹션 -->
        <div class="section">
          <div class="section-header">
            <h2 class="section-title">회원 <span class="count">{{ userResults.length }}</span></h2>
          </div>
          
          <div class="no-results" *ngIf="userResults.length === 0">
            회원 검색결과가 없습니다.
          </div>

          <div class="result-card" *ngFor="let result of userResults">
            <!-- 회원 정보 -->
            <div class="user-info">
              <div class="name-position">
                <span class="name">{{ result.name }}</span>
                <span class="position" *ngIf="result.position">{{ result.position }}</span>
              </div>
              <div class="contact-info">
                <ng-container *ngIf="result.contact || result.email">
                  <span class="phone" *ngIf="result.contact">{{ result.contact }}</span>
                  <span class="dot" *ngIf="result.contact && result.email">·</span>
                  <span class="email" *ngIf="result.email">{{ result.email }}</span>
                </ng-container>
              </div>
            </div>

            <!-- 기업 정보 (민트색 박스) -->
            <div class="company-info" *ngIf="result.company">
              <div class="company-logo">
                <div class="logo-circle">
                  {{ (result.company.name && result.company.name[0]) ? result.company.name[0].toUpperCase() : '' }}
                </div>
              </div>
              <div class="company-details">
                <div class="company-title">
                  <span class="role">{{ result.position || '대표' }}</span>
                  <span class="company-name">{{ result.company.name }}</span>
                </div>
                <div class="company-tags">
                  <span class="tag">{{ result.company.industry }}</span>
                  <span class="tag" *ngIf="result.department">{{ result.department }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 기업 섹션 -->
        <div class="section">
          <div class="section-header">
            <h2 class="section-title">기업 <span class="count">{{ companyResults.length }}</span></h2>
          </div>

          <div class="no-results" *ngIf="companyResults.length === 0">
            기업 검색결과가 없습니다.
          </div>

          <div class="result-card" *ngFor="let result of companyResults">
            <div class="company-header">
              <div class="company-logo">
                <div class="logo-circle" *ngIf="!result.logo_url">
                  {{ result.name[0] }}
                </div>
                <img *ngIf="result.logo_url" [src]="result.logo_url" alt="회사 로고" class="company-logo-img">
              </div>
              <div class="company-info">
                <div class="company-name">{{ result.name }}</div>
                <div class="company-details">
                  <span class="industry">{{ result.industry }}</span>
                  <span class="dot" *ngIf="result.industry && result.address">·</span>
                  <span class="address" *ngIf="result.address">{{ result.address }}</span>
                </div>
                <div class="company-extra" *ngIf="result.ceo_name || result.homepage_url">
                  <span class="ceo" *ngIf="result.ceo_name">대표: {{ result.ceo_name }}</span>
                  <a *ngIf="result.homepage_url" [href]="result.homepage_url" target="_blank" class="homepage">홈페이지</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="loading" *ngIf="isLoading">
        검색중...
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

    .search-container {
      min-height: 100vh;
      background-color: white;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    .header {
      background-color: #0891B2;
      padding: 20px;
      width: 100%;
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

    .search-box {
      position: relative;
      width: calc(100% - 40px);
      margin: 20px auto;
      background: #fff;
      border-radius: 100px;
      border: 1px solid #E5E7EB;
      overflow: hidden;
      box-shadow: none;
    }

    .search-input {
      width: 100%;
      padding: 12px 50px 12px 20px;
      border: none;
      font-size: 16px;
      color: #333;
      background: transparent;
    }

    .search-input::placeholder {
      color: #9CA3AF;
    }

    .search-input:focus {
      outline: none;
    }

    .search-button {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .search-icon {
      display: block;
      width: 20px;
      height: 20px;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239CA3AF"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 1;
      transition: opacity 0.2s;
    }

    .search-button:hover .search-icon {
      opacity: 0.8;
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .search-container {
        background: #1a1a1a;
      }

      .search-box {
        background: #2a2a2a;
        border-color: #374151;
      }

      .search-input {
        color: #fff;
      }

      .search-input::placeholder {
        color: #6B7280;
      }

      .search-icon {
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236B7280"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
      }
    }

    .loading {
      text-align: center;
      padding: 20px;
      color: #666;
    }

    .search-results {
      margin-top: 40px;
    }

    .result-item {
      background: #fff;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .result-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .avatar {
      width: 48px;
      height: 48px;
      background: #0891B2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      font-weight: 600;
    }

    .main-info {
      flex: 1;
    }

    .name-position {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .name {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
    }

    .position {
      font-size: 16px;
      color: #6B7280;
      margin-left: 4px;
    }

    .contact-info {
      color: #9CA3AF;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dot {
      color: #D1D5DB;
    }

    .company-info {
      background: rgba(52, 211, 153, 0.1);
      border-radius: 8px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 12px;
    }

    .company-logo {
      flex-shrink: 0;
    }

    .logo-circle {
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #10B981;
      font-size: 16px;
      text-transform: uppercase;
      border: 1px solid #E5E7EB;
    }

    .company-details {
      flex: 1;
    }

    .company-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .role {
      font-size: 14px;
      color: #374151;
    }

    .company-name {
      font-size: 14px;
      color: #111827;
      font-weight: 500;
    }

    .company-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag {
      background: white;
      color: #10B981;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 13px;
      border: 1px solid #E5E7EB;
    }

    .section {
      margin-bottom: 40px;
    }

    .section-header {
      padding: 0 20px;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .count {
      font-size: 16px;
      color: #6B7280;
    }

    .no-results {
      text-align: center;
      padding: 20px;
      color: #6B7280;
      background: #F9FAFB;
      border-radius: 8px;
      margin: 0 20px;
      font-size: 14px;
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .section-title {
        color: #F9FAFB;
      }

      .count {
        color: #9CA3AF;
      }

      .no-results {
        background: #1F2937;
        color: #9CA3AF;
      }
    }

    .result-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .user-info {
      margin-bottom: 16px;
    }

    .name-position {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .name {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
    }

    .position {
      font-size: 16px;
      color: #6B7280;
      margin-left: 4px;
    }

    .contact-info {
      color: #9CA3AF;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dot {
      color: #D1D5DB;
    }

    .company-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .company-logo {
      width: 32px;
      height: 32px;
      background: #eee;
      border-radius: 4px;
    }

    .company-info {
      flex: 1;
    }

    .company-name {
      font-weight: 500;
      color: #333;
    }

    .company-details {
      flex: 1;
    }

    .industry {
      color: #666;
      font-size: 14px;
    }

    .dot {
      margin: 0 8px;
    }

    .address {
      color: #999;
      font-size: 14px;
    }

    .company-extra {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ceo {
      color: #666;
      font-size: 14px;
    }

    .homepage {
      color: #0891B2;
      font-size: 14px;
      text-decoration: none;
    }

    .company-logo-img {
      width: 32px;
      height: 32px;
      border-radius: 4px;
    }
  `]
})
export class SearchComponent {
  searchQuery: string = '';
  userResults: SearchResult[] = [];
  companyResults: SearchResult[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;
  private isSearching: boolean = false;

  async handleSearch() {
    if (this.isSearching) return;
    this.isSearching = true;
    
    try {
      await this.onSearch();
    } finally {
      this.isSearching = false;
    }
  }

  async onSearch() {
    if (!this.searchQuery.trim()) return;

    this.isLoading = true;
    this.hasSearched = true;
    this.userResults = [];
    this.companyResults = [];

    try {
      // 사용자 검색
      const { data: users, error: userError } = await supabase
        .from('users')
        .select(`
          id, 
          name, 
          position, 
          contact, 
          email, 
          department,
          company_id,
          companies!inner (
            id,
            name,
            industry
          )
        `)
        .or(`name.ilike.%${this.searchQuery}%,email.ilike.%${this.searchQuery}%,department.ilike.%${this.searchQuery}%`)
        .limit(10);

      if (userError) {
        console.error('사용자 검색 오류:', userError);
        throw userError;
      }

      if (users) {
        this.userResults = users.map((user: any) => ({
          type: 'user',
          id: user.id,
          name: user.name,
          position: user.position,
          contact: user.contact,
          email: user.email,
          department: user.department,
          company: user.companies ? {
            name: user.companies.name,
            industry: user.companies.industry
          } : undefined
        }));
      }

      console.log('검색된 사용자:', this.userResults); // 디버깅용 로그

      // 기업 검색
      const { data: companies, error: companyError } = await supabase
        .from('companies')
        .select(`
          id,
          name,
          ceo_name,
          logo_url,
          industry,
          address,
          homepage_url
        `)
        .ilike('name', `%${this.searchQuery}%`)
        .limit(10);

      console.log('기업 검색 결과:', companies); // 디버깅용 로그 추가

      if (companyError) {
        console.error('기업 검색 오류:', companyError);
        throw companyError;
      }

      if (companies && companies.length > 0) {
        this.companyResults = companies.map(company => ({
          type: 'company',
          id: company.id,
          name: company.name,
          ceo_name: company.ceo_name,
          logo_url: company.logo_url,
          industry: company.industry,
          address: company.address,
          homepage_url: company.homepage_url
        }));
      } else {
        // 회사 이름으로 검색 결과가 없으면 산업분야나 대표자 이름으로 검색
        const { data: companiesByOther, error: otherError } = await supabase
          .from('companies')
          .select(`
            id,
            name,
            ceo_name,
            logo_url,
            industry,
            address,
            homepage_url
          `)
          .or(`industry.ilike.%${this.searchQuery}%,ceo_name.ilike.%${this.searchQuery}%`)
          .limit(10);

        if (otherError) {
          console.error('기업 추가 검색 오류:', otherError);
          throw otherError;
        }

        if (companiesByOther && companiesByOther.length > 0) {
          this.companyResults = companiesByOther.map(company => ({
            type: 'company',
            id: company.id,
            name: company.name,
            ceo_name: company.ceo_name,
            logo_url: company.logo_url,
            industry: company.industry,
            address: company.address,
            homepage_url: company.homepage_url
          }));
        }
      }

    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    } finally {
      this.isLoading = false;
    }
  }
} 