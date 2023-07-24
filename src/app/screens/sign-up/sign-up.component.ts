import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from "../../../service/authentication";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
    this.signUpForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      terms: [false],
      userType: ['Prestatario']
    });
  }

  ngOnInit() {
    this.authService.setOnLoginPage(false);
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }
}
