import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <div class="app-container">
      <!-- 로고 영역 -->
      <div class="logo-container">
        <h1 class="logo-text">GJVA</h1>
      </div>

      <!-- 메뉴 버튼들 -->
      <div class="menu-container">
        <button class="menu-button">
          <span class="emoji-icon">🔍</span>
          <span>통합검색</span>
        </button>

        <button class="menu-button active">
          <span class="emoji-icon">👥</span>
          <span>조직도</span>
        </button>

        <button class="menu-button">
          <span class="emoji-icon">👤</span>
          <span>회원소개</span>
        </button>

        <button class="menu-button">
          <span class="emoji-icon">🏢</span>
          <span>기업소개</span>
        </button>
      </div>

      <!-- 하단 문구 -->
      <div class="bottom-text">
        <p>대한민국 벤처가 <span class="highlight">새 물결</span>을 이끌고</p>
        <p><span class="highlight">전 세계</span>를 흔들다.</p>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    .logo-container {
      margin-bottom: 40px;
    }
    .logo-text {
      font-size: 2.5em;
      color: #333;
    }
    .menu-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }
    .menu-button {
      padding: 20px;
      border: none;
      border-radius: 10px;
      background-color: #f8f9fa;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .menu-button:hover {
      background-color: #e9ecef;
      transform: translateY(-2px);
    }
    .menu-button.active {
      background-color: #007bff;
      color: white;
    }
    .emoji-icon {
      font-size: 2em;
      margin-bottom: 10px;
    }
    .bottom-text {
      font-size: 1.5em;
      line-height: 1.5;
    }
    .highlight {
      color: #007bff;
      font-weight: bold;
    }
  `]
})
export class MainComponent {
  // 여기에 메인 페이지 로직을 추가할 수 있어!
} 