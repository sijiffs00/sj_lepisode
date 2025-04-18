import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CompanyService, Company, CompanyResponse } from '../../services/company.service';

declare global {
  interface Window {
    kakao: any;
  }
}

@Component({
  selector: 'app-companies',
  template: `
    <div class="companies-container">
      <h2>기업현황</h2>
      <div id="map" class="map-container"></div>
    </div>
  `,
  styles: [`
    .companies-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: 100%;
      padding: 16px;
      box-sizing: border-box;
    }

    h2 {
      margin: 0 0 16px 0;
      font-size: 24px;
    }

    .map-container {
      width: 100%;
      height: calc(100vh - 180px); /* 화면 높이에서 헤더와 네비게이션 높이를 뺀 값 */
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class CompaniesComponent implements OnInit {
  private companies: Company[] = [];
  private map: any;
  private geocoder: any;

  constructor(private companyService: CompanyService) {}

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
} 