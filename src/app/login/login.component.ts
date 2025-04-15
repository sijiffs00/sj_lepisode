import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../supabase';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <!-- 로고 영역 -->
      <div class="logo-section">
        <h1 class="logo-text">광주전남벤처기업협회</h1>
        <p class="logo-subtitle">GWANGJU JEONNAM VENTURE BUSINESS ASSOCIATION</p>
        <!-- Supabase 연결 상태 표시 -->
        <p class="connection-status" [class.error]="connectionStatus.includes('❌')" [class.success]="connectionStatus.includes('✅')">
          {{ connectionStatus }}
        </p>
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
      <form *ngIf="activeTab === 'register'" class="auth-form">
        <div class="form-group">
          <label>이메일</label>
          <div class="input-with-icon">
            <span class="material-icons">mail</span>
            <input type="email" placeholder="이메일을 입력하세요">
          </div>
        </div>
        <div class="form-group">
          <label>이름</label>
          <div class="input-with-icon">
            <span class="material-icons">person</span>
            <input type="text" placeholder="이름을 입력하세요">
          </div>
        </div>
        <div class="form-group">
          <label>비밀번호</label>
          <div class="input-with-icon">
            <span class="material-icons">lock</span>
            <input type="password" placeholder="비밀번호를 입력하세요">
          </div>
        </div>
        <div class="form-group">
          <label>비밀번호 확인</label>
          <div class="input-with-icon">
            <span class="material-icons">lock</span>
            <input type="password" placeholder="비밀번호를 다시 입력하세요">
          </div>
        </div>
        <button type="submit" class="submit-btn">회원가입</button>
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
      margin-top: 10px;
      padding: 8px;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
      background-color: #f8f9fa;
    }

    .connection-status.error {
      color: #dc3545;
      background-color: #f8d7da;
    }

    .connection-status.success {
      color: #28a745;
      background-color: #d4edda;
    }

    .material-icons {
      font-family: 'Material Icons';
      font-size: 20px;
    }
  `]
})
export class LoginComponent implements OnInit {
  activeTab: 'login' | 'register' = 'login';
  connectionStatus: string = '연결 확인 중...';
  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      // Supabase 연결 테스트
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        this.connectionStatus = '❌ Supabase 연결 실패: ' + error.message;
        console.error('Supabase 연결 에러:', error);
      } else {
        this.connectionStatus = '✅ Supabase 연결 성공!';
        console.log('Supabase 연결 성공!');
        
        // 이미 로그인된 세션이 있다면 메인 페이지로 이동
        if (session) {
          this.router.navigate(['/main']);
        }
      }
    } catch (err) {
      this.connectionStatus = '❌ 연결 중 에러 발생';
      console.error('에러:', err);
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
} 