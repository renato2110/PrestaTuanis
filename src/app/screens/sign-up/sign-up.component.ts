import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../../service/authentication";
import { db, User } from "../../database/db";
import { PRESTAMISTA, PRESTAMISTA_PROFILE_PATH, PRESTATARIO, PRESTATARIO_PROFILE_PATH } from "../../app-routing.module";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      userType: [PRESTATARIO, Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit() {
    this.authService.setOnLoginPage(false);
  }

  async onSubmit() {
    const { name, email, password, userType } = this.signUpForm.value;

    // Create a new user object
    const newUser: User = {
      name: name,
      email: email,
      password: password,
      isPrestamista: userType === PRESTAMISTA,
      isPrestatario: userType === PRESTATARIO,
      phone: '',
      personalId: '',
      address: ''
    };

    // Add the new user to the users table
    const userId = await db.users.add(newUser);

    // Log the user in
    this.authService.setCurrentUser({ ...newUser, id: userId })

    // Redirect to the appropriate profile page
    if (userType === 'Prestamista') {
      this.router.navigate([`/${PRESTAMISTA_PROFILE_PATH}`]);
    } else if (userType === 'Prestatario') {
      this.router.navigate([`/${PRESTATARIO_PROFILE_PATH}`]);
    }
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    // Only apply the validator if both fields are filled
    if(password && confirmPassword) {
      if (password !== confirmPassword) {
        return { passwordsNotMatching: true };
      }
    }
    return null;
  }


  signUpFormIsValid() {
    return this.signUpForm.valid;
  }
}
