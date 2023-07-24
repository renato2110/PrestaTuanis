import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PRESTAMISTA_PROFILE_PATH, PRESTATARIO_PROFILE_PATH } from '../../app-routing.module';
import { db } from "../../database/db";
import { AuthenticationService } from "../../../service/authentication";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
      rememberMe: [false]
    });
  }

  ngOnInit() {
    this.authService.setOnLoginPage(true);
  }

  async onSubmit() {
    const { email, password } = this.loginForm.value;

    const user = await db.users.get({ email: email, password: password });

    if (user) {
      this.authService.setCurrentUser(user);
      // User exists, redirect to profile page
      if (user.isPrestamista) {
        // Redirect to Prestamista profile page
        this.router.navigate([`/${PRESTAMISTA_PROFILE_PATH}`]);
      } else if (user.isPrestatario) {
        // Redirect to Prestatario profile page
        this.router.navigate([`/${PRESTATARIO_PROFILE_PATH}`]);
      }
    } else {
      // User doesn't exist, show error message
      this.errorMessage = 'Credenciales invalidas!';
    }
  }

  forgotPassword() {
    console.log('Forgot password clicked');
  }
}
