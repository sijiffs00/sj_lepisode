import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

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
  ngOnInit() {
    this.loadKakaoMapScript();
  }

  private loadKakaoMapScript() {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${environment.kakaoMap.apiKey}&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        this.initializeMap();
      });
    };
    document.head.appendChild(script);
  }

  private initializeMap() {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(35.1595454, 126.8526012), // 광주광역시 중심 좌표
      level: 7 // 지도 확대 레벨
    };
    const map = new window.kakao.maps.Map(container, options);

    // 예시: 마커 추가
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(35.1595454, 126.8526012),
      map: map
    });
  }
} 