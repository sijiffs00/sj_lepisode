import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environment';

interface User {
  id: string;
  name: string;           // 이름
  company_name: string;   // 소속
  department: string;     // 부서
  position: string;       // 직급
  contact: string;        // 연락처
  email: string;         // 이메일
  registered_at: string; // 가입일
}

@Component({
  selector: 'app-admin-dash-mem-req',
  template: `
    <div class="member-request-container">
      <h2>승인 대기 회원 목록</h2>
      
      <!-- 로딩 표시 -->
      <div *ngIf="isLoading" class="loading">
        데이터를 불러오는 중...
      </div>

      <!-- 에러 메시지 -->
      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <!-- 승인 대기 회원 목록 테이블 -->
      <table *ngIf="!isLoading && !error && users.length > 0" class="member-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>소속</th>
            <th>부서</th>
            <th>직급</th>
            <th>연락처</th>
            <th>이메일</th>
            <th>가입일</th>
            <th>승인</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.name }}</td>
            <td>{{ user.company_name }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.position }}</td>
            <td>{{ user.contact }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.registered_at | date:'yyyy-MM-dd' }}</td>
            <td>
              <button (click)="approveUser(user.id)" class="approve-btn">승인</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 데이터가 없을 때 -->
      <div *ngIf="!isLoading && !error && users.length === 0" class="no-data">
        승인 대기중인 회원이 없습니다.
      </div>
    </div>
  `,
  styles: [`
    .member-request-container {
      padding: 20px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    .member-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .member-table th,
    .member-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .member-table th {
      background-color: #f5f5f5;
      font-weight: bold;
      color: #333;
    }
    .member-table tr:hover {
      background-color: #f9f9f9;
    }
    .loading {
      text-align: center;
      padding: 20px;
      color: #666;
    }
    .error {
      color: #dc3545;
      padding: 20px;
      text-align: center;
    }
    .no-data {
      text-align: center;
      padding: 20px;
      color: #666;
    }
    .approve-btn {
      padding: 6px 12px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .approve-btn:hover {
      background-color: #218838;
    }
  `]
})
export class AdminDashMemReqComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  error: string | null = null;

  private supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
  );

  constructor(private adminService: AdminService) {}

  async ngOnInit() {
    await this.loadPendingUsers();
  }

  async loadPendingUsers() {
    try {
      this.isLoading = true;
      this.error = null;
      
      const companyId = this.adminService.getCompanyId();
      
      if (!companyId) {
        throw new Error('회사 정보를 찾을 수 없습니다.');
      }

      // Supabase에서 승인 대기중인 사용자 목록 가져오기
      const { data: users, error: usersError } = await this.supabase
        .from('users')
        .select(`
          id,
          name,
          company_id,
          department,
          position,
          contact,
          email,
          registered_at
        `)
        .eq('company_id', companyId)
        .eq('company_approval', 'pending');  // 승인 대기중인 회원만 조회

      if (usersError) {
        throw usersError;
      }

      // 각 사용자의 회사 이름 조회
      this.users = await Promise.all((users || []).map(async (user) => {
        if (!user.company_id) {
          return {
            ...user,
            company_name: '소속 없음'
          };
        }

        const { data: companyData, error: companyError } = await this.supabase
          .from('companies')
          .select('name')
          .eq('id', user.company_id)
          .single();

        if (companyError) {
          console.error('회사 정보 조회 중 오류:', companyError);
          return {
            ...user,
            company_name: '소속 없음'
          };
        }

        return {
          ...user,
          company_name: companyData?.name || '소속 없음'
        };
      }));

    } catch (error) {
      console.error('승인 대기 회원 목록 조회 중 오류:', error);
      this.error = '데이터를 불러오는 중 오류가 발생했습니다.';
    } finally {
      this.isLoading = false;
    }
  }

  async approveUser(userId: string) {
    try {
      const { error } = await this.supabase
        .from('users')
        .update({ company_approval: 'approved' })
        .eq('id', userId);

      if (error) throw error;

      // 승인 후 목록 새로고침
      await this.loadPendingUsers();
    } catch (error) {
      console.error('회원 승인 중 오류:', error);
      this.error = '회원 승인 중 오류가 발생했습니다.';
    }
  }
} 