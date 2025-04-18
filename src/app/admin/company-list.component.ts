import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-list',
  template: `
    <div class="company-list-container">
      <div class="page-header">
        <h2>기업 목록</h2>
        <div class="header-actions">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="기업명 검색..." [(ngModel)]="searchTerm">
          </div>
          <button class="add-btn">
            <i class="fas fa-plus"></i> 신규 기업 등록
          </button>
        </div>
      </div>

      <div class="filter-section">
        <div class="filter-group">
          <label>상태:</label>
          <select [(ngModel)]="statusFilter">
            <option value="all">전체</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>
        </div>
        <div class="filter-group">
          <label>정렬:</label>
          <select [(ngModel)]="sortBy">
            <option value="name">기업명</option>
            <option value="date">등록일</option>
            <option value="members">구성원 수</option>
          </select>
        </div>
      </div>

      <div class="company-grid">
        <div class="company-card" *ngFor="let company of companies">
          <div class="company-logo">
            <img [src]="company.logoUrl || 'assets/default-company.png'" [alt]="company.name">
          </div>
          <div class="company-info">
            <h3>{{company.name}}</h3>
            <p class="company-type">{{company.type}}</p>
            <div class="company-details">
              <span><i class="fas fa-users"></i> {{company.memberCount}}명</span>
              <span><i class="fas fa-calendar"></i> {{company.joinDate | date:'yyyy.MM.dd'}}</span>
            </div>
            <div class="status-badge" [class.active]="company.status === 'active'">
              {{company.status === 'active' ? '활성' : '비활성'}}
            </div>
          </div>
          <div class="company-actions">
            <button class="action-btn view">
              <i class="fas fa-eye"></i> 상세보기
            </button>
            <button class="action-btn edit">
              <i class="fas fa-pen"></i> 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .company-list-container {
      padding: 20px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .page-header h2 {
      font-size: 24px;
      color: #2c3e50;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .search-box {
      position: relative;
      width: 300px;
    }

    .search-box i {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #95a5a6;
    }

    .search-box input {
      width: 100%;
      padding: 10px 10px 10px 35px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }

    .add-btn {
      background: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.3s;
    }

    .add-btn:hover {
      background: #2980b9;
    }

    .filter-section {
      display: flex;
      gap: 20px;
      margin-bottom: 24px;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filter-group label {
      color: #666;
    }

    .filter-group select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 6px;
      background: white;
    }

    .company-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .company-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .company-card:hover {
      transform: translateY(-2px);
    }

    .company-logo {
      width: 80px;
      height: 80px;
      margin-bottom: 16px;
    }

    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    .company-info h3 {
      margin: 0 0 4px 0;
      color: #2c3e50;
      font-size: 18px;
    }

    .company-type {
      color: #7f8c8d;
      font-size: 14px;
      margin: 0 0 12px 0;
    }

    .company-details {
      display: flex;
      gap: 16px;
      margin-bottom: 12px;
    }

    .company-details span {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #666;
      font-size: 14px;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      background: #e74c3c;
      color: white;
      margin-bottom: 16px;
    }

    .status-badge.active {
      background: #2ecc71;
    }

    .company-actions {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 13px;
      transition: background 0.3s;
    }

    .action-btn.view {
      background: #f8f9fa;
      color: #2c3e50;
    }

    .action-btn.view:hover {
      background: #e9ecef;
    }

    .action-btn.edit {
      background: #e9ecef;
      color: #2c3e50;
    }

    .action-btn.edit:hover {
      background: #dee2e6;
    }
  `]
})
export class CompanyListComponent implements OnInit {
  searchTerm = '';
  statusFilter = 'all';
  sortBy = 'name';

  // 임시 데이터
  companies = [
    {
      name: '(주)테크스타트',
      type: 'IT 서비스',
      memberCount: 25,
      joinDate: new Date('2023-01-15'),
      status: 'active',
      logoUrl: null
    },
    {
      name: '미래솔루션',
      type: '소프트웨어 개발',
      memberCount: 15,
      joinDate: new Date('2023-03-22'),
      status: 'active',
      logoUrl: null
    },
    {
      name: '스마트테크',
      type: '시스템 통합',
      memberCount: 8,
      joinDate: new Date('2023-06-10'),
      status: 'inactive',
      logoUrl: null
    }
  ];

  constructor() {}

  ngOnInit() {
    // 여기에 기업 목록을 불러오는 로직이 들어갈 거야
  }
} 