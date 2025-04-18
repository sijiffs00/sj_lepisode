import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../supabase';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <div class="register-card">
        <h1>회원가입</h1>
        
        <div class="form-group">
          <label>이름 <span class="required">*</span></label>
          <input 
            type="text" 
            placeholder="이름을 입력하세요" 
            [(ngModel)]="name"
            (ngModelChange)="checkFormValidity()">
        </div>

        <div class="form-group">
          <label>소속 <span class="required">*</span></label>
          <select 
            [(ngModel)]="selectedCompanyId"
            (ngModelChange)="onCompanySelect($event)"
            class="company-select">
            <option value="">소속을 선택하세요</option>
            <option *ngFor="let company of companies" [value]="company.id">
              {{company.name}}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>직위/직책 <span class="required">*</span></label>
          <input 
            type="text" 
            placeholder="직위/직책을 입력하세요" 
            [(ngModel)]="position"
            (ngModelChange)="checkFormValidity()">
        </div>

        <div class="form-group">
          <label>연락처 <span class="required">*</span></label>
          <input 
            type="tel" 
            placeholder="연락처를 입력하세요 (예: 010-1234-5678)" 
            [(ngModel)]="contact"
            (ngModelChange)="checkFormValidity()">
        </div>

        <div class="form-group">
          <label>이메일 <span class="required">*</span></label>
          <input 
            type="email" 
            placeholder="이메일을 입력하세요" 
            [(ngModel)]="email"
            (ngModelChange)="checkFormValidity()">
        </div>

        <button 
          class="submit-btn" 
          [disabled]="!isFormValid" 
          [class.disabled]="!isFormValid"
          (click)="onSubmit()">
          가입하기
        </button>

        <p class="required-text" *ngIf="!isFormValid">
          * 모든 필수 항목을 입력해주세요
        </p>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: #f5f5f5;
    }

    .register-card {
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

    input, .company-select {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.2s;
    }

    input:focus, .company-select:focus {
      border-color: #5BBBB3;
      outline: none;
    }

    .company-select {
      background-color: white;
      cursor: pointer;
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

    .required-text {
      text-align: center;
      color: #ff4444;
      font-size: 12px;
      margin-top: 16px;
    }
  `]
})
export class RegisterComponent implements OnInit {
  name: string = '';
  selectedCompanyId: string = '';
  position: string = '';
  contact: string = '';
  email: string = '';
  isFormValid: boolean = false;
  companies: { id: number; name: string }[] = [];
  kakaoUserInfo: any;  // 카카오 유저 정보를 저장할 변수

  constructor(
    private router: Router,
    private location: Location  // Location 서비스 추가
  ) {
    // router의 state에서 userInfo 가져오기
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.kakaoUserInfo = navigation.extras.state['userInfo'];
      // 카카오에서 받아온 정보로 초기값 설정
      this.name = this.kakaoUserInfo.name || '';
      this.email = this.kakaoUserInfo.email || '';
    } else {
      // userInfo가 없으면 로그인 페이지로 돌아가기
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit() {
    try {
      // companies 테이블에서 id와 name만 가져오기
      const { data: companies, error } = await supabase
        .from('companies')
        .select('id, name')
        .order('name');  // 기업명 알파벳 순으로 정렬

      if (error) {
        throw error;
      }

      this.companies = companies;
    } catch (error) {
      console.error('기업 목록 가져오기 실패:', error);
    }
  }

  onCompanySelect(companyId: string) {
    this.selectedCompanyId = companyId;
    this.checkFormValidity();
  }

  checkFormValidity() {
    this.isFormValid = 
      this.name.trim() !== '' &&
      this.selectedCompanyId !== '' &&
      this.position.trim() !== '' &&
      this.contact.trim() !== '' &&
      this.email.trim() !== '';
  }

  async onSubmit() {
    if (!this.isFormValid) return;

    try {
      // users 테이블에 새로운 유저 추가하기
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: this.kakaoUserInfo.id,  // 카카오 ID 추가
            name: this.name,
            company_id: this.selectedCompanyId,
            position: this.position,
            contact: this.contact,
            email: this.email,
            auth_status: 'pending',      // 인증 상태 추가
            company_approval: 'pending'   // 기업 승인 상태 추가
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log('새로운 유저가 추가되었습니다:', data);
      
      // 성공적으로 추가되면 메인 페이지로 이동
      this.router.navigate(['/main']);
    } catch (error) {
      console.error('유저 추가 실패:', error);
      // 여기에 에러 메시지를 사용자에게 보여주는 로직을 추가할 수 있어!
    }
  }
} 