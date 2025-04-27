import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-data-example',
  template: `
    <div>
      <h2>데이터 목록</h2>
      <div *ngIf="loading">로딩 중...</div>
      <div *ngIf="error">오류 발생: {{ error }}</div>
      <ul *ngIf="items && items.length > 0">
        <li *ngFor="let item of items">{{ item.name }}</li>
      </ul>
      <div *ngIf="items && items.length === 0">데이터가 없습니다.</div>
    </div>
  `,
  styles: []
})
export class DataExampleComponent implements OnInit {
  items: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  async loadItems() {
    try {
      this.loading = true;
      this.error = null;
      
      // Supabase 서비스를 사용해 데이터 가져오기
      const data = await this.supabaseService.getItems();
      
      if (data) {
        this.items = data;
      } else {
        this.items = [];
      }
    } catch (err: any) {
      this.error = err.message || '데이터를 가져오는 중 오류가 발생했습니다.';
      console.error('데이터 로딩 오류:', err);
    } finally {
      this.loading = false;
    }
  }
} 