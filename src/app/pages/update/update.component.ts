import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      affiliation: [''],
      position: [''],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
      // TODO: Implement update logic
    }
  }

  goBack() {
    this.router.navigate(['/main/mypage']);
  }
} 