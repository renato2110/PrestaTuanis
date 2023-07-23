import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./screens/login/login.component";
import { AppComponent } from "./app.component";
import { ProfileComponent } from "./screens/profile/profile.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'perfil-prestamista', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
