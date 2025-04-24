import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface Company {
  id: string;
  name: string;
  address: string;
  industry: string;
  ceo_name: string;
  logo_url?: string;
  homepage_url?: string;
  approval_status?: string;
  created_at?: string;
  members?: any[]; // 회원 정보를 담는 배열
  memberCount?: number; // 구성원 수를 저장할 필드 추가
}

export interface CompanyResponse {
  data: Company[] | null;
  error: any;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private supabaseService: SupabaseService) {}

  async getCompanies(): Promise<CompanyResponse> {
    try {
      const data = await this.supabaseService.getCompanies();
      
      // members 필드가 JSON 문자열인 경우 객체로 변환
      const companies = (data as Company[]).map(company => {
        if (typeof company.members === 'string') {
          try {
            company.members = JSON.parse(company.members);
          } catch (e) {
            console.error('회원 정보 파싱 에러:', e);
            company.members = [];
          }
        }
        return company;
      });
      
      // 각 회사의 구성원 수 가져오기
      for (const company of companies) {
        try {
          company.memberCount = await this.supabaseService.getCompanyMembersCount(company.id);
        } catch (e) {
          console.error(`${company.name}의 구성원 수 가져오기 에러:`, e);
          company.memberCount = 0;
        }
      }
      
      return { data: companies, error: null };
    } catch (error) {
      console.error('회사 데이터 로딩 에러:', error);
      return { data: null, error };
    }
  }
  
  async getCompanyMembersCount(companyId: string): Promise<number> {
    try {
      return await this.supabaseService.getCompanyMembersCount(companyId);
    } catch (error) {
      console.error('구성원 수 가져오기 에러:', error);
      return 0;
    }
  }
} 