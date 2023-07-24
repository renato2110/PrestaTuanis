import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./screens/login/login.component";
import { ProfileComponent } from "./screens/profile/profile.component";
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { SeleccionarPerfilComponent } from './screens/seleccionar-perfil/seleccionar-perfil.component';
import { CrearPrestamoComponent } from './screens/crear-prestamo/crear-prestamo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'perfil-prestamista', component: ProfileComponent },
  { path: 'seleccionar-perfil', component: SeleccionarPerfilComponent },
  { path: 'crear-prestamo', component: CrearPrestamoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
