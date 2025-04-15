import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../supabase';

interface RegisterForm {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  contact: string;
  association_role: string;
  department: string;
  position: string;
}

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <!-- 로고 영역 -->
      <div class="logo-section">
        <h1 class="logo-text">광주전남벤처기업협회</h1>
        <p class="logo-subtitle">GWANGJU JEONNAM VENTURE BUSINESS ASSOCIATION</p>
      </div>

      <!-- 연결 상태 표시 -->
      <div class="connection-status">
        <small>{{ connectionStatus }}</small>
      </div>

      <!-- 탭 버튼 -->
      <div class="tab-buttons">
        <button 
          [class.active]="activeTab === 'login'"
          (click)="activeTab = 'login'">로그인</button>
        <button 
          [class.active]="activeTab === 'register'"
          (click)="activeTab = 'register'">회원가입</button>
      </div>

      <!-- 로그인 폼 -->
      <form *ngIf="activeTab === 'login'" class="auth-form" (ngSubmit)="handleLogin()">
        <div class="form-group">
          <label>이메일</label>
          <div class="input-with-icon">
            <span class="material-icons">mail</span>
            <input type="email" [(ngModel)]="loginEmail" name="email" placeholder="이메일을 입력하세요">
          </div>
        </div>
        <div class="form-group">
          <label>비밀번호</label>
          <div class="input-with-icon">
            <span class="material-icons">lock</span>
            <input type="password" [(ngModel)]="loginPassword" name="password" placeholder="비밀번호를 입력하세요">
          </div>
        </div>
        <button type="submit" class="submit-btn">로그인</button>
        <div class="help-links">
          <a href="#" class="help-link">이메일 찾기</a>
          <span class="divider">|</span>
          <a href="#" class="help-link">비밀번호 찾기</a>
        </div>
      </form>

      <!-- 회원가입 폼 -->
      <form *ngIf="activeTab === 'register'" class="auth-form" (ngSubmit)="handleRegister()">
        <div class="form-group">
          <label>이메일 <span class="required">*</span></label>
          <div class="input-with-icon">
            <span class="material-icons">mail</span>
            <input 
              type="email" 
              [(ngModel)]="registerForm.email" 
              name="email" 
              placeholder="이메일을 입력하세요"
              required>
          </div>
        </div>
        <div class="form-group">
          <label>이름 <span class="required">*</span></label>
          <div class="input-with-icon">
            <span class="material-icons">person</span>
            <input 
              type="text" 
              [(ngModel)]="registerForm.name" 
              name="name" 
              placeholder="이름을 입력하세요"
              required>
          </div>
        </div>
        <div class="form-group">
          <label>연락처 <span class="required">*</span></label>
          <div class="input-with-icon">
            <span class="material-icons">phone</span>
            <input 
              type="tel" 
              [(ngModel)]="registerForm.contact" 
              name="contact" 
              placeholder="연락처를 입력하세요"
              required>
          </div>
        </div>
        <div class="form-group">
          <label>부서</label>
          <div class="input-with-icon">
            <span class="material-icons">business</span>
            <input 
              type="text" 
              [(ngModel)]="registerForm.department" 
              name="department" 
              placeholder="소속 부서를 입력하세요">
          </div>
        </div>
        <div class="form-group">
          <label>직책</label>
          <div class="input-with-icon">
            <span class="material-icons">badge</span>
            <input 
              type="text" 
              [(ngModel)]="registerForm.position" 
              name="position" 
              placeholder="직책을 입력하세요">
          </div>
        </div>
        <div class="form-group">
          <label>협회 역할 <span class="required">*</span></label>
          <div class="input-with-icon">
            <span class="material-icons">groups</span>
            <select 
              [(ngModel)]="registerForm.association_role" 
              name="association_role" 
              required>
              <option value="">역할을 선택하세요</option>
              <option value="member">일반회원</option>
              <option value="admin">관리자</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>비밀번호 <span class="required">*</span></label>
          <div class="input-with-icon">
            <span class="material-icons">lock</span>
            <input 
              type="password" 
              [(ngModel)]="registerForm.password" 
              name="password" 
              placeholder="비밀번호를 입력하세요"
              required>
          </div>
        </div>
        <div class="form-group">
          <label>비밀번호 확인 <span class="required">*</span></label>
          <div class="input-with-icon">
            <span class="material-icons">lock</span>
            <input 
              type="password" 
              [(ngModel)]="registerForm.passwordConfirm" 
              name="passwordConfirm" 
              placeholder="비밀번호를 다시 입력하세요"
              required>
          </div>
          <small class="error-message" *ngIf="passwordMismatch">
            비밀번호가 일치하지 않습니다.
          </small>
        </div>
        <button type="submit" class="submit-btn" [disabled]="isLoading">
          {{ isLoading ? '처리중...' : '회원가입' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 500px;
      margin: 50px auto;
      padding: 40px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .logo-section {
      text-align: center;
      margin-bottom: 30px;
    }

    .logo-text {
      font-size: 2em;
      color: #007bff;
      margin: 0;
      font-weight: 700;
    }

    .logo-subtitle {
      color: #6c757d;
      margin-top: 5px;
      font-size: 0.8em;
      letter-spacing: 0.5px;
    }

    .tab-buttons {
      display: flex;
      margin-bottom: 30px;
      border-bottom: 2px solid #f8f9fa;
    }

    .tab-buttons button {
      flex: 1;
      padding: 15px;
      background: none;
      border: none;
      font-size: 16px;
      color: #6c757d;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tab-buttons button.active {
      color: #007bff;
      border-bottom: 2px solid #007bff;
      margin-bottom: -2px;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      color: #495057;
      font-size: 14px;
    }

    .input-with-icon {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-with-icon .material-icons {
      position: absolute;
      left: 12px;
      color: #6c757d;
    }

    .input-with-icon input {
      width: 100%;
      padding: 12px 12px 12px 40px;
      border: 2px solid #f8f9fa;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .input-with-icon input:focus {
      border-color: #007bff;
      outline: none;
    }

    .form-options {
      display: flex;
      justify-content: center;
      gap: 20px;
      align-items: center;
      font-size: 14px;
    }

    .help-links {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-top: 16px;
    }

    .help-link {
      color: #6c757d;
      text-decoration: none;
      font-size: 13px;
      transition: color 0.3s ease;
    }

    .help-link:hover {
      color: #007bff;
    }

    .divider {
      color: #dee2e6;
      font-size: 12px;
    }

    .submit-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 14px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .submit-btn:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }

    .connection-status {
      position: fixed;
      bottom: 10px;
      right: 10px;
      padding: 8px;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
      font-size: 12px;
      color: #666;
      z-index: 1000;
      opacity: 0.7;
      transition: opacity 0.3s;
    }
    .connection-status:hover {
      opacity: 1;
    }

    .material-icons {
      font-family: 'Material Icons';
      font-size: 20px;
    }

    .required {
      color: #dc3545;
      margin-left: 4px;
    }

    .error-message {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
      font-size: 14px;
    }

    select:focus {
      outline: none;
      border-color: #007bff;
    }
  `]
})
export class LoginComponent implements OnInit {
  activeTab: 'login' | 'register' = 'login';
  connectionStatus: string = '연결 확인 중...';
  loginEmail: string = '';
  loginPassword: string = '';
  isLoading: boolean = false;
  passwordMismatch: boolean = false;

  registerForm: RegisterForm = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    contact: '',
    association_role: '',
    department: '',
    position: ''
  };

  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        this.connectionStatus = '❌ Supabase 연결 실패: ' + error.message;
        console.error('Supabase 연결 에러:', error);
      } else {
        this.connectionStatus = '✅ Supabase 연결 상태: 정상';
        console.log('Supabase 연결 성공!');
      }
    } catch (error) {
      this.connectionStatus = '❌ 연결 중 에러 발생';
      console.error('에러:', error);
    }
  }

  async handleLogin() {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: this.loginEmail,
        password: this.loginPassword
      });

      if (error) {
        console.error('로그인 에러:', error.message);
        alert('로그인 실패: ' + error.message);
      } else {
        console.log('로그인 성공:', user);
        this.router.navigate(['/main']);
      }
    } catch (err) {
      console.error('로그인 중 에러 발생:', err);
      alert('로그인 중 에러가 발생했습니다.');
    }
  }

  async handleRegister() {
    // 필수 필드 검증
    if (!this.registerForm.email || !this.registerForm.name || 
        !this.registerForm.password || !this.registerForm.passwordConfirm ||
        !this.registerForm.contact || !this.registerForm.association_role) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 비밀번호 일치 검증
    if (this.registerForm.password !== this.registerForm.passwordConfirm) {
      this.passwordMismatch = true;
      return;
    }
    this.passwordMismatch = false;

    try {
      this.isLoading = true;

      // 1. Supabase Auth로 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: this.registerForm.email,
        password: this.registerForm.password
      });

      if (authError) throw authError;

      // 2. users 테이블에 추가 정보 저장
      const { error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user?.id,  // Auth에서 생성된 UUID
            email: this.registerForm.email,
            name: this.registerForm.name,
            contact: this.registerForm.contact,
            association_role: this.registerForm.association_role,
            department: this.registerForm.department || null,  // 선택 입력
            position: this.registerForm.position || null,      // 선택 입력
            auth_status: 'pending'  // 관리자 승인 대기 상태
          }
        ]);

      if (userError) throw userError;

      alert('회원가입이 완료되었습니다. 관리자 승인 후 로그인이 가능합니다.');
      this.activeTab = 'login';  // 로그인 탭으로 전환
      this.resetForm();

    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      this.isLoading = false;
    }
  }

  private resetForm() {
    this.registerForm = {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      contact: '',
      association_role: '',
      department: '',
      position: ''
    };
  }
} 