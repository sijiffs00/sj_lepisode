import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService, Company } from '../../../services/company.service';

interface CompanyMember {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  company_id: string;
  department?: string;
}

@Component({
  selector: 'app-company-detail',
  template: `
    <div class="company-detail-container" *ngIf="company">
      <!-- 기업 정보 영역 -->
      <div class="company-header">
        <div class="company-logo">
          <img *ngIf="company.logo_url" [src]="company.logo_url" alt="{{ company.name }} 로고">
          <div *ngIf="!company.logo_url" class="placeholder-logo">{{ company.name[0] }}</div>
        </div>
        <div class="company-info">
          <h1>{{ company.name }}</h1>
          <p class="company-phone">{{ getCompanyPhone(company) }}</p>
          <p class="company-address">{{ company.address }}</p>
          <p class="company-industry">{{ company.industry || '업종 정보 없음' }}</p>
        </div>
      </div>
      
      <!-- 구성원 제목 영역 -->
      <div class="members-header">
        <h2>구성원 <span class="count">({{ members.length }})</span></h2>
      </div>
      
      <!-- 구성원 목록 -->
      <div class="members-list">
        <div *ngFor="let member of members" class="member-card">
          <div class="member-info">
            <p class="member-name">{{ member.name }} <span class="position">{{ member.position }}</span></p>
            <p class="member-phone">
              <span class="icon">📞</span> {{ member.phone }}
            </p>
            <p class="member-email">
              <span class="icon">📧</span> {{ member.email }}
            </p>
          </div>
        </div>
        
        <!-- 데이터 없을 때 -->
        <div *ngIf="members.length === 0 && !isLoading" class="no-members">
          등록된 구성원이 없습니다.
        </div>
        
        <!-- 로딩 중 -->
        <div *ngIf="isLoading" class="loading">
          구성원 정보를 불러오는 중...
        </div>
      </div>
    </div>
  `,
  styles: [`
    .company-detail-container {
      padding: 16px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .company-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 24px;
      padding: 16px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .company-logo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f1f1f1;
      border: 1px solid #e0e0e0;
    }
    
    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .placeholder-logo {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e1e1e1;
      color: #555;
      font-size: 30px;
      font-weight: bold;
    }
    
    .company-info {
      flex: 1;
    }
    
    .company-info h1 {
      margin: 0 0 8px 0;
      font-size: 24px;
      color: #333;
    }
    
    .company-phone, .company-address, .company-industry {
      margin: 4px 0;
      font-size: 14px;
      color: #666;
    }
    
    .members-header {
      background: #f5f5f5;
      padding: 12px 16px;
      margin: 0 -16px 16px -16px;
    }
    
    .members-header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: #333;
    }
    
    .count {
      color: #4B96B4;
    }
    
    .members-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .member-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }
    
    .member-name {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #333;
    }
    
    .position {
      font-weight: normal;
      color: #666;
      margin-left: 6px;
    }
    
    .member-phone, .member-email {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 6px 0;
      font-size: 14px;
      color: #555;
    }
    
    .icon {
      font-size: 16px;
    }
    
    .no-members, .loading {
      padding: 20px;
      text-align: center;
      color: #666;
      background: white;
      border-radius: 12px;
    }
    
    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .company-header, .member-card {
        background: #2a2a2a;
      }
      
      .company-info h1, .member-name {
        color: #fff;
      }
      
      .company-phone, .company-address, .company-industry, 
      .member-phone, .member-email {
        color: #ccc;
      }
      
      .members-header {
        background: #222;
      }
      
      .members-header h2 {
        color: #eee;
      }
      
      .count {
        color: #6aafd2;
      }
      
      .position {
        color: #aaa;
      }
      
      .no-members, .loading {
        background: #2a2a2a;
        color: #ccc;
      }
      
      .placeholder-logo {
        background: #444;
        color: #ddd;
      }
    }
  `]
})
export class CompanyDetailComponent implements OnInit {
  company: Company | null = null;
  members: CompanyMember[] = [];
  isLoading = true;
  
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const companyId = params['id'];
      if (companyId) {
        this.loadCompanyDetail(companyId);
      }
    });
  }
  
  async loadCompanyDetail(companyId: string): Promise<void> {
    try {
      // 회사 정보 로드
      const companyResponse = await this.companyService.getCompanyById(companyId);
      if (companyResponse.error || !companyResponse.data) {
        throw new Error('회사 정보를 불러오는데 실패했습니다');
      }
      
      this.company = companyResponse.data;
      
      // 구성원 정보 로드
      const membersResponse = await this.companyService.getCompanyMembers(companyId);
      if (membersResponse.error) {
        throw new Error('구성원 정보를 불러오는데 실패했습니다');
      }
      
      this.members = membersResponse.data || [];
      
    } catch (error) {
      console.error('회사 상세 정보 로딩 중 에러:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  getCompanyPhone(company: Company): string {
    if (!company.members || !Array.isArray(company.members) || company.members.length === 0) {
      return '12-345-12345';
    }
    
    try {
      for (const memberEntry of company.members) {
        if (memberEntry.member_info) {
          if (memberEntry.member_info.contact && memberEntry.member_info.contact.phone) {
            return memberEntry.member_info.contact.phone;
          }
        }
      }
      
      return '12-345-12345';
    } catch (error) {
      console.error('전화번호 추출 에러:', error);
      return '12-345-12345';
    }
  }
} 