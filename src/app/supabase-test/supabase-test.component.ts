import { Component, OnInit } from '@angular/core';
import { supabase } from '../supabase';

@Component({
  selector: 'app-supabase-test',
  template: `
    <div>
      <h2>Supabase 연결 테스트</h2>
      <p>{{ connectionStatus }}</p>
    </div>
  `
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
        this.connectionStatus = '✅ Supabase 연결 성공!';
        console.log('Supabase 연결 성공!');
      }
    } catch (err) {
      this.connectionStatus = '❌ 연결 중 에러 발생';
      console.error('에러:', err);
    }
  }
} 