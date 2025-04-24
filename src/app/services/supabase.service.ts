import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async getCompanies() {
    const { data, error } = await this.supabase
      .from('companies')
      .select('*')
      .eq('approval_status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
  
  async getCompanyById(companyId: string) {
    const { data, error } = await this.supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async getCompanyMembersCount(companyId: string) {
    const { count, error } = await this.supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId);
      
    if (error) throw error;
    return count || 0;
  }
  
  async getCompanyMembers(companyId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('id, name, position, contact, email, company_id, department')
      .eq('company_id', companyId);
      
    if (error) throw error;
    return data;
  }
} 