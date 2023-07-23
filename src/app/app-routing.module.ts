import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./screens/login/login.component";
import { ProfileComponent } from "./screens/profile/profile.component";
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { SeleccionarPerfilComponent } from './screens/seleccionar-perfil/seleccionar-perfil.component';

export const LOGIN_PATH = 'login';
export const PROFILE_PATH = 'perfil';
export const SIGN_UP_PATH = 'sign-up';
export const SELECT_PROFILE_PATH = 'seleccionar-perfil';

const routes: Routes = [
  { path: LOGIN_PATH, component: LoginComponent },
  { path: SIGN_UP_PATH, component: SignUpComponent },
  { path: PROFILE_PATH, component: ProfileComponent },
  { path: SELECT_PROFILE_PATH, component: SeleccionarPerfilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
