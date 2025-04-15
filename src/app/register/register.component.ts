import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../supabase';

interface RegisterForm {
  name: string;
  contact: string;
  department: string;
  position: string;
  email: string;
}

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <!-- 헤더 -->
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <span class="back-icon">←</span>
        </button>
        <h1>회원 가입</h1>
      </div>

      <!-- 메인 컨텐츠 -->
      <div class="content">
        <p class="subtitle">회원가입을 위해 정보를 입력해주세요.</p>

        <form (ngSubmit)="handleRegister()" class="register-form">
          <!-- 이름 입력 -->
          <div class="form-group">
            <label>이름<span class="required">•</span></label>
            <input 
              type="text" 
              [(ngModel)]="form.name" 
              name="name"
              placeholder="권혁빈"
              required>
          </div>

          <!-- 연락처 입력 -->
          <div class="form-group">
            <label>연락처<span class="required">•</span></label>
            <input 
              type="tel" 
              [(ngModel)]="form.contact" 
              name="contact"
              placeholder="010-1234-5678"
              required>
          </div>

          <!-- 소속 입력 -->
          <div class="form-group">
            <label>소속</label>
            <input 
              type="text" 
              [(ngModel)]="form.department" 
              name="department"
              placeholder="레피소드">
          </div>

          <!-- 직위/직책 입력 -->
          <div class="form-group">
            <label>직위/직책</label>
            <input 
              type="text" 
              [(ngModel)]="form.position" 
              name="position"
              placeholder="직위/직책을 입력해 주세요.">
          </div>

          <!-- 이메일 입력 -->
          <div class="form-group">
            <label>이메일</label>
            <input 
              type="email" 
              [(ngModel)]="form.email" 
              name="email"
              placeholder="이메일을 입력해 주세요.">
          </div>

          <!-- 약관 동의 -->
          <div class="terms-section">
            <div class="terms-item">
              <input type="checkbox" [(ngModel)]="termsAgreed" name="terms" id="terms">
              <label for="terms">이용약관/개인정보처리방침 동의 (필수)</label>
              <button type="button" class="terms-link" (click)="showTerms()">내용 확인 ›</button>
            </div>
            <div class="terms-item">
              <input type="checkbox" [(ngModel)]="marketingAgreed" name="marketing" id="marketing">
              <label for="marketing">이메일/연락처 노출 동의 (필수)</label>
              <button type="button" class="terms-link" (click)="showTerms()">내용 확인 ›</button>
            </div>
          </div>

          <!-- 버튼 영역 -->
          <div class="button-group">
            <button type="button" class="cancel-btn" (click)="goBack()">취소</button>
            <button 
              type="submit" 
              class="confirm-btn" 
              [disabled]="!isFormValid() || isLoading">
              확인
            </button>
          </div>
        </form>
      </div>

      <!-- 약관 모달 -->
      <div class="terms-modal" *ngIf="showTermsModal">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close-btn" (click)="closeTerms()">
              <span>×</span>
            </button>
          </div>

          <div class="terms-tabs">
            <button 
              [class.active]="activeTab === 'privacy'"
              (click)="activeTab = 'privacy'"
              class="tab-btn">
              개인정보처리방침
            </button>
            <button 
              [class.active]="activeTab === 'terms'"
              (click)="activeTab = 'terms'"
              class="tab-btn">
              이용약관
            </button>
          </div>

          <div class="terms-content" [ngSwitch]="activeTab">
            <div *ngSwitchCase="'privacy'" class="terms-text">
              <h2>개인정보처리방침</h2>
              <p>광주전남벤처기업협회(이하 "본 협회")는 개인정보 보호를 매우 중요시하며, 사용자의 개인정보를 보호하고 처리하는 데 최선을 다하고 있습니다.</p>
              <h3>1. 수집하는 개인정보 항목</h3>
              <p>본 협회는 회원가입 및 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:</p>
              <ul>
                <li>필수 항목: 이름, 이메일, 연락처(휴대폰 번호)</li>
                <li>선택 항목: 주소, 직위 (서비스 개선을 위한 선택적 정보)</li>
              </ul>
            </div>
            <div *ngSwitchCase="'terms'" class="terms-text">
              <h2>이용약관</h2>
              <p>본 이용약관은 광주전남벤처기업협회(이하 "협회")가 제공하는 서비스의 이용 조건과 절차를 규정합니다.</p>
              <h3>제1조 (목적)</h3>
              <p>본 약관은 협회가 제공하는 모든 서비스의 이용 조건 및 절차, 회원과 협회의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
            </div>
          </div>

          <div class="modal-footer">
            <button class="confirm-btn" (click)="closeTerms()">확인</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      width: 100%;
      min-height: 100vh;
      background: #FFFFFF;
    }

    .header {
      position: relative;
      padding: 20px 16px;
      border-bottom: 1px solid #EEEEEE;
      display: flex;
      align-items: center;
      background: white;
    }

    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      position: absolute;
      left: 16px;
    }

    .back-icon {
      font-size: 20px;
      color: #333;
    }

    h1 {
      flex: 1;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      color: #333;
    }

    .content {
      padding: 24px 16px;
    }

    .subtitle {
      font-size: 14px;
      color: #666;
      margin-bottom: 32px;
    }

    .form-group {
      margin-bottom: 24px;
    }

    .form-group label {
      display: block;
      font-size: 14px;
      color: #333;
      margin-bottom: 8px;
    }

    .required {
      color: #5BBBB3;
      margin-left: 4px;
    }

    input[type="text"],
    input[type="tel"],
    input[type="email"] {
      width: 100%;
      padding: 16px;
      border: 1px solid #EEEEEE;
      border-radius: 8px;
      font-size: 16px;
      color: #333;
      background: #F8F9FA;
    }

    input::placeholder {
      color: #999;
    }

    .terms-section {
      margin: 32px 0;
    }

    .terms-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      gap: 8px;
    }

    .terms-item label {
      font-size: 14px;
      color: #333;
      flex: 1;
    }

    .terms-link {
      background: none;
      border: none;
      color: #5BBBB3;
      text-decoration: none;
      font-size: 14px;
      cursor: pointer;
      padding: 0;
    }

    .button-group {
      display: flex;
      gap: 12px;
      margin-top: 40px;
    }

    .cancel-btn,
    .confirm-btn {
      flex: 1;
      padding: 16px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      border: none;
    }

    .cancel-btn {
      background: white;
      border: 1px solid #EEEEEE;
      color: #666;
    }

    .confirm-btn {
      background: #5BBBB3;
      color: white;
    }

    .confirm-btn:disabled {
      background: #CCCCCC;
      cursor: not-allowed;
    }

    /* 약관 모달 스타일 */
    .terms-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      width: 100%;
      max-width: 480px;
      height: 90vh;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      margin: 20px;
    }

    .modal-header {
      padding: 16px;
      border-bottom: 1px solid #EEEEEE;
      position: relative;
    }

    .close-btn {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      font-size: 24px;
      color: #666;
      cursor: pointer;
      padding: 8px;
    }

    .terms-tabs {
      display: flex;
      border-bottom: 1px solid #EEEEEE;
    }

    .tab-btn {
      flex: 1;
      padding: 16px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      font-size: 14px;
      color: #666;
      cursor: pointer;
    }

    .tab-btn.active {
      color: #5BBBB3;
      border-bottom-color: #5BBBB3;
      font-weight: 600;
    }

    .terms-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
    }

    .terms-text {
      font-size: 14px;
      line-height: 1.6;
      color: #333;
    }

    .terms-text h2 {
      font-size: 18px;
      margin-bottom: 16px;
    }

    .terms-text h3 {
      font-size: 16px;
      margin: 24px 0 12px;
    }

    .terms-text p {
      margin-bottom: 16px;
    }

    .terms-text ul {
      padding-left: 20px;
      margin-bottom: 16px;
    }

    .terms-text li {
      margin-bottom: 8px;
    }

    .modal-footer {
      padding: 16px;
      border-top: 1px solid #EEEEEE;
      text-align: center;
    }

    @media (max-width: 480px) {
      .modal-content {
        height: 100%;
        margin: 0;
        border-radius: 0;
      }
    }

    @media (min-width: 768px) {
      .content {
        max-width: 480px;
        margin: 0 auto;
      }
    }
  `]
})
export class RegisterComponent implements OnInit {
  form: RegisterForm = {
    name: '',
    contact: '',
    department: '',
    position: '',
    email: ''
  };

  isLoading = false;
  kakaoInfo: any;
  termsAgreed = false;
  marketingAgreed = false;
  showTermsModal = false;
  activeTab: 'privacy' | 'terms' = 'privacy';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.kakaoInfo = navigation.extras.state['kakaoInfo'];
    }
  }

  ngOnInit() {
    if (!this.kakaoInfo) {
      this.router.navigate(['/login']);
    }
  }

  isFormValid(): boolean {
    return (
      !!this.form.name &&
      !!this.form.contact &&
      this.termsAgreed &&
      this.marketingAgreed
    );
  }

  showTerms() {
    this.showTermsModal = true;
  }

  closeTerms() {
    this.showTermsModal = false;
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  async handleRegister() {
    if (!this.isFormValid()) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      this.isLoading = true;

      const { error: userError } = await supabase
        .from('users')
        .insert([{
          id: this.kakaoInfo.id,
          name: this.form.name,
          contact: this.form.contact,
          department: this.form.department,
          position: this.form.position || null,
          email: this.form.email || null,
          auth_status: 'pending',
          joined_at: new Date().toISOString(),
          registered_at: new Date().toISOString()
        }]);

      if (userError) throw userError;

      this.router.navigate(['/main']);
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      this.isLoading = false;
    }
  }
} 