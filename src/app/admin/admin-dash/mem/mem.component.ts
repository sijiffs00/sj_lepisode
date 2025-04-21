import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dash-mem',
  template: `
    <div class="member-management">
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .member-management {
      padding: 20px;
    }
  `]
})
export class AdminDashMemComponent {
  constructor() {}
} 