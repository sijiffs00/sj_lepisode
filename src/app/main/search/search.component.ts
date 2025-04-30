import { Component } from '@angular/core';
import { supabase } from '../../supabase';

interface User {
  id: string;
  name: string;
  position?: string;
  contact?: string;
  email?: string;
  department?: string;
  company?: {
    name: string;
    industry: string;
  } | null;
}

interface Company {
  id: string;
  name: string;
  industry: string;
}

interface SearchResult {
  type: 'user' | 'company';
  id: string;
  name: string;
  position?: string;
  contact?: string;
  email?: string;
  company_name?: string;
  industry?: string;
  tags?: string[];
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

          <div class="result-item" *ngFor="let result of userResults">
            <div class="result-content">
              <div class="result-header">
                <div class="avatar">
                  {{ result.name[0] }}
                </div>
                <div class="main-info">
                  <div class="name-position">
                    <span class="name">{{ result.name }}</span>
                    <span class="position" *ngIf="result.position">{{ result.position }}</span>
                  </div>
                  <div class="contact-info">
                    {{ result.contact }} · {{ result.email }}
                  </div>
                </div>
              </div>
              <div class="company-info" *ngIf="result.company_name">
                <div class="company-logo">
                  <!-- 회사 로고는 나중에 추가 -->
                </div>
                <div class="company-name">{{ result.company_name }}</div>
                <div class="company-position">{{ result.position }}</div>
              </div>
              <div class="tags" *ngIf="result.tags && result.tags.length > 0">
                <span class="tag" *ngFor="let tag of result.tags">{{ tag }}</span>
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

          <div class="result-item" *ngFor="let result of companyResults">
            <div class="result-content">
              <div class="company-header">
                <div class="company-logo">
                  <!-- 회사 로고는 나중에 추가 -->
                </div>
                <div class="company-info">
                  <div class="company-name">{{ result.name }}</div>
                  <div class="company-industry">{{ result.industry }}</div>
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
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .position {
      color: #666;
      font-size: 14px;
    }

    .contact-info {
      color: #999;
      font-size: 14px;
    }

    .company-info {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 8px;
      margin-bottom: 16px;
    }

    .company-logo {
      width: 32px;
      height: 32px;
      background: #eee;
      border-radius: 4px;
    }

    .company-name {
      font-weight: 500;
      color: #333;
    }

    .company-position {
      color: #666;
      font-size: 14px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag {
      padding: 6px 12px;
      background: #f1f3f5;
      border-radius: 100px;
      font-size: 14px;
      color: #666;
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
      const { data: userOnly, error: userOnlyError } = await supabase
        .from('users')
        .select('id, name, position, contact, email, department, company_id')
        .ilike('name', `%${this.searchQuery}%`)
        .limit(10);

      if (userOnly && userOnly.length > 0) {
        // company 정보 따로 가져오기
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('id, name, industry')
          .eq('id', userOnly[0].company_id)
          .single();

        // 사용자 검색 결과 변환
        this.userResults = userOnly.map((user: any) => ({
          type: 'user' as const,
          id: user.id,
          name: user.name,
          position: user.position,
          contact: user.contact,
          email: user.email,
          company_name: companyData?.name,
          tags: [user.department, user.position].filter(Boolean)
        }));
      }

      // 회사 검색
      const { data: companies, error: companySearchError } = await supabase
        .from('companies')
        .select('*')
        .or(`name.ilike.%${this.searchQuery}%,industry.ilike.%${this.searchQuery}%,address.ilike.%${this.searchQuery}%`)
        .limit(10);

      if (companies) {
        this.companyResults = companies.map(company => ({
          type: 'company' as const,
          id: company.id,
          name: company.name,
          industry: company.industry
        }));
      }

    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    } finally {
      this.isLoading = false;
    }
  }
} 