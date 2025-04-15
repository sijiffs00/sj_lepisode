import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../supabase';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <h2>회원가입</h2>
      <form (ngSubmit)="handleRegister()" class="register-form">
        <div class="form-group">
          <label for="name">이름</label>
          <input type="text" id="name" [(ngModel)]="registerForm.name" name="name" required>
        </div>
        
        <div class="form-group">
          <label for="contact">연락처</label>
          <input type="tel" id="contact" [(ngModel)]="registerForm.contact" name="contact" required>
        </div>

        <div class="form-group">
          <label for="department">부서</label>
          <input type="text" id="department" [(ngModel)]="registerForm.department" name="department">
        </div>

        <div class="form-group">
          <label for="position">직책</label>
          <input type="text" id="position" [(ngModel)]="registerForm.position" name="position">
        </div>

        <button type="submit" [disabled]="isLoading">가입하기</button>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 480px;
      margin: 40px auto;
      padding: 20px;
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
    }

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      font-size: 14px;
      color: #666;
    }

    input {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
    }

    button {
      padding: 16px;
      background: #5BBBB3;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover {
      background: #4AA6A0;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm = {
    name: '',
    contact: '',
    department: '',
    position: ''
  };
  isLoading = false;
  kakaoInfo: any;

  constructor(private router: Router) {
    // 카카오 정보 받아오기
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.kakaoInfo = navigation.extras.state['kakaoInfo'];
    }
  }

  ngOnInit() {
    // 카카오 정보가 없으면 로그인 페이지로 리다이렉트
    if (!this.kakaoInfo) {
      this.router.navigate(['/login']);
      return;
    }
  }

  async handleRegister() {
    if (!this.registerForm.name || !this.registerForm.contact) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      this.isLoading = true;

      // users 테이블에 사용자 정보 저장
      const { error: userError } = await supabase
        .from('users')
        .insert([{
          id: this.kakaoInfo.id,  // 카카오 ID
          name: this.registerForm.name,
          contact: this.registerForm.contact,
          department: this.registerForm.department || null,
          position: this.registerForm.position || null,
          auth_status: 'pending',  // 관리자 승인 대기 상태
          joined_at: new Date().toISOString(),
          registered_at: new Date().toISOString()
        }]);

      if (userError) throw userError;

      alert('회원가입이 완료되었습니다. 관리자 승인 후 로그인이 가능합니다.');
      this.router.navigate(['/pending']);

    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      this.isLoading = false;
    }
  }
} 