import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./screens/login/login.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // add a route to the LoginComponent
  // add other routes here...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
