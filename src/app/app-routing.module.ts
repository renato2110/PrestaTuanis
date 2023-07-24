import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./screens/login/login.component";
import { ProfileComponent } from "./screens/profile/profile.component";
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { SeleccionarPerfilComponent } from './screens/seleccionar-perfil/seleccionar-perfil.component';
import { CrearPrestamoComponent } from './screens/crear-prestamo/crear-prestamo.component';

export const LOGIN_PATH = 'login';
export const PRESTAMISTA_PROFILE_PATH = 'perfil-prestamista';
export const PRESTATARIO_PROFILE_PATH = 'perfil-prestatario';

export const SIGN_UP_PATH = 'sign-up';
export const SELECT_PROFILE_PATH = 'seleccionar-perfil';

export const CREAR_PRESTAMO_PATH = 'crear-prestamos';

export const PRESTAMISTA = 'Prestamista';
export const PRESTATARIO = 'Prestatario';

const routes: Routes = [
  { path: LOGIN_PATH, component: LoginComponent },
  { path: SIGN_UP_PATH, component: SignUpComponent },
  { path: PRESTAMISTA_PROFILE_PATH, component: ProfileComponent, data: { profileType: PRESTAMISTA } },
  { path: PRESTATARIO_PROFILE_PATH, component: ProfileComponent, data: { profileType: PRESTATARIO } },
  { path: SELECT_PROFILE_PATH, component: SeleccionarPerfilComponent },
  { path: CREAR_PRESTAMO_PATH, component: CrearPrestamoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
