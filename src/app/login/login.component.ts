import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <!-- 로고 영역 -->
      <div class="logo-section">
        <h1 class="logo-text">광주전남벤처기업협회</h1>
        <p class="logo-subtitle">GWANGJU JEONNAM VENTURE BUSINESS ASSOCIATION</p>
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
      <form *ngIf="activeTab === 'login'" class="auth-form">
        <div class="form-group">
          <label>이메일</label>
          <div class="input-with-icon">
            <span class="material-icons">mail</span>
            <input type="email" placeholder="이메일을 입력하세요">
          </div>
        </div>
        <div class="form-group">
          <label>비밀번호</label>
          <div class="input-with-icon">
            <span class="material-icons">lock</span>
            <input type="password" placeholder="비밀번호를 입력하세요">
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
  `]
})
export class LoginComponent {
  activeTab: 'login' | 'register' = 'login';
} 