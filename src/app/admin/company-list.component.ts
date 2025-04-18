import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

interface Company {
  id: number;
  name: string;
  industry: string;
  ceo_name: string;
  created_at: string;
}

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="company-list-container">
      <div class="page-header">
        <h2>기업 목록</h2>
      </div>
      
      <div class="search-container">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="기업명 검색..." [(ngModel)]="searchTerm">
        </div>
      </div>

      <div class="table-container">
        <table class="company-table">
          <thead>
            <tr>
              <th>순번</th>
              <th>기업명</th>
              <th>업종</th>
              <th>대표자</th>
              <th>가입일시</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let company of companies; let i = index">
              <td>{{i + 1}}</td>
              <td>{{company.name}}</td>
              <td>{{company.industry}}</td>
              <td>{{company.ceo_name}}</td>
              <td>{{company.created_at | date:'yyyy-MM-dd HH:mm'}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .company-list-container {
      padding: 20px;
    }

    .page-header {
      margin-bottom: 16px;
    }

    .page-header h2 {
      font-size: 24px;
      color: #2c3e50;
      margin: 0;
    }

    .search-container {
      margin-bottom: 24px;
    }

    .search-box {
      position: relative;
      width: 300px;
    }

    .search-box i {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #95a5a6;
    }

    .search-box input {
      width: 100%;
      padding: 10px 10px 10px 35px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }

    .add-btn {
      background: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.3s;
    }

    .add-btn:hover {
      background: #2980b9;
    }

    .table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .company-table {
      width: 100%;
      border-collapse: collapse;
    }

    .company-table th,
    .company-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    .company-table th {
      background: #f8f9fa;
      color: #2c3e50;
      font-weight: 600;
    }

    .company-table tr:hover {
      background: #f8f9fa;
    }

    .company-table td {
      color: #2c3e50;
    }
  `]
})
export class CompanyListComponent implements OnInit {
  searchTerm = '';
  companies: Company[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.companies = await this.supabaseService.getCompanies();
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  }
} 