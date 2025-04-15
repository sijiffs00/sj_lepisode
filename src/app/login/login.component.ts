import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../supabase';

declare const Kakao: any;

interface RegisterForm {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  contact: string;
  department: string;
  position: string;
}

// 사용자 정보 인터페이스 정의
interface UserInfo {
  id: number;  // 카카오 ID (int8)
  name: string | null;
  joined_at: string;
  registered_at: string;
  auth_status: string | null;
  company_approved: string | null;
  department: string | null;
  position: string | null;
  contact: string | null;
  email: string | null;
  association_role: string | null;
  org_chart_id: string | null;
  company_id: string | null;
  company: any | null;
}

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <div class="content-wrapper">
        <!-- 상단 이미지 영역 -->
        <div class="top-image-container">
          <div class="logo-section">
            <div class="logo-box">
              <span class="logo-text">(사)광주전남벤처기업협회</span>
            </div>
            <p class="logo-subtitle">GWANGJU JEONNAM VENTURE BUSINESS ASSOCIATION</p>
          </div>
        </div>

        <!-- 로그인 섹션 -->
        <div class="login-section">
          <h2 class="login-title">SNS로 간편하게 로그인</h2>
          
          <button class="kakao-login-btn" (click)="loginWithKakao()">
            <span class="chat-icon">💬</span>
            카카오로 계속하기
          </button>

          <p class="terms-text">
            로그인하시면 이용약관, 개인정보 수집 및 이용에<br>
            동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      width: 100%;
      min-height: 100vh;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .content-wrapper {
      width: 100%;
      max-width: 480px;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .top-image-container {
      width: 100%;
      height: 320px;
      background: linear-gradient(180deg, #5BBBB3 0%, #80CBC7 100%);
      border-bottom-left-radius: 40px;
      border-bottom-right-radius: 40px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }

    .logo-section {
      text-align: center;
    }

    .logo-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }

    .logo-text {
      color: white;
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }

    .logo-subtitle {
      color: rgba(255, 255, 255, 0.8);
      font-size: 11px;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .login-section {
      padding: 40px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .login-title {
      text-align: center;
      font-size: 17px;
      color: #333;
      margin: 0 0 24px 0;
      font-weight: 500;
      position: relative;
      padding: 0 20px;
    }

    .login-title::before,
    .login-title::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 50px;
      height: 1px;
      background: #EEEEEE;
    }

    .login-title::before {
      left: -40px;
    }

    .login-title::after {
      right: -40px;
    }

    .kakao-login-btn {
      width: 100%;
      padding: 16px;
      background: #FFE500;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      transition: transform 0.2s;
    }

    .kakao-login-btn:active {
      transform: scale(0.98);
    }

    .chat-icon {
      margin-right: 8px;
      font-size: 20px;
    }

    .terms-text {
      text-align: center;
      font-size: 12px;
      color: #999;
      line-height: 1.6;
      margin: 0;
    }

    @media (max-width: 480px) {
      .content-wrapper {
        height: 100vh;
      }

      .top-image-container {
        height: 280px;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
      }

      .logo-text {
        font-size: 16px;
      }

      .login-title {
        font-size: 16px;
      }

      .kakao-login-btn {
        font-size: 15px;
        padding: 14px;
      }

      .login-title::before,
      .login-title::after {
        width: 30px;
      }

      .login-title::before {
        left: -20px;
      }

      .login-title::after {
        right: -20px;
      }
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
  isEmailValid: boolean = true;
  emailErrorMessage: string = '';

  registerForm: RegisterForm = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    contact: '',
    department: '',
    position: ''
  };

  // 직책 목록 추가
  positionOptions: string[] = [
    '사원',
    '주임',
    '대리',
    '과장',
    '차장',
    '팀장',
    '부장',
    '이사',
  ];

  // 비밀번호 유효성 검사 결과
  passwordValidation = {
    isValid: false,
    message: ''
  };

  constructor(private router: Router) {}

  async ngOnInit() {
    // 카카오 SDK 초기화
    this.initializeKakao();

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

  private initializeKakao() {
    const KAKAO_JS_KEY = 'a854fc1241de8719121800ead8887a6d';
    
    try {
      Kakao.init(KAKAO_JS_KEY);
      console.log('Kakao SDK initialized:', Kakao.isInitialized());
    } catch (error) {
      console.error('Kakao SDK initialization failed:', error);
    }
  }

  async loginWithKakao() {
    try {
      // 카카오 로그인 요청
      await Kakao.Auth.login({
        success: (authObj: any) => {
          console.log('Kakao login success:', authObj);
          
          // 사용자 정보 가져오기
          Kakao.API.request({
            url: '/v2/user/me',
            success: async (res: any) => {
              console.log('User info:', res);
              
              // 기본 사용자 정보 구성
              const userInfo: Partial<UserInfo> = {
                id: parseInt(res.id), // 문자열로 오는 카카오 ID를 숫자로 변환
                name: res.kakao_account?.profile?.nickname || null,
                joined_at: new Date().toISOString(),
                registered_at: new Date().toISOString(),
                auth_status: 'pending'  // 관리자 승인 대기 상태
              };
              
              this.handleKakaoLogin(userInfo);
            },
            fail: (error: any) => {
              console.error('Failed to get user info:', error);
              alert('사용자 정보를 가져오는데 실패했습니다.');
            }
          });
        },
        fail: (error: any) => {
          console.error('Kakao login failed:', error);
          alert('카카오 로그인에 실패했습니다.');
        }
      });
    } catch (error) {
      console.error('Login process failed:', error);
      alert('로그인 처리 중 오류가 발생했습니다.');
    }
  }

  private async handleKakaoLogin(userInfo: Partial<UserInfo>) {
    try {
      // 기존 회원인지 확인
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userInfo.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingUser) {
        // 기존 회원이면 바로 메인 페이지로 이동
        this.router.navigate(['/main']);
        return;
      }

      // 신규 회원이면 회원가입 페이지로 이동
      this.router.navigate(['/register'], {
        state: { kakaoInfo: userInfo }
      });
    } catch (error) {
      console.error('로그인 처리 중 오류:', error);
      alert('로그인 처리 중 오류가 발생했습니다.');
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
    // 이메일 유효성 한번 더 검사
    if (!this.validateEmail(this.registerForm.email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    // 필수 필드 검증
    if (!this.registerForm.email || !this.registerForm.name || 
        !this.registerForm.password || !this.registerForm.passwordConfirm ||
        !this.registerForm.contact) {
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
            department: this.registerForm.department || null,  // 선택 입력
            position: this.registerForm.position || null,      // 선택 입력
            auth_status: 'pending',  // 관리자 승인 대기 상태
            association_role: 'member'  // 기본값으로 일반 회원 설정
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
      department: '',
      position: ''
    };
  }

  // 이메일 유효성 검사 함수 추가
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // 이메일 입력 변경 시 유효성 검사
  onEmailChange(email: string, isRegister: boolean = false) {
    if (!email) {
      this.isEmailValid = true;
      this.emailErrorMessage = '';
      return;
    }

    this.isEmailValid = this.validateEmail(email);
    if (!this.isEmailValid) {
      this.emailErrorMessage = '올바른 이메일 형식이 아닙니다. (예: example@email.com)';
    } else {
      this.emailErrorMessage = '';
    }
  }

  // 비밀번호 유효성 검사 함수
  validatePassword(password: string): boolean {
    if (!password) {
      this.passwordValidation = {
        isValid: false,
        message: '비밀번호를 입력해주세요.'
      };
      return false;
    }
    
    if (password.length < 6) {
      this.passwordValidation = {
        isValid: false,
        message: '비밀번호는 최소 6자 이상이어야 합니다.'
      };
      return false;
    }

    // 영문, 숫자 포함 체크
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasLetter || !hasNumber) {
      this.passwordValidation = {
        isValid: false,
        message: '비밀번호는 영문과 숫자를 모두 포함해야 합니다.'
      };
      return false;
    }

    this.passwordValidation = {
      isValid: true,
      message: '사용 가능한 비밀번호입니다.'
    };
    return true;
  }

  // 비밀번호 입력 변경 시 검사
  onPasswordChange() {
    this.validatePassword(this.registerForm.password);
    
    if (!this.registerForm.password || !this.registerForm.passwordConfirm) {
      this.passwordMismatch = false;
      return;
    }
    this.passwordMismatch = this.registerForm.password !== this.registerForm.passwordConfirm;
  }

  // Form 유효성 검사 수정
  isFormValid(): boolean {
    return (
      !!this.registerForm.email &&
      this.isEmailValid &&
      !!this.registerForm.name &&
      !!this.registerForm.contact &&
      !!this.registerForm.password &&
      !!this.registerForm.passwordConfirm &&
      this.passwordValidation.isValid &&
      !this.passwordMismatch
    );
  }
} 