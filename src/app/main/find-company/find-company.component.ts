import { Component } from '@angular/core';
import { supabase } from '../../supabase';

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
      <div class="header">
        <button class="back-button" (click)="goBack()">
          <span class="back-icon">〈</span>
        </button>
        <h1>기업찾기</h1>
      </div>

      <div class="search-container">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="상호명으로 검색"
            (keyup.enter)="search()"
          >
          <button class="search-button" (click)="search()">
            <img src="assets/icons/search.svg" alt="검색" class="search-icon">
          </button>
        </div>
      </div>

      <div class="empty-state" *ngIf="!hasSearched">
        <img src="assets/icons/search-big.svg" alt="검색" class="search-illustration">
        <p>기업명을 검색해주세요.</p>
      </div>

      <div class="results" *ngIf="hasSearched">
        <div class="no-results" *ngIf="searchResults.length === 0">
          <p>검색 결과가 없습니다.</p>
        </div>

        <div class="company-list" *ngIf="searchResults.length > 0">
          <div class="company-item" *ngFor="let company of searchResults">
            <div class="company-logo">
              <img [src]="company.logo_url || 'assets/default-company-logo.png'" alt="기업 로고">
            </div>
            <div class="company-info">
              <div class="company-name">{{ company.name }}</div>
              <div class="company-details">
                <span class="industry">{{ company.industry || '업종 미입력' }}</span>
                <span class="address">{{ company.address || '주소 미입력' }}</span>
              </div>
            </div>
          </div>
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
      text-align: center;
      padding: 40px 0;
      color: #999999;
    }

    .company-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .company-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: #FFFFFF;
      border: 1px solid #EEEEEE;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .company-item:hover {
      border-color: #5BBBB3;
    }

    .company-logo {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #EEEEEE;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .company-info {
      flex: 1;
    }

    .company-name {
      font-size: 16px;
      font-weight: 500;
      color: #333333;
      margin-bottom: 4px;
    }

    .company-details {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 13px;
      color: #666666;
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
        background: #2A2A2A;
        border-color: #333333;
      }

      .company-item:hover {
        border-color: #5BBBB3;
      }

      .company-name {
        color: #FFFFFF;
      }

      .company-details {
        color: #999999;
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
    }
  `]
})
export class FindCompanyComponent {
  searchQuery: string = '';
  hasSearched: boolean = false;
  isLoading: boolean = false;
  searchResults: CompanySearchResult[] = [];

  goBack() {
    window.history.back();
  }

  async search() {
    if (!this.searchQuery.trim()) return;

    try {
      this.isLoading = true;
      this.hasSearched = true;

      // Supabase에서 기업명으로 검색
      const { data, error } = await supabase
        .from('companies')
        .select('id, name, industry, address, logo_url')
        .ilike('name', `%${this.searchQuery}%`)
        .order('name');

      if (error) throw error;

      this.searchResults = data || [];
      
    } catch (error) {
      console.error('기업 검색 중 오류 발생:', error);
      this.searchResults = [];
    } finally {
      this.isLoading = false;
    }
  }
} 