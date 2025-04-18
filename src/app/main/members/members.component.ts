import { Component } from '@angular/core';

@Component({
  selector: 'app-members',
  template: `
    <div class="members-container">
      <h2>회원소개</h2>
      <!-- 여기에 회원 목록 구현 -->
    </div>
  `,
  styles: [`
    .members-container {
      padding: 16px;
    }
  `]
})
export class MembersComponent {} 