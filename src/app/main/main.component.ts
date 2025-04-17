import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <div class="main-container">
      <header class="main-header">
        <h1>광주전남벤처기업협회</h1>
        <p>환영합니다! 👋</p>
      </header>
      
      <div class="content">
        <div class="welcome-card">
          <h2>오늘도 좋은 하루 되세요!</h2>
          <p>이곳에서 다양한 서비스를 이용하실 수 있습니다.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .main-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .main-header {
      background: linear-gradient(180deg, #5BBBB3 0%, #80CBC7 100%);
      color: white;
      padding: 40px 20px;
      border-radius: 15px;
      text-align: center;
      margin-bottom: 30px;
    }

    .main-header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .main-header p {
      margin: 10px 0 0;
      font-size: 16px;
      opacity: 0.9;
    }

    .content {
      display: grid;
      gap: 20px;
    }

    .welcome-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .welcome-card h2 {
      color: #333;
      margin: 0 0 10px;
      font-size: 20px;
    }

    .welcome-card p {
      color: #666;
      margin: 0;
      font-size: 16px;
    }
  `]
})
export class MainComponent {} 