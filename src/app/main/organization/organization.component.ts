import { Component } from '@angular/core';

@Component({
  selector: 'app-organization',
  template: `
    <div class="org-container">
      <h2>조직도</h2>
      <!-- 여기에 조직도 구현 -->
    </div>
  `,
  styles: [`
    .org-container {
      padding: 16px;
    }
  `]
})
export class OrganizationComponent {} 