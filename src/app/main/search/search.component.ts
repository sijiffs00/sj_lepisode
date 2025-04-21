import { Component } from '@angular/core';

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
          (keyup.enter)="onSearch()"
        >
        <button class="search-button" (click)="onSearch()">
          <i class="search-icon"></i>
        </button>
      </div>

      <!-- 검색 결과는 나중에 여기에 표시될 거야 -->
      <div class="search-results" *ngIf="searchResults.length > 0">
        <!-- 검색 결과 컴포넌트가 들어갈 자리 -->
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
  `]
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  onSearch() {
    // 여기에 나중에 검색 기능을 구현할 거야!
    console.log('검색어:', this.searchQuery);
  }
} 