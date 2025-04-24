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
      
      return { data: companies, error: null };
    } catch (error) {
      console.error('회사 데이터 로딩 에러:', error);
      return { data: null, error };
    }
  }
} 