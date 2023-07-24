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
      // authenticated so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate([`/${LOGIN_PATH}`]);
    return false;
  }

}
