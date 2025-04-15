import { Component, OnInit } from '@angular/core';
import { supabase } from '../supabase';

@Component({
  selector: 'app-supabase-test',
  template: `
    <div class="connection-status">
      <small>{{ connectionStatus }}</small>
    </div>
  `,
  styles: [`
    .connection-status {
      position: fixed;
      bottom: 10px;
      right: 10px;
      padding: 8px;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
      font-size: 12px;
      color: #666;
      z-index: 1000;
      opacity: 0.7;
      transition: opacity 0.3s;
    }
    .connection-status:hover {
      opacity: 1;
    }
  `]
})
export class SupabaseTestComponent implements OnInit {
  connectionStatus: string = '테스트 중...';

  async ngOnInit() {
    try {
      // Supabase 연결 테스트 - 현재 시간 가져오기
      const { data, error } = await supabase
        .from('_realtime')
        .select('*')
        .limit(1);

      if (error) {
        this.connectionStatus = '❌ Supabase 연결 실패: ' + error.message;
        console.error('Supabase 연결 에러:', error);
      } else {
        this.connectionStatus = '✅ Supabase 연결 상태: 정상';
        console.log('Supabase 연결 성공!');
      }
    } catch (err) {
      this.connectionStatus = '❌ 연결 중 에러 발생';
      console.error('에러:', err);
    }
  }
} 