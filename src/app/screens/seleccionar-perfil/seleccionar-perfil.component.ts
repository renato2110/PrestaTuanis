import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PRESTAMISTA_PROFILE_PATH, PRESTATARIO_PROFILE_PATH } from '../../app-routing.module';

@Component({
  selector: 'app-seleccionar-perfil',
  templateUrl: './seleccionar-perfil.component.html',
  styleUrls: ['./seleccionar-perfil.component.scss']
})
export class SeleccionarPerfilComponent {

  content: string = "Parece que este usuario tiene asociadas dos distintas experiencias de usuario.\n¿Con cuál le gustaría iniciar sesión hoy?";

  constructor(private router: Router) { }

  loginAsPrestamista() {
    this.router.navigate([`/${PRESTAMISTA_PROFILE_PATH}`]);
  }

  loginAsPrestatario() {
    this.router.navigate([`/${PRESTATARIO_PROFILE_PATH}`]);
  }
}
