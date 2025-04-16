import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  template: `
    <div class="admin-login-container">
      <div class="login-box">
        <h1>관리자 로그인</h1>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">이메일</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              placeholder="관리자 이메일을 입력하세요"
            >
            <div *ngIf="loginForm.get('email')?.errors?.['required'] && loginForm.get('email')?.touched" class="error-message">
              이메일을 입력해주세요
            </div>
            <div *ngIf="loginForm.get('email')?.errors?.['email'] && loginForm.get('email')?.touched" class="error-message">
              올바른 이메일 형식이 아닙니다
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password"
              placeholder="비밀번호를 입력하세요"
            >
            <div *ngIf="loginForm.get('password')?.errors?.['required'] && loginForm.get('password')?.touched" class="error-message">
              비밀번호를 입력해주세요
            </div>
          </div>

          <button type="submit" [disabled]="!loginForm.valid">로그인</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .admin-login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .login-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    input:focus {
      outline: none;
      border-color: #007bff;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:hover {
      background-color: #0056b3;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  `]
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // TODO: 여기에 실제 로그인 로직을 구현할 거야
      console.log('로그인 시도:', this.loginForm.value);
    }
  }
} 