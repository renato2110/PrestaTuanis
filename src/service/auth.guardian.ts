import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "./authentication";
import { LOGIN_PATH } from "../app/app-routing.module";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      // El usuario está autenticado, por lo que se permite el acceso.
      return true;
    }

    // El usuario no está autenticado, se redirige a la página de inicio de sesión con la URL de retorno.
    this.router.navigate([`/${LOGIN_PATH}`]);
    return false;
  }

}
