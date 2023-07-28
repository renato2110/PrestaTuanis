import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PRESTAMISTA_PROFILE_PATH, PRESTATARIO_PROFILE_PATH, SELECT_PROFILE_PATH } from '../../app-routing.module';
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
    // Inicializar el formulario de inicio de sesión con Angular FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit() {
    // Establecer que la página actual es la página de inicio de sesión
    this.authService.setOnLoginPage(true);
  }

  async onSubmit() {
    const { email, password } = this.loginForm.value;

    console.log('Email: ', email, 'Password: ', password);

    // Obtener el usuario de la base de datos basado en el correo electrónico y contraseña ingresados
    const user = await db.users.get({ email: email, password: password });

    console.log('Usuario encontrado1: ', user)

    if (user) {
      console.log('Usuario encontrado2: ', user)
      // El usuario existe, establecerlo como usuario actual en el servicio de autenticación
      this.authService.setCurrentUser(user);

      if (user.isPrestamista && user.isPrestatario) {
        // Both roles present, redirect to profile selection
        this.router.navigate([`/${SELECT_PROFILE_PATH}`]);
      } else if (user.isPrestamista) {
        // Only Prestamista role present, redirect to Prestamista profile
        this.router.navigate([`/${PRESTAMISTA_PROFILE_PATH}`]);
      } else if (user.isPrestatario) {
        // Only Prestatario role present, redirect to Prestatario profile
        this.router.navigate([`/${PRESTATARIO_PROFILE_PATH}`]);
      }
    } else {
      // El usuario no existe, mostrar mensaje de error
      this.errorMessage = 'Credenciales inválidas. Por favor intente de nuevo o regístrese si no tiene una cuenta.';
    }
  }


  forgotPassword() {
    console.log('Click en Olvidó la contraseña');
  }
}
