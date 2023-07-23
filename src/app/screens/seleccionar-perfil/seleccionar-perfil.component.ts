import { Component } from '@angular/core';

@Component({
  selector: 'app-seleccionar-perfil',
  templateUrl: './seleccionar-perfil.component.html',
  styleUrls: ['./seleccionar-perfil.component.scss']
})
export class SeleccionarPerfilComponent {

  content: string = "Parece que este usuario tiene asociadas dos distintas experiencias de usuario.\n¿Con cuál le gustaría iniciar sesión hoy?";

  loginAsPrestamista() {
    console.log('redireccionar a Prestamista');
  }

  loginAsPrestatario() {
    console.log('redireccionar a Prestatario');
  }
}
