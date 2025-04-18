import { Component } from '@angular/core';

@Component({
  selector: 'app-mypage',
  template: `
    <div class="mypage-container">
      <h2>마이페이지</h2>
      <!-- 여기에 마이페이지 구현 -->
    </div>
  `,
  styles: [`
    .mypage-container {
      padding: 16px;
    }
  `]
})
export class MyPageComponent {} 