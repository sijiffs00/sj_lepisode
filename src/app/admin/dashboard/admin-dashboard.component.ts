import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  // 통계 데이터
  stats = {
    memberApprovals: 15,
    companyApprovals: 15,
    subscriptionApprovals: 15,
    infoUpdateApprovals: 15
  };

  // 회원 승인 요청 목록
  approvalRequests = [
    { id: 1, name: '레피소드 / 대표', status: 'pending' },
    { id: 2, name: '레피소드 / 이사', status: 'pending' },
    { id: 3, name: '레피소드 / 이사', status: 'pending' },
    { id: 4, name: '레피소드 / 이사', status: 'pending' },
    { id: 5, name: '레피소드 / 이사', status: 'pending' }
  ];

  // 페이지네이션 처리
  currentPage = 1;
  totalPages = 5;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initializeCharts();
  }

  private initializeCharts(): void {
    // 회원 수 차트 설정
    const membersChartConfig: ChartConfiguration = {
      type: 'line' as ChartType,
      data: {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
        datasets: [{
          data: [10, 12, 15, 18, 22, 25, 30],
          borderColor: '#4285f4',
          backgroundColor: 'rgba(66, 133, 244, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#4285f4'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,  // 가로:세로 비율을 2:1로 설정
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#333',
            bodyColor: '#666',
            borderColor: '#ddd',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 35,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              stepSize: 5
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    };

    // 기업 수 차트 설정
    const companiesChartConfig: ChartConfiguration = {
      type: 'line' as ChartType,
      data: {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
        datasets: [{
          data: [3, 4, 4, 5, 6, 7, 8],
          borderColor: '#34a853',
          backgroundColor: 'rgba(52, 168, 83, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#34a853'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,  // 가로:세로 비율을 2:1로 설정
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#333',
            bodyColor: '#666',
            borderColor: '#ddd',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 10,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              stepSize: 2
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    };

    // 총 등록회원 수 차트
    new Chart(
      document.getElementById('totalMembersChart') as HTMLCanvasElement,
      membersChartConfig
    );

    // 총 등록기업 수 차트
    new Chart(
      document.getElementById('totalCompaniesChart') as HTMLCanvasElement,
      companiesChartConfig
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  // 승인/거절 처리
  onApprove(id: number): void {
    console.log('Approved:', id);
  }

  onReject(id: number): void {
    console.log('Rejected:', id);
  }
}