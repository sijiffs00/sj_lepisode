import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface AdminInfo {
  id: string;
  adminId: string;
  managerName: string;
  role: string;
  companyId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminInfo = new BehaviorSubject<AdminInfo | null>(null);
  adminInfo$ = this.adminInfo.asObservable();

  constructor() {
    // 초기화할 때 sessionStorage에서 관리자 정보를 가져와요
    const storedAdmin = sessionStorage.getItem('admin');
    if (storedAdmin) {
      const adminData = JSON.parse(storedAdmin);
      console.log('AdminService - 저장된 관리자 정보:', adminData);
      this.adminInfo.next(adminData);
    }
  }

  // 관리자 정보 가져오기
  getAdminInfo(): AdminInfo | null {
    const info = this.adminInfo.value;
    console.log('AdminService - getAdminInfo 호출됨:', info);
    return info;
  }

  // 관리자 정보 설정하기
  setAdminInfo(adminInfo: AdminInfo) {
    console.log('AdminService - 새로운 관리자 정보 설정:', adminInfo);
    sessionStorage.setItem('admin', JSON.stringify(adminInfo));
    this.adminInfo.next(adminInfo);
  }

  // 회사 ID 가져오기
  getCompanyId(): string | null {
    const companyId = this.adminInfo.value?.companyId;
    console.log('AdminService - getCompanyId 호출됨:', companyId);
    return companyId || null;
  }

  // 로그아웃
  clearAdminInfo() {
    sessionStorage.removeItem('admin');
    this.adminInfo.next(null);
  }
} 