import { AbstractControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  formutils = FormUtils;

  fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.formutils.namePattern)], []],
    email: ['', [Validators.required, Validators.pattern(this.formutils.emailPattern),], [FormUtils.checkingServerResponse]],
    username: ['', [Validators.required, Validators.pattern(this.formutils.notOnlySpacesPattern),FormUtils.notStrider], []],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required], []]
  }, {
    validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')]
  })

  onsubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);

  }
}
