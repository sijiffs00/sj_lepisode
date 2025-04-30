import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-company',
  template: `
    <div class="register-company-container">
      <div class="header">
        <button class="back-button" (click)="goBack()">
          <span class="back-icon">〈</span>
        </button>
        <h1>기업 등록</h1>
      </div>

      <div class="content">
        <p class="description">기업등록을 위해 정보를 입력해주세요.</p>

        <div class="form-group">
          <label>기업로고</label>
          <div class="logo-upload-box">
            <div class="logo-preview">
              <img src="assets/icons/image-placeholder.svg" alt="로고 업로드">
            </div>
            <button class="upload-button">파일 선택</button>
            <p class="upload-hint">최소 100px X 100px 사이즈의 이미지파일을 등록해주세요.</p>
          </div>
        </div>

        <div class="form-group">
          <label>기업명 <span class="required">*</span></label>
          <input type="text" placeholder="입력해주세요" [(ngModel)]="companyName">
        </div>

        <div class="form-group">
          <label>대표자명 <span class="required">*</span></label>
          <input type="text" placeholder="입력해주세요" [(ngModel)]="ceoName">
        </div>

        <div class="form-group">
          <label>기업 소재지 <span class="required">*</span></label>
          <div class="address-inputs">
            <input type="text" placeholder="입력해주세요" [(ngModel)]="address" readonly>
            <button class="search-button" (click)="searchAddress()">주소 검색</button>
          </div>
          <input type="text" placeholder="상세주소를 입력해주세요" [(ngModel)]="addressDetail">
        </div>

        <div class="form-group">
          <label>기업 업종 <span class="required">*</span></label>
          <div class="industry-inputs">
            <input type="text" placeholder="입력해주세요" [(ngModel)]="industry">
            <button class="search-button" (click)="goToIndustrySelect()">업종 검색</button>
          </div>
        </div>

        <div class="form-group">
          <label>사업자등록증</label>
          <div class="file-upload-box">
            <button class="upload-button">
              <img src="assets/icons/upload.svg" alt="파일 선택">
              파일 선택
            </button>
            <p class="upload-hint">파일 선택 버튼을 눌러 파일을 직접 선택해 주세요.</p>
          </div>
          <div class="uploaded-file" *ngIf="businessLicenseFile">
            <span>사업자등록증 20... [jpg, 93KB]</span>
            <button class="delete-button">삭제</button>
          </div>
        </div>
      </div>

      <div class="bottom-buttons">
        <button class="cancel-button" (click)="goBack()">취소</button>
        <button class="submit-button" [disabled]="!isFormValid()">등록</button>
      </div>
    </div>
  `,
  styles: [`
    .register-company-container {
      background: #FFFFFF;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #F0F0F0;
      background: #FFFFFF;
    }

    .back-button {
      background: none;
      border: none;
      padding: 0;
      margin-right: 16px;
      cursor: pointer;
    }

    .back-icon {
      font-size: 24px;
      color: #333333;
    }

    h1 {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      color: #333333;
    }

    .content {
      flex: 1;
      padding: 24px 16px;
      max-width: 600px;
      margin: 0 auto;
      width: 100%;
    }

    .description {
      font-size: 14px;
      color: #666666;
      margin-bottom: 32px;
    }

    .form-group {
      margin-bottom: 24px;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      margin-bottom: 8px;
    }

    .required {
      color: #5BBBB3;
      margin-left: 2px;
    }

    input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #EEEEEE;
      border-radius: 8px;
      font-size: 15px;
      color: #333333;
      background: #FAFAFA;
    }

    input::placeholder {
      color: #999999;
    }

    .logo-upload-box {
      border: 1px dashed #DDDDDD;
      border-radius: 8px;
      padding: 24px;
      text-align: center;
    }

    .logo-preview {
      width: 100px;
      height: 100px;
      border: 1px dashed #DDDDDD;
      border-radius: 8px;
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .upload-button {
      background: #FFFFFF;
      border: 1px solid #5BBBB3;
      color: #5BBBB3;
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 14px;
      cursor: pointer;
    }

    .upload-hint {
      font-size: 12px;
      color: #999999;
      margin-top: 8px;
    }

    .address-inputs, .industry-inputs {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }

    .search-button {
      flex-shrink: 0;
      padding: 12px 16px;
      background: #FFFFFF;
      border: 1px solid #5BBBB3;
      color: #5BBBB3;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
    }

    .file-upload-box {
      border: 1px dashed #DDDDDD;
      border-radius: 8px;
      padding: 24px;
      text-align: center;
    }

    .uploaded-file {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background: #F8F8F8;
      border-radius: 8px;
      margin-top: 8px;
    }

    .delete-button {
      background: none;
      border: none;
      color: #FF6B6B;
      font-size: 14px;
      cursor: pointer;
      padding: 4px 8px;
    }

    .bottom-buttons {
      padding: 16px;
      border-top: 1px solid #EEEEEE;
      display: flex;
      gap: 8px;
    }

    .cancel-button, .submit-button {
      flex: 1;
      padding: 16px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
    }

    .cancel-button {
      background: #FFFFFF;
      border: 1px solid #DDDDDD;
      color: #666666;
    }

    .submit-button {
      background: #5BBBB3;
      border: none;
      color: #FFFFFF;
    }

    .submit-button:disabled {
      background: #DDDDDD;
      cursor: not-allowed;
    }

    /* 다크모드 대응 */
    @media (prefers-color-scheme: dark) {
      .register-company-container {
        background: #1A1A1A;
      }

      .header {
        background: #1A1A1A;
        border-bottom-color: #333333;
      }

      .back-icon {
        color: #FFFFFF;
      }

      h1 {
        color: #FFFFFF;
      }

      label {
        color: #FFFFFF;
      }

      input {
        background: #2A2A2A;
        border-color: #333333;
        color: #FFFFFF;
      }

      input::placeholder {
        color: #666666;
      }

      .description {
        color: #999999;
      }

      .logo-upload-box,
      .file-upload-box {
        border-color: #333333;
      }

      .logo-preview {
        border-color: #333333;
      }

      .uploaded-file {
        background: #2A2A2A;
      }

      .bottom-buttons {
        border-top-color: #333333;
      }

      .cancel-button {
        background: #2A2A2A;
        border-color: #333333;
        color: #999999;
      }
    }
  `]
})
export class RegisterCompanyComponent {
  companyName: string = '';
  ceoName: string = '';
  address: string = '';
  addressDetail: string = '';
  industry: string = '';
  businessLicenseFile: File | null = null;

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {
    // 업종 선택 페이지에서 전달받은 데이터 처리
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { selectedIndustry: string };
      if (state.selectedIndustry) {
        this.industry = state.selectedIndustry;
      }
    }
  }

  // 주소 검색 팝업을 띄우는 함수
  searchAddress() {
    new (window as any).daum.Postcode({
      oncomplete: (data: any) => {
        // NgZone을 사용하여 Angular의 변경 감지 체계 안에서 실행
        this.ngZone.run(() => {
          // 도로명 주소가 있는 경우 도로명 주소를, 없는 경우 지번 주소를 사용
          this.address = data.roadAddress || data.jibunAddress;
          
          // 건물명이 있는 경우 건물명도 추가
          if (data.buildingName) {
            this.address += ` (${data.buildingName})`;
          }

          // 상세주소 입력창으로 포커스 이동
          setTimeout(() => {
            const detailInput = document.querySelector('input[placeholder="상세주소를 입력해주세요"]');
            if (detailInput) {
              (detailInput as HTMLInputElement).focus();
            }
          }, 100);
        });
      }
    }).open();
  }

  goBack() {
    this.router.navigate(['/main/find-company']);
  }

  goToIndustrySelect() {
    this.router.navigate(['/main/industry_select']);
  }

  isFormValid(): boolean {
    return !!(this.companyName && this.ceoName && this.address && this.industry);
  }
} 