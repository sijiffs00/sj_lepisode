import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Industry {
  mainCategory: string;
  isExpanded: boolean;
  isSelected: boolean;
  subCategories: {
    name: string;
    isSelected: boolean;
  }[];
}

@Component({
  selector: 'app-industry-select',
  template: `
    <div class="industry-select-container">
      <!-- 헤더 -->
      <div class="header">
        <button class="back-button" (click)="goBack()">
          <span class="back-icon">〈</span>
        </button>
        <h1>업종 검색</h1>
      </div>

      <!-- 검색창 -->
      <div class="search-box">
        <input 
          type="text" 
          [(ngModel)]="searchKeyword" 
          placeholder="업종을 검색해주세요."
          (input)="onSearch()"
        >
        <img src="assets/icons/search.svg" alt="검색" class="search-icon">
      </div>

      <!-- 업종 목록 -->
      <div class="industry-list">
        <div *ngFor="let industry of filteredIndustries; let i = index" class="industry-item">
          <div class="main-category">
            <div class="category-header">
              <input 
                type="checkbox" 
                [checked]="industry.isSelected"
                (change)="toggleMainCategory(i)"
              >
              <span class="category-name">{{ industry.mainCategory }}</span>
            </div>
            <button 
              class="expand-button" 
              [class.expanded]="industry.isExpanded"
              (click)="toggleCategory(i)"
            >
              ∨
            </button>
          </div>
          
          <!-- 서브 카테고리 -->
          <div class="sub-categories" *ngIf="industry.isExpanded">
            <div *ngFor="let sub of industry.subCategories; let j = index" class="sub-category">
              <input 
                type="checkbox" 
                [checked]="sub.isSelected"
                (change)="toggleSubCategory(i, j)"
              >
              <span>{{ sub.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 선택된 업종 표시 -->
      <div class="selected-industries" *ngIf="getSelectedIndustries().length > 0">
        <p class="selected-count">선택한 업종 ({{ getSelectedIndustries().length }})</p>
        <div class="selected-tags">
          <div *ngFor="let selected of getSelectedIndustries()" class="tag">
            {{ selected.mainCategory }}
            <span *ngIf="selected.subCategory"> - {{ selected.subCategory }}</span>
            <button class="remove-tag" (click)="removeSelection(selected)">✕</button>
          </div>
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="bottom-buttons">
        <button class="reset-button" (click)="resetAll()">
          <img src="assets/icons/refresh.svg" alt="초기화">
          전체 초기화
        </button>
        <button 
          class="submit-button" 
          [disabled]="getSelectedIndustries().length === 0"
          (click)="onSubmit()"
        >
          등록
        </button>
      </div>
    </div>
  `,
  styles: [`
    .industry-select-container {
      background: #FFFFFF;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
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
    }

    .back-icon {
      font-size: 24px;
      color: #333333;
    }

    h1 {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      color: #333333;
    }

    .search-box {
      padding: 16px;
      position: relative;
    }

    .search-box input {
      width: 100%;
      padding: 12px 40px 12px 16px;
      border: 1px solid #EEEEEE;
      border-radius: 8px;
      font-size: 15px;
      background: #FAFAFA;
    }

    .search-icon {
      position: absolute;
      right: 28px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
    }

    .industry-list {
      flex: 1;
      padding: 0 16px;
    }

    .industry-item {
      margin-bottom: 8px;
    }

    .main-category {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: #FAFAFA;
      border-radius: 8px;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .category-name {
      font-weight: 500;
    }

    .expand-button {
      background: none;
      border: none;
      font-size: 18px;
      color: #666666;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .expand-button.expanded {
      transform: rotate(180deg);
    }

    .sub-categories {
      padding: 8px 12px;
    }

    .sub-category {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
    }

    .selected-industries {
      padding: 16px;
      border-top: 1px solid #F0F0F0;
      background: #FFFFFF;
    }

    .selected-count {
      font-size: 14px;
      color: #666666;
      margin: 0 0 12px 0;
    }

    .selected-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      background: #E8F7F6;
      border-radius: 100px;
      font-size: 14px;
      color: #5BBBB3;
    }

    .remove-tag {
      background: none;
      border: none;
      color: #5BBBB3;
      margin-left: 8px;
      cursor: pointer;
      padding: 0;
    }

    .bottom-buttons {
      padding: 16px;
      border-top: 1px solid #F0F0F0;
      display: flex;
      gap: 8px;
    }

    .reset-button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 16px;
      background: #FFFFFF;
      border: 1px solid #DDDDDD;
      border-radius: 8px;
      color: #666666;
      font-size: 16px;
      cursor: pointer;
    }

    .submit-button {
      flex: 1;
      padding: 16px;
      background: #5BBBB3;
      border: none;
      border-radius: 8px;
      color: #FFFFFF;
      font-size: 16px;
      cursor: pointer;
    }

    .submit-button:disabled {
      background: #DDDDDD;
      cursor: not-allowed;
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .industry-select-container {
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

      .search-box input {
        background: #2A2A2A;
        border-color: #333333;
        color: #FFFFFF;
      }

      .main-category {
        background: #2A2A2A;
      }

      .category-name {
        color: #FFFFFF;
      }

      .selected-industries {
        background: #1A1A1A;
        border-top-color: #333333;
      }

      .tag {
        background: #1A3534;
      }

      .bottom-buttons {
        border-top-color: #333333;
      }

      .reset-button {
        background: #2A2A2A;
        border-color: #333333;
        color: #999999;
      }
    }
  `]
})
export class IndustrySelectComponent {
  searchKeyword: string = '';
  industries: Industry[] = [
    {
      mainCategory: '제조업',
      isExpanded: false,
      isSelected: false,
      subCategories: [
        { name: '파이프', isSelected: false },
        { name: '스포츠 용품', isSelected: false },
        { name: '전자제품', isSelected: false },
        { name: '농기계', isSelected: false },
        { name: '자동제어 시스템', isSelected: false },
        { name: '교통시설', isSelected: false },
        { name: '복층유리/창호', isSelected: false },
        { name: '공조설비', isSelected: false },
        { name: 'AI 산업용 로봇', isSelected: false },
        { name: '조경 관리 용품', isSelected: false },
        { name: '자동차 부품', isSelected: false },
        { name: 'ESS 프레임/산업기계', isSelected: false },
        { name: '건설 자재', isSelected: false },
        { name: '광케이블/광통신', isSelected: false },
        { name: '드론', isSelected: false },
        { name: '농자재', isSelected: false },
        { name: '식품가공', isSelected: false }
      ]
    },
    {
      mainCategory: '도소매업',
      isExpanded: false,
      isSelected: false,
      subCategories: [
        { name: '유통', isSelected: false },
        { name: '자동차 부품', isSelected: false },
        { name: 'B2B 장수기', isSelected: false },
        { name: '광고', isSelected: false },
        { name: '비디오 콘텐츠', isSelected: false },
        { name: '전자상거래', isSelected: false }
      ]
    },
    {
      mainCategory: '서비스업',
      isExpanded: false,
      isSelected: false,
      subCategories: [
        { name: '건설팅', isSelected: false },
        { name: '문화콘텐츠', isSelected: false },
        { name: '골프용품', isSelected: false },
        { name: '조경 관리', isSelected: false },
        { name: '바이오의약품 연구', isSelected: false },
        { name: '광고 및 디자인', isSelected: false },
        { name: '건물 및 인력관리', isSelected: false },
        { name: '엔터테인먼트', isSelected: false }
      ]
    },
    {
      mainCategory: '정보통신업',
      isExpanded: false,
      isSelected: false,
      subCategories: [
        { name: '소프트웨어 개발 및 공급', isSelected: false },
        { name: 'AI/IoT 제품', isSelected: false },
        { name: 'IT 서비스', isSelected: false },
        { name: '지능형 교통 시스템', isSelected: false },
        { name: '물류플랫폼', isSelected: false }
      ]
    },
    {
      mainCategory: '건설업',
      isExpanded: false,
      isSelected: false,
      subCategories: [
        { name: '노무공사', isSelected: false },
        { name: '창호공사', isSelected: false },
        { name: '조경업', isSelected: false },
        { name: '정보통신 공사', isSelected: false }
      ]
    },
    {
      mainCategory: '농업',
      isExpanded: false,
      isSelected: false,
      subCategories: [
        { name: '농업시설 가공', isSelected: false },
        { name: '농업 유통', isSelected: false }
      ]
    }
  ];

  filteredIndustries: Industry[] = this.industries;

  constructor(private router: Router) {}

  toggleCategory(index: number) {
    this.industries[index].isExpanded = !this.industries[index].isExpanded;
    this.updateFilteredIndustries();
  }

  toggleMainCategory(index: number) {
    const industry = this.industries[index];
    industry.isSelected = !industry.isSelected;
    
    // 메인 카테고리 선택시 모든 서브카테고리도 같이 선택/해제
    industry.subCategories.forEach(sub => sub.isSelected = industry.isSelected);
    this.updateFilteredIndustries();
  }

  toggleSubCategory(mainIndex: number, subIndex: number) {
    const industry = this.industries[mainIndex];
    const subCategory = industry.subCategories[subIndex];
    subCategory.isSelected = !subCategory.isSelected;
    
    // 서브카테고리 상태에 따라 메인 카테고리 상태 업데이트
    industry.isSelected = industry.subCategories.every(sub => sub.isSelected);
    this.updateFilteredIndustries();
  }

  onSearch() {
    if (!this.searchKeyword.trim()) {
      this.filteredIndustries = this.industries;
      return;
    }

    const keyword = this.searchKeyword.toLowerCase();
    this.filteredIndustries = this.industries.filter(industry => {
      const matchMainCategory = industry.mainCategory.toLowerCase().includes(keyword);
      const matchSubCategories = industry.subCategories.some(sub => 
        sub.name.toLowerCase().includes(keyword)
      );
      return matchMainCategory || matchSubCategories;
    });
  }

  getSelectedIndustries() {
    const selected: { mainCategory: string; subCategory?: string }[] = [];
    
    this.industries.forEach(industry => {
      if (industry.isSelected) {
        selected.push({ mainCategory: industry.mainCategory });
      } else {
        industry.subCategories.forEach(sub => {
          if (sub.isSelected) {
            selected.push({
              mainCategory: industry.mainCategory,
              subCategory: sub.name
            });
          }
        });
      }
    });
    
    return selected;
  }

  removeSelection(selected: { mainCategory: string; subCategory?: string }) {
    const industry = this.industries.find(i => i.mainCategory === selected.mainCategory);
    if (!industry) return;

    if (selected.subCategory) {
      const subCategory = industry.subCategories.find(sub => sub.name === selected.subCategory);
      if (subCategory) {
        subCategory.isSelected = false;
      }
    } else {
      industry.isSelected = false;
      industry.subCategories.forEach(sub => sub.isSelected = false);
    }
    
    this.updateFilteredIndustries();
  }

  resetAll() {
    this.industries.forEach(industry => {
      industry.isSelected = false;
      industry.subCategories.forEach(sub => sub.isSelected = false);
    });
    this.updateFilteredIndustries();
  }

  updateFilteredIndustries() {
    this.filteredIndustries = [...this.industries];
  }

  goBack() {
    this.router.navigate(['/main/register-company']);
  }

  onSubmit() {
    const selectedIndustries = this.getSelectedIndustries();
    if (selectedIndustries.length > 0) {
      // 선택된 업종들을 문자열로 변환
      const industryString = selectedIndustries.map(industry => {
        return industry.subCategory 
          ? `${industry.mainCategory} - ${industry.subCategory}`
          : industry.mainCategory;
      }).join(', ');

      // 이전 페이지로 돌아가면서 선택된 업종 데이터 전달
      this.router.navigate(['/main/register-company'], {
        state: { selectedIndustry: industryString }
      });
    }
  }
} 