import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../supabase';

@Component({
  selector: 'app-admin-login',
  template: `
    <div class="admin-login-container">
      <div class="admin-login-card">
        <h1>관리자 로그인</h1>
        
        <div class="form-group">
          <label>관리자 ID <span class="required">*</span></label>
          <input 
            type="text" 
            placeholder="관리자 ID를 입력하세요" 
            [(ngModel)]="adminId"
            (ngModelChange)="checkFormValidity()">
        </div>

        <div class="form-group">
          <label>인증번호 <span class="required">*</span></label>
          <input 
            type="password" 
            placeholder="인증번호를 입력하세요" 
            [(ngModel)]="secretNumber"
            (ngModelChange)="checkFormValidity()">
        </div>

        <button 
          class="submit-btn" 
          [disabled]="!isFormValid" 
          [class.disabled]="!isFormValid"
          (click)="onSubmit()">
          로그인
        </button>

        <p class="error-text" *ngIf="errorMessage">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  `,
  styles: [`
    .admin-login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: #f5f5f5;
    }

    .admin-login-card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
      font-size: 24px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-size: 14px;
    }

    .required {
      color: #ff4444;
      margin-left: 2px;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.2s;
    }

    input:focus {
      border-color: #5BBBB3;
      outline: none;
    }

    .submit-btn {
      width: 100%;
      padding: 14px;
      background: #5BBBB3;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .submit-btn:hover:not(.disabled) {
      background: #4AA6A0;
    }

    .submit-btn.disabled {
      background: #cccccc;
      cursor: not-allowed;
    }

    .error-text {
      text-align: center;
      color: #ff4444;
      font-size: 12px;
      margin-top: 16px;
    }
  `]
})
export class AdminLoginComponent {
  adminId: string = '';
  secretNumber: string = '';
  isFormValid: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  checkFormValidity() {
    this.isFormValid = 
      this.adminId.trim() !== '' &&
      this.secretNumber.trim() !== '';
  }

  async onSubmit() {
    if (!this.isFormValid) return;

    try {
      const { data: adminUser, error } = await supabase
        .from('admins')
        .select('*')
        .eq('admin_id', this.adminId)
        .single();

      if (error) {
        throw error;
      }

      if (!adminUser) {
        this.errorMessage = '관리자 계정이 존재하지 않습니다.';
        return;
      }

      if (adminUser.secret_number === this.secretNumber) {
        // 로그인 성공 시 관리자 정보를 세션에 저장
        sessionStorage.setItem('admin', JSON.stringify({
          id: adminUser.id,
          adminId: adminUser.admin_id,
          managerName: adminUser.manager_name,
          role: adminUser.role,
          companyId: adminUser.company_id
        }));
        
        // 로그인 성공
        this.router.navigate(['/admin/dash']);
      } else {
        this.errorMessage = '인증번호가 일치하지 않습니다.';
      }
    } catch (error) {
      console.error('관리자 로그인 실패:', error);
      this.errorMessage = '로그인 중 오류가 발생했습니다.';
    }
  }
} 