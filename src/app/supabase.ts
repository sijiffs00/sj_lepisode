import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

// Supabase 클라이언트를 만드는 부분이야!
export const supabase = createClient(
  environment.supabaseUrl,  // Supabase 프로젝트 URL
  environment.supabaseAnonKey  // Supabase anon(익명) 키
); 