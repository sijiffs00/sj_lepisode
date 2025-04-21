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
      <h1 class="search-title">통합 검색</h1>
      
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

      <div class="loading" *ngIf="isLoading">
        검색중...
      </div>

      <div class="search-results" *ngIf="!isLoading && searchResults.length > 0">
        <div class="result-item" *ngFor="let result of searchResults">
          <!-- 사용자 결과 -->
          <div class="result-content" *ngIf="result.type === 'user'">
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

          <!-- 기업 결과 -->
          <div class="result-content" *ngIf="result.type === 'company'">
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

      <div class="no-results" *ngIf="!isLoading && searchResults.length === 0 && hasSearched">
        검색 결과가 없습니다.
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .search-title {
      font-size: 32px;
      font-weight: 700;
      color: #333;
      margin-bottom: 40px;
    }

    .search-box {
      position: relative;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      border-radius: 100px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .search-input {
      width: 100%;
      padding: 20px 60px 20px 30px;
      border: none;
      font-size: 18px;
      color: #333;
      background: transparent;
    }

    .search-input::placeholder {
      color: #999;
    }

    .search-input:focus {
      outline: none;
    }

    .search-button {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
    }

    .search-icon {
      display: block;
      width: 24px;
      height: 24px;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666666"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .search-button:hover .search-icon {
      opacity: 1;
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .search-title {
        color: #fff;
      }

      .search-box {
        background: #2a2a2a;
      }

      .search-input {
        color: #fff;
      }

      .search-input::placeholder {
        color: #666;
      }

      .search-icon {
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
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
      background: #5BBBB3;
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

    .no-results {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .result-item {
        background: #2a2a2a;
      }

      .name {
        color: #fff;
      }

      .position, .company-name {
        color: #ccc;
      }

      .company-info {
        background: #333;
      }

      .tag {
        background: #333;
        color: #ccc;
      }
    }
  `]
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: SearchResult[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;
  private isSearching: boolean = false;  // 검색 중복 실행 방지를 위한 플래그

  async handleSearch() {
    if (this.isSearching) return;  // 이미 검색 중이면 중복 실행 방지
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
    this.searchResults = [];

    try {
      console.log('검색어:', this.searchQuery);

      // 먼저 users 테이블만 검색
      const { data: userOnly, error: userOnlyError } = await supabase
        .from('users')
        .select('id, name, position, contact, email, department, company_id')
        .ilike('name', `%${this.searchQuery}%`)
        .limit(10);

      console.log('사용자 기본 정보:', userOnly);

      if (userOnly && userOnly.length > 0) {
        // company 정보 따로 가져오기
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('id, name, industry')
          .eq('id', userOnly[0].company_id)
          .single();

        console.log('회사 정보:', companyData);

        // 검색 결과 변환
        const userResults: SearchResult[] = userOnly.map((user: any) => ({
          type: 'user' as const,
          id: user.id,
          name: user.name,
          position: user.position,
          contact: user.contact,
          email: user.email,
          company_name: companyData?.name,
          tags: [user.department, user.position].filter(Boolean)
        }));
        this.searchResults.push(...userResults);
      }

      // 회사 검색
      const { data: companies, error: companySearchError } = await supabase
        .from('companies')
        .select('*')
        .or(`name.ilike.%${this.searchQuery}%,industry.ilike.%${this.searchQuery}%,address.ilike.%${this.searchQuery}%`)
        .limit(10);

      if (companies) {
        const companyResults: SearchResult[] = companies.map(company => ({
          type: 'company' as const,
          id: company.id,
          name: company.name,
          industry: company.industry
        }));
        this.searchResults.push(...companyResults);
      }

      console.log('최종 검색 결과:', this.searchResults);

    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    } finally {
      this.isLoading = false;
    }
  }
} 