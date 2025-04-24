import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { supabase } from '../supabase';

declare const Kakao: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BehaviorSubject를 사용해서 사용자 ID를 저장하고 구독할 수 있게 해줘
  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSubject.asObservable();

  constructor(private router: Router) {}

  // 사용자 ID를 설정하는 메서드
  setUserId(id: number) {
    this.userIdSubject.next(id);
  }

  // 사용자 ID를 가져오는 메서드
  getUserId(): number | null {
    return this.userIdSubject.getValue();
  }

  async logout() {
    try {
      // 카카오 로그아웃
      if (Kakao.Auth.getAccessToken()) {
        await Kakao.Auth.logout();
      }
      
      // 로컬 사용자 정보 삭제
      this.userIdSubject.next(null);
      
      // 로그인 페이지로 리다이렉트
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      throw error;
    }
  }

  async deleteAccount() {
    try {
      const userId = this.getUserId();
      if (!userId) {
        throw new Error('사용자 ID를 찾을 수 없습니다.');
      }

      // 1. 카카오 연동 해제
      if (Kakao.Auth.getAccessToken()) {
        await Kakao.API.request({
          url: '/v1/user/unlink'
        });
      }

      // 2. Supabase에서 사용자 데이터 삭제
      const { error: userError } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (userError) throw userError;

      // 3. 로컬 상태 초기화
      this.userIdSubject.next(null);

      // 4. 로그인 페이지로 리다이렉트
      this.router.navigate(['/login']);

    } catch (error) {
      console.error('회원탈퇴 중 오류 발생:', error);
      throw error;
    }
  }
} 