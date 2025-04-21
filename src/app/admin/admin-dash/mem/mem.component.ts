import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { supabase } from '../../../supabase';

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
export class AdminDashMemComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    // 필요한 초기화 작업이 있다면 여기에 추가
  }
} 