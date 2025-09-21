import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-pages',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-pages.component.html',
})
export class SwitchesPagesComponent {

  private fb = inject(FormBuilder);

  formUtils = FormUtils;
  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotification: [true],
    termAndConditions: [false, Validators.requiredTrue],
  })


  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }

}


