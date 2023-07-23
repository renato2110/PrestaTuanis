import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      terms: [false],
      userType: ['Prestatario']
    });
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }
}
