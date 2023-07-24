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
    // Inicializar el formulario de inicio de sesión con Angular FormBuilder
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
      rememberMe: [false]
    });
  }

  ngOnInit() {
    // Establecer que la página actual es la página de inicio de sesión
    this.authService.setOnLoginPage(true);
  }

  async onSubmit() {
    const { email, password } = this.loginForm.value;

    // Obtener el usuario de la base de datos basado en el correo electrónico y contraseña ingresados
    const user = await db.users.get({ email: email, password: password });

    if (user) {
      // El usuario existe, establecerlo como usuario actual en el servicio de autenticación
      this.authService.setCurrentUser(user);
      if (user.isPrestamista) {
        // Redirigir a la página de perfil del Prestamista
        this.router.navigate([`/${PRESTAMISTA_PROFILE_PATH}`]);
      } else if (user.isPrestatario) {
        // Redirigir a la página de perfil del Prestatario
        this.router.navigate([`/${PRESTATARIO_PROFILE_PATH}`]);
      }
    } else {
      // El usuario no existe, mostrar mensaje de error
      this.errorMessage = 'Credenciales inválidas!';
    }
  }

  forgotPassword() {
    console.log('Clic en Olvidó la contraseña');
  }
}
