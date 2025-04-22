import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { supabase } from '../../supabase';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  userId: number | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      company: [''],  // 회사 이름을 보여주기 위한 필드
      department: [''],  // position을 department로 변경
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    // URL에서 userId를 가져오기
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.loadUserData();
      } else {
        this.errorMessage = '사용자 정보를 찾을 수 없습니다.';
        setTimeout(() => this.goBack(), 2000); // 2초 후 이전 페이지로 이동
      }
    });
  }

  async loadUserData() {
    try {
      this.isLoading = true;
      this.errorMessage = '';

      // users 테이블과 companies 테이블을 join해서 한번에 가져오기
      const { data: userData, error } = await supabase
        .from('users')
        .select(`
          *,
          company:companies(name)
        `)
        .eq('id', this.userId)
        .single();

      if (error) throw error;

      console.log('가져온 사용자 데이터:', userData); // 디버깅용 로그 추가

      // 폼에 데이터 설정
      this.updateForm.patchValue({
        name: userData.name || '',
        company: userData.company?.name || '',  // companies 테이블에서 가져온 회사 이름
        department: userData.department || '',  // department 필드 사용
        contact: userData.contact || '',
        email: userData.email || ''
      });

      console.log('폼에 설정된 값:', this.updateForm.value); // 디버깅용 로그 추가

    } catch (error) {
      console.error('사용자 정보 로드 중 오류:', error);
      this.errorMessage = '사용자 정보를 불러오는 중 오류가 발생했습니다.';
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit() {
    if (this.updateForm.valid && this.userId) {
      try {
        this.isLoading = true;
        this.errorMessage = '';

        const formData = this.updateForm.value;
        
        // users 테이블 업데이트
        const { error } = await supabase
          .from('users')
          .update({
            name: formData.name,
            department: formData.department,
            contact: formData.contact,
            email: formData.email
          })
          .eq('id', this.userId);

        if (error) throw error;

        // 성공적으로 업데이트되면 마이페이지로 이동
        this.router.navigate(['/main/mypage']);
        
      } catch (error) {
        console.error('정보 업데이트 중 오류:', error);
        this.errorMessage = '정보 업데이트 중 오류가 발생했습니다.';
      } finally {
        this.isLoading = false;
      }
    }
  }

  goBack() {
    this.router.navigate(['/main/mypage']);
  }
} 