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
      return { data: data as Company[], error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
} 