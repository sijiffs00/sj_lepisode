import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  template: `
    <div class="org-container">
      <div class="header">
        <img src="assets/gjva_logo.png" alt="GJVA 로고" class="logo">
        <h1 class="title">조직도</h1>
      </div>
      
      <div class="org-list">
        <button class="org-item" (click)="navigateToDetail('chairman')">
          <div class="org-icon"></div>
          <span>회장</span>
          <div class="arrow-icon"></div>
        </button>

        <button class="org-item" (click)="navigateToDetail('advisors')">
          <div class="org-icon"></div>
          <span>자문위원</span>
          <div class="arrow-icon"></div>
        </button>

        <button class="org-item" (click)="navigateToDetail('directors')">
          <div class="org-icon"></div>
          <span>이사회/고문</span>
          <div class="arrow-icon"></div>
        </button>

        <button class="org-item">
          <div class="org-icon"></div>
          <span>상근부회장, 사무국장</span>
          <div class="arrow-icon"></div>
        </button>

        <button class="org-item">
          <div class="org-icon"></div>
          <span>동부/서부 사업본부</span>
          <div class="arrow-icon"></div>
        </button>

        <button class="org-item">
          <div class="org-icon"></div>
          <span>4차산업미래분과</span>
          <div class="arrow-icon"></div>
        </button>

        <button class="org-item">
          <div class="org-icon"></div>
          <span>ICT융합분과</span>
          <div class="arrow-icon"></div>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      width: 100%;
    }

    :host ::ng-deep * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .org-container {
      min-height: 100vh;
      background-color: white;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    .header {
      background-color: #008EAD;
      padding: 20px;
      width: 100%;
    }

    .logo {
      width: 120px;
      height: auto;
      margin-bottom: 10px;
    }

    .title {
      color: white;
      font-size: 24px;
      font-weight: bold;
    }

    .org-list {
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding: 0 20px;
      background-color: white;
    }

    .org-item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 20px 0;
      background: white;
      border: none;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      text-align: left;
      font-size: 16px;
    }

    .org-icon {
      width: 24px;
      height: 24px;
      margin-right: 12px;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23008EAD"><path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    .arrow-icon {
      width: 24px;
      height: 24px;
      margin-left: auto;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999999"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  `]
})
export class OrganizationComponent {
  constructor(private router: Router) {}
  
  navigateToDetail(tab: string) {
    this.router.navigate(['/main/org/detail'], { 
      queryParams: { tab } 
    });
  }
} 