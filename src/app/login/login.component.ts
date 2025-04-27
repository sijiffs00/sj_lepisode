import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from '../supabase';
import { UserService } from '../services/user.service';

declare const Kakao: any;

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
    }
  `]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.initializeKakao();
  }

  private initializeKakao() {
    if (!Kakao.isInitialized()) {
      Kakao.init('a854fc1241de8719121800ead8887a6d');
    }
  }

  async loginWithKakao() {
    try {
      const response = await new Promise<any>((resolve, reject) => {
        Kakao.Auth.login({
          success: (authObj: any) => resolve(authObj),
          fail: (err: any) => reject(err)
        });
      });

      // 사용자 정보 가져오기
      const userInfo = await new Promise<any>((resolve, reject) => {
        Kakao.API.request({
          url: '/v2/user/me',
          success: (res: any) => resolve(res),
          fail: (err: any) => reject(err)
        });
      });

      // 카카오 로그인 처리
      await this.handleKakaoLogin({
        id: userInfo.id,
        name: userInfo.properties?.nickname,
        email: userInfo.kakao_account?.email
      });

    } catch (error) {
      console.error('카카오 로그인 에러:', error);
      alert('카카오 로그인 중 오류가 발생했습니다.');
    }
  }

  private async handleKakaoLogin(userInfo: Partial<UserInfo>) {
    try {
      console.log('카카오에서 받은 사용자 정보:', {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email
      });

      // Supabase에서 사용자 확인
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userInfo.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (!existingUser) {
        console.log('새로운 사용자! /register로 이동합니다. userInfo.id:', userInfo.id);
        this.router.navigate(['/register'], { 
          state: { userInfo } 
        });
      } else {
        console.log('기존 사용자! /main으로 이동합니다. userInfo.id:', userInfo.id);
        // 사용자 ID를 서비스에 저장하고 main으로 이동
        this.userService.setUserId(userInfo.id!);
        // 로컬 스토리지에도 저장 (추가)
        localStorage.setItem('userId', userInfo.id!.toString());
        this.router.navigate(['/main']);
      }
    } catch (error) {
      console.error('사용자 처리 중 오류:', error);
      alert('로그인 처리 중 오류가 발생했습니다.');
    }
  }
} 