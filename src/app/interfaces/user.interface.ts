export interface UserInfo {
  id: number;  // 카카오 ID (int8)
  name: string | null;
  joined_at: string;
  registered_at: string;
  auth_status: string | null;
  company_approved: string | null;
  department: string | null;
  position: string | null;
  contact: string | null;
  email: string | null;
  association_role: string | null;
  org_chart_id: string | null;
  company_id: string | null;
  company: any | null;
} 