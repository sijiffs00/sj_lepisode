import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { createClient } from '@supabase/supabase-js';

interface Company {
  name: string;
  industry: string;
  department: string;
}

interface User {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  company_id: number;  // company 테이블과 연결하는 외래키 추가
  company: Company;
}

interface SupabaseUser {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  company: Company[];
}

@Component({
  selector: 'app-members',
  template: `
    <div class="members-container">
      <!-- 상단 헤더 (search 페이지와 동일) -->
      <div class="header">
        <img src="assets/gjva_logo.png" alt="GJVA 로고" class="logo">
        <h1 class="title">회원소개</h1>
      </div>
      
      <!-- 검색바 (search 페이지와 동일) -->
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

      <!-- 회원 목록 -->
      <div class="members-content">
        <div class="member-count">전체 {{ filteredUsers.length }}</div>
        
        <div class="member-list">
          <div *ngFor="let user of filteredUsers" class="member-item">
            <!-- 회원 이름과 직책 -->
            <div class="member-header">
              <h3 class="member-name">{{ user.name }} <span class="position">{{ user.position }}</span></h3>
            </div>
            
            <!-- 연락처 정보 -->
            <div class="member-contact">
              {{ user.phone }} · {{ user.email }}
            </div>
            
            <!-- 회사 정보 박스 -->
            <div class="company-info">
              <div class="company-logo">
                {{ user.company.name[0]?.toUpperCase() }}
              </div>
              <div class="company-details">
                <div class="company-position">
                  <span class="position">{{ user.position }}</span>
                  <span class="company-name">{{ user.company.name }}</span>
                </div>
                <div class="company-tags">
                  <span class="tag">{{ user.company.industry }}</span>
                  <span class="tag">{{ user.company.department }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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

    .members-container {
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

    .members-content {
      padding: 20px;
    }

    .member-count {
      font-size: 16px;
      color: #6B7280;
      margin-bottom: 20px;
    }

    .member-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .member-item {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .member-header {
      margin-bottom: 8px;
    }

    .member-name {
      font-size: 18px;
      color: #111827;
      font-weight: 600;
    }

    .member-contact {
      color: #4B5563;
      font-size: 14px;
      margin-bottom: 12px;
    }

    .company-info {
      background: rgba(52, 211, 153, 0.1);
      border-radius: 8px;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .company-logo {
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #10B981;
    }

    .company-details {
      flex: 1;
    }

    .company-position {
      margin-bottom: 4px;
    }

    .position {
      color: #10B981;
      font-weight: 500;
    }

    .company-name {
      color: #374151;
      margin-left: 8px;
    }

    .company-tags {
      display: flex;
      gap: 8px;
    }

    .tag {
      background: white;
      color: #10B981;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .members-container {
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

      .member-item {
        background: #2a2a2a;
      }

      .member-name {
        color: #e5e7eb;
      }

      .member-contact {
        color: #9CA3AF;
      }

      .company-name {
        color: #D1D5DB;
      }
    }
  `]
})
export class MembersComponent implements OnInit {
  searchQuery: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];
  private supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

  constructor() {}

  async ngOnInit() {
    try {
      console.log('데이터 가져오기 시작...');
      
      // users 테이블에서 데이터 가져오기
      const { data: users, error } = await this.supabase
        .from('users')
        .select(`
          *,
          company:companies!inner(*)
        `);

      if (error) {
        console.error('Supabase 에러:', error);
        throw error;
      }

      console.log('가져온 데이터:', users);

      if (!users || users.length === 0) {
        console.log('데이터가 없습니다.');
        return;
      }

      // 데이터 형식 변환
      this.users = users.map(user => ({
        id: user.id,
        name: user.name,
        position: user.position,
        phone: user.phone,
        email: user.email,
        company_id: user.company_id,
        company: {
          name: user.company.name,
          industry: user.company.industry,
          department: user.company.department
        }
      }));

      console.log('변환된 데이터:', this.users);
      this.filteredUsers = this.users;
      
    } catch (error) {
      console.error('회원 데이터를 가져오는데 실패했습니다:', error);
    }
  }

  handleSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = this.users;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.company.name.toLowerCase().includes(query) ||
      user.position.toLowerCase().includes(query) ||
      user.company.industry.toLowerCase().includes(query) ||
      user.company.department.toLowerCase().includes(query)
    );
  }
} 