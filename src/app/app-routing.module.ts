import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./screens/login/login.component";
import { ProfileComponent } from "./screens/profile/profile.component";
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { SeleccionarPerfilComponent } from './screens/seleccionar-perfil/seleccionar-perfil.component';
import { CrearPrestamoComponent } from './screens/crear-prestamo/crear-prestamo.component';
import { AuthGuard } from "../service/auth.guardian";
import { PrestamoComponent } from './screens/prestamo/prestamo.component';

export const LOGIN_PATH = 'login';
export const PRESTAMISTA_PROFILE_PATH = 'perfil-prestamista';
export const PRESTATARIO_PROFILE_PATH = 'perfil-prestatario';

export const SIGN_UP_PATH = 'sign-up';
export const SELECT_PROFILE_PATH = 'seleccionar-perfil';

export const PRESTAMO_PATH = 'prestamo';
export const CREAR_PRESTAMO_PATH = 'crear-prestamo';

export const PRESTAMISTA = 'Prestamista';
export const PRESTATARIO = 'Prestatario';

const routes: Routes = [
  { path: '', redirectTo: LOGIN_PATH, pathMatch: 'full' }, // Default
  { path: LOGIN_PATH, component: LoginComponent },
  { path: SIGN_UP_PATH, component: SignUpComponent },
  { path: PRESTAMISTA_PROFILE_PATH, component: ProfileComponent, data: { profileType: PRESTAMISTA }, canActivate: [AuthGuard] },
  { path: PRESTATARIO_PROFILE_PATH, component: ProfileComponent, data: { profileType: PRESTATARIO }, canActivate: [AuthGuard] },
  { path: SELECT_PROFILE_PATH, component: SeleccionarPerfilComponent, canActivate: [AuthGuard] },
  { path: PRESTAMO_PATH, component: PrestamoComponent, canActivate: [AuthGuard] },
  { path: CREAR_PRESTAMO_PATH, component: CrearPrestamoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
