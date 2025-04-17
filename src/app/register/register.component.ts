import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <div class="register-card">
        <h1>회원가입</h1>
        
        <div class="form-group">
          <label>이름</label>
          <input type="text" placeholder="이름을 입력하세요" [(ngModel)]="name">
        </div>

        <div class="form-group">
          <label>부서</label>
          <input type="text" placeholder="부서를 입력하세요" [(ngModel)]="department">
        </div>

        <div class="form-group">
          <label>직책</label>
          <input type="text" placeholder="직책을 입력하세요" [(ngModel)]="position">
        </div>

        <div class="form-group">
          <label>연락처</label>
          <input type="tel" placeholder="연락처를 입력하세요" [(ngModel)]="contact">
        </div>

        <button class="submit-btn" (click)="onSubmit()">가입하기</button>
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
      transition: background 0.2s;
    }

    .submit-btn:hover {
      background: #4AA6A0;
    }
  `]
})
export class RegisterComponent {
  name: string = '';
  department: string = '';
  position: string = '';
  contact: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // 여기에 회원가입 로직을 추가할 수 있어
    console.log('회원가입 정보:', {
      name: this.name,
      department: this.department,
      position: this.position,
      contact: this.contact
    });
    
    // 메인 페이지로 이동
    this.router.navigate(['/main']);
  }
} 