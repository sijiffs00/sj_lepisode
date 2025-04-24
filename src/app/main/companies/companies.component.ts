import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CompanyService, Company, CompanyResponse, CompanyMember } from '../../services/company.service';

declare global {
  interface Window {
    kakao: any;
  }
}

@Component({
  selector: 'app-companies',
  template: `
    <div class="companies-container">
      <!-- 상단 검색 UI -->
      <div class="search-header">
        <button class="menu-button" (click)="openBottomSheet($event)">
          <span class="menu-icon">≡</span>
          목록
        </button>
        <div class="search-input-container">
          <input type="text" placeholder="검색어를 입력해 주세요." class="search-input">
        </div>
        <button class="close-button">
          <span class="close-icon">×</span>
        </button>
      </div>

      <div id="map" class="map-container"></div>
      
      <!-- 바텀시트 UI -->
      <div class="bottom-sheet" 
           [class.expanded]="isBottomSheetExpanded"
           [style.transform]="'translateY(' + bottomSheetPosition + 'px)'"
           (touchstart)="onTouchStart($event)"
           (touchmove)="onTouchMove($event)"
           (touchend)="onTouchEnd()"
           (click)="toggleBottomSheet()">
        <div class="bottom-sheet-header">
          <div class="handle"></div>
          <h3>기업 목록 <span class="company-count">({{ companies.length }})</span></h3>
        </div>
        <div class="bottom-sheet-content" (click)="$event.stopPropagation()">
          <div class="company-list">
            <div *ngFor="let company of companies" class="company-wrapper">
              <div class="company-item" (click)="selectCompany(company, $event)">
                <div class="company-logo">
                  <img *ngIf="company.logo_url" [src]="company.logo_url" alt="{{ company.name }} 로고">
                  <div *ngIf="!company.logo_url" class="placeholder-logo">{{ company.name[0] }}</div>
                </div>
                <div class="company-info">
                  <h4>{{ company.name }}</h4>
                  <div class="company-details">
                    <p class="company-type">{{ company.industry || '업종 정보 없음' }}</p>
                    <p class="company-contact" *ngIf="getCompanyPhone(company)">
                      <span class="contact-icon">📞</span> {{ getCompanyPhone(company) }}
                    </p>
                    <p class="company-address">
                      <span class="address-icon">📍</span> {{ company.address }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- 구성원 정보 섹션 -->
              <div class="member-section" (click)="$event.stopPropagation()">
                <p class="company-members">구성원<span class="member-count">({{ company.memberCount || 0 }})</span></p>
                
                <!-- 구성원 목록 - 선택된 기업에만 표시 -->
                <div class="members-container" *ngIf="selectedCompanyId === company.id">
                  <!-- 로딩 중 표시 -->
                  <div *ngIf="isLoadingMembers" class="loading">
                    구성원 정보를 불러오는 중...
                  </div>
                  
                  <!-- 구성원 목록 -->
                  <div class="members-list" *ngIf="!isLoadingMembers">
                    <div *ngFor="let member of companyMembers" class="member-card">
                      <p class="member-name">{{ member.name }} <span class="position">{{ member.position }}</span></p>
                      <p class="member-phone">
                        <span class="icon">📞</span> {{ member.phone }}
                      </p>
                      <p class="member-email">
                        <span class="icon">📧</span> {{ member.email }}
                      </p>
                    </div>
                    
                    <!-- 데이터 없을 때 -->
                    <div *ngIf="companyMembers.length === 0" class="no-members">
                      등록된 구성원이 없습니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .companies-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      background-color: #fff;
    }

    /* 검색 헤더 스타일 */
    .search-header {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      background: white;
      gap: 16px;
      border-bottom: 1px solid #eee;
    }

    .menu-button {
      flex-shrink: 0; /* 버튼 크기 고정 */
      display: flex;
      align-items: center;
      gap: 4px;
      background: #4B96B4;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 16px;
      cursor: pointer;
    }

    .menu-icon {
      font-size: 20px;
    }

    .search-input-container {
      flex: 1;
      position: relative;
      max-width: calc(100% - 200px); /* 180px에서 200px로 수정해서 검색창 너비 약간 줄임 */
    }

    .search-input {
      width: 100%;
      padding: 12px 16px;
      border: none;
      border-radius: 100px;
      background: #f5f5f5;
      font-size: 16px;
      outline: none;
    }

    .search-input::placeholder {
      color: #999;
    }

    .close-button {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      transition: background-color 0.2s;
      margin-left: 12px; /* 4px에서 12px로 증가 */
    }

    .close-button:hover {
      background-color: #f5f5f5;
    }

    .close-icon {
      font-size: 28px;
      color: #333;
      font-weight: 300;
      line-height: 1;
    }

    .map-container {
      width: 100%;
      height: calc(100vh - 120px); /* 상단 여백 제거로 높이 조정 */
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    /* 바텀시트 스타일 */
    .bottom-sheet {
      position: fixed;
      bottom: 64px;
      left: 16px;
      right: 16px;
      background: white;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease-out;
      z-index: 1000;
      touch-action: none;
      height: 45vh; /* 60vh에서 45vh로 변경 */
    }

    .bottom-sheet.expanded {
      transform: translateY(0) !important;
      height: 85vh; /* 확장 시 높이 증가 */
    }

    .bottom-sheet-header {
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      user-select: none;
      background: white;
      border-radius: 20px 20px 0 0;
    }

    .handle {
      width: 40px;
      height: 4px;
      background-color: #DDD;
      border-radius: 2px;
      margin-bottom: 12px;
    }

    .bottom-sheet-header h3 {
      margin: 0;
      font-size: 18px;
      color: #333;
    }

    .bottom-sheet-content {
      height: calc(45vh - 60px); /* 헤더 높이 제외, 60vh에서 45vh로 변경 */
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .expanded .bottom-sheet-content {
      height: calc(85vh - 60px); /* 확장 시 높이 조정 */
    }

    .company-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 0 16px 80px 16px; /* 좌우 패딩 추가 및 하단 여백 유지 */
    }

    .company-wrapper {
      margin-bottom: 12px;
    }

    .company-item {
      padding: 16px;
      background: #fff;
      border-radius: 12px 12px 0 0;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      gap: 16px;
      align-items: center;
      border: 1px solid #eee;
      margin-bottom: 0;
      border-bottom: none;
    }

    .company-item:hover {
      background: #f9f9f9;
    }

    .company-logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f1f1f1;
      border: 1px solid #e0e0e0;
    }

    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .placeholder-logo {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e1e1e1;
      color: #555;
      font-size: 24px;
      font-weight: bold;
    }

    .company-info {
      flex: 1;
      overflow: hidden;
    }

    .company-info h4 {
      margin: 0 0 4px 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .company-details {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .company-details p {
      margin: 0;
      font-size: 13px;
      color: #666;
      display: flex;
      align-items: center;
      gap: 4px;
      line-height: 1.4;
    }

    .company-type {
      font-weight: 500;
      color: #888 !important;
      margin-bottom: 2px !important;
    }

    .contact-icon, .address-icon {
      font-size: 16px;
      color: #777;
    }

    .company-contact, 
    .company-address,
    .company-type {
      margin: 4px 0;
      font-size: 14px;
      color: #666;
      display: flex;
      align-items: center;
    }

    .contact-icon, 
    .address-icon {
      margin-right: 6px;
      font-size: 16px;
    }

    /* 구성원 섹션 스타일 */
    .member-section {
      background: #f8f8f8;
      padding: 12px 16px;
      border: 1px solid #eee;
      border-top: none;
      border-radius: 0 0 12px 12px;
      cursor: default;
    }

    .company-members {
      display: flex;
      font-size: 15px;
      color: #333;
      margin: 0;
      font-weight: normal;
    }

    .member-count {
      color: #4B96B4;
      margin-left: 4px;
      font-weight: bold;
    }
    
    /* 구성원 목록 컨테이너 */
    .members-container {
      margin-top: 12px;
    }

    /* 구성원 목록 스타일 */
    .members-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .member-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }

    .member-name {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #333;
    }

    .position {
      font-weight: normal;
      color: #666;
      margin-left: 6px;
    }

    .member-phone, .member-email {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 6px 0;
      font-size: 14px;
      color: #555;
    }

    .icon {
      font-size: 16px;
    }

    .no-members, .loading {
      padding: 16px;
      text-align: center;
      color: #666;
      background: white;
      border-radius: 12px;
      margin-top: 8px;
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .bottom-sheet {
        background: #2a2a2a;
      }

      .bottom-sheet-header {
        background: #2a2a2a;
      }

      .bottom-sheet-header h3 {
        color: #fff;
      }

      .company-item {
        background: #333;
        border-color: #444;
      }

      .company-item:hover {
        background: #404040;
      }
      
      .member-section {
        background: #2a2a2a;
        border-color: #444;
      }
      
      .company-members {
        color: #ccc;
      }
      
      .member-count {
        color: #6aafd2;
      }

      .company-info h4 {
        color: #fff;
      }

      .company-details p {
        color: #ccc;
      }

      .company-type {
        color: #6aafd2 !important;
      }

      .placeholder-logo {
        background: #444;
        color: #ddd;
      }

      .company-count {
        color: #999;
      }

      .close-icon {
        color: #fff;
      }

      .close-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .member-card {
        background: #333;
        border-color: #444;
      }
      
      .member-name {
        color: #fff;
      }
      
      .position {
        color: #aaa;
      }
      
      .member-phone, .member-email {
        color: #ccc;
      }
      
      .no-members, .loading {
        background: #333;
        color: #ccc;
      }
    }

    /* iOS Safari 대응 */
    @supports (-webkit-touch-callout: none) {
      .bottom-sheet {
        padding-bottom: env(safe-area-inset-bottom);
      }
    }

    .company-count {
      font-size: 14px;
      color: #666;
      margin-left: 4px;
    }
  `]
})
export class CompaniesComponent implements OnInit {
  public companies: Company[] = [];
  private map: any;
  private geocoder: any;
  isBottomSheetExpanded = false;
  
  // 선택된 회사와 구성원 정보
  selectedCompanyId: string | null = null;
  companyMembers: CompanyMember[] = [];
  isLoadingMembers = false;
  
  // 드래그 관련 변수들
  private touchStartY = 0;
  private touchCurrentY = 0;
  private initialPosition = 0;
  bottomSheetPosition = 0;
  private readonly SNAP_TOP = 0;
  private readonly SNAP_BOTTOM = window.innerHeight - 200;

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {
    // 초기 바텀시트 위치 설정
    this.bottomSheetPosition = this.SNAP_BOTTOM - 80;
  }

  async ngOnInit() {
    try {
      console.log('회사 데이터 로딩 시작...');
      const response = await this.companyService.getCompanies();
      if (response.error) throw response.error;
      
      this.companies = response.data || [];
      console.log('로드된 회사 데이터:', this.companies);
      
      if (this.companies.length > 0) {
        await this.loadKakaoMapScript();
      } else {
        console.log('회사 데이터가 없습니다!');
      }
    } catch (error) {
      console.error('회사 데이터 로딩 중 에러:', error);
    }
  }

  private loadKakaoMapScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${environment.kakaoMap.apiKey}&libraries=services&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          console.log('카카오맵 스크립트 로드 완료!');
          this.loadMap();
          resolve();
        });
      };
      script.onerror = (error) => {
        console.error('카카오맵 스크립트 로드 실패:', error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  }

  private loadMap() {
    console.log('지도 로딩 시작...');
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 8
    };

    try {
      this.map = new window.kakao.maps.Map(container, options);
      console.log('지도 생성 성공!');
      this.addCompanyMarkers();
    } catch (error) {
      console.error('지도 생성 중 에러:', error);
    }
  }

  async addCompanyMarkers() {
    console.log('마커 추가 시작...');
    this.geocoder = new window.kakao.maps.services.Geocoder();

    for (const company of this.companies) {
      try {
        console.log(`${company.name}의 주소 변환 시작:`, company.address);
        
        await new Promise((resolve, reject) => {
          this.geocoder.addressSearch(company.address, (result: any[], status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              console.log(`${company.name}의 좌표:`, result[0]);
              
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              const marker = new window.kakao.maps.Marker({
                map: this.map,
                position: coords
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;">${company.name}</div>`
              });

              window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                infowindow.open(this.map, marker);
              });

              window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                infowindow.close();
              });

              console.log(`${company.name}의 마커 생성 완료!`);
            } else {
              console.error(`${company.name}의 주소 변환 실패:`, status);
            }
            resolve(null);
          });
        });
      } catch (error) {
        console.error(`${company.name}의 마커 생성 중 에러:`, error);
      }
    }
    console.log('모든 마커 추가 완료!');
  }

  // 터치 시작 시
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
    this.initialPosition = this.bottomSheetPosition;
    
    // 트랜지션 효과 제거로 드래그 시 자연스럽게
    const sheet = event.currentTarget as HTMLElement;
    sheet.style.transition = 'none';
  }

  // 터치 이동 시
  onTouchMove(event: TouchEvent) {
    event.preventDefault(); // 스크롤 방지
    this.touchCurrentY = event.touches[0].clientY;
    const deltaY = this.touchCurrentY - this.touchStartY;
    
    // 현재 위치 계산
    let newPosition = this.initialPosition + deltaY;
    
    // 경계값 처리
    if (newPosition < this.SNAP_TOP) newPosition = this.SNAP_TOP;
    if (newPosition > this.SNAP_BOTTOM) newPosition = this.SNAP_BOTTOM;
    
    this.bottomSheetPosition = newPosition;
  }

  // 터치 종료 시
  onTouchEnd() {
    // 트랜지션 효과 복구
    const sheet = document.querySelector('.bottom-sheet') as HTMLElement;
    if (sheet) {
      sheet.style.transition = 'transform 0.2s ease-out';
      
      // 현재 위치에 따라 스냅 위치 결정
      const middlePoint = (this.SNAP_TOP + this.SNAP_BOTTOM) / 2;
      
      if (this.bottomSheetPosition < middlePoint) {
        // 위로 스냅
        this.bottomSheetPosition = this.SNAP_TOP;
        this.isBottomSheetExpanded = true;
      } else {
        // 아래로 스냅
        this.bottomSheetPosition = this.SNAP_BOTTOM - 80;
        this.isBottomSheetExpanded = false;
      }
    }
  }

  toggleBottomSheet() {
    this.isBottomSheetExpanded = !this.isBottomSheetExpanded;
    this.bottomSheetPosition = this.isBottomSheetExpanded ? this.SNAP_TOP : this.SNAP_BOTTOM - 80;
  }

  selectCompany(company: Company, event: Event) {
    event.stopPropagation(); // 이벤트 버블링 중지
    
    // 이미 선택된 회사라면 접기/펼치기 토글
    if (this.selectedCompanyId === company.id) {
      this.selectedCompanyId = null;
      this.companyMembers = [];
      return;
    }
    
    // 선택된 회사로 지도 이동하기
    this.moveMapToCompany(company);
    
    // 선택된 회사 설정 및 구성원 데이터 로드
    this.selectedCompanyId = company.id;
    this.loadCompanyMembers(company.id);
    
    // 바텀시트가 닫혀있으면 열기
    if (!this.isBottomSheetExpanded) {
      this.isBottomSheetExpanded = true;
      this.bottomSheetPosition = this.SNAP_TOP;
    }
  }
  
  moveMapToCompany(company: Company) {
    this.geocoder.addressSearch(company.address, (result: any[], status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        this.map.setCenter(coords);
        this.map.setLevel(3); // 지도 확대
      }
    });
  }
  
  async loadCompanyMembers(companyId: string) {
    this.isLoadingMembers = true;
    this.companyMembers = [];
    
    try {
      const response = await this.companyService.getCompanyMembers(companyId);
      if (response.error) throw response.error;
      
      this.companyMembers = response.data || [];
    } catch (error) {
      console.error('구성원 데이터 로딩 중 에러:', error);
    } finally {
      this.isLoadingMembers = false;
    }
  }

  // 목록 버튼 클릭 시 바텀시트 열기
  openBottomSheet(event: Event) {
    event.stopPropagation(); // 이벤트 전파 중단
    this.isBottomSheetExpanded = true;
    this.bottomSheetPosition = this.SNAP_TOP;
  }

  // 회사 연락처 정보 가져오기 (members 필드에서 추출)
  getCompanyPhone(company: Company): string {
    if (!company.members || !Array.isArray(company.members) || company.members.length === 0) {
      // 임시 번호 생성 (실제 서비스에서는 제거)
      return `12-345-12345`;
    }
    
    try {
      // members 배열에서 연락처 정보 찾기
      for (const memberEntry of company.members) {
        // member_info 객체 확인
        if (memberEntry.member_info) {
          // contact 정보가 있는지 확인
          if (memberEntry.member_info.contact && memberEntry.member_info.contact.phone) {
            return memberEntry.member_info.contact.phone;
          }
        }
      }
      
      // 연락처가 없으면 기본 번호 반환
      return `12-345-12345`;
    } catch (error) {
      console.error('전화번호 추출 에러:', error);
      return `12-345-12345`;
    }
  }
} 