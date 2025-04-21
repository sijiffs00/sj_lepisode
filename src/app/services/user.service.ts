import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BehaviorSubject를 사용해서 사용자 ID를 저장하고 구독할 수 있게 해줘
  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSubject.asObservable();

  constructor() {}

  // 사용자 ID를 설정하는 메서드
  setUserId(id: number) {
    this.userIdSubject.next(id);
  }

  // 사용자 ID를 가져오는 메서드
  getUserId(): number | null {
    return this.userIdSubject.getValue();
  }
} 