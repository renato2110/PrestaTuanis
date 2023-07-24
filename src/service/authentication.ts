// authentication.service.ts
import { Injectable } from '@angular/core';
import { User } from "../app/database/db";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: User | null = null;
  private onLoginPage: boolean = true;

  constructor() { }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  logout() {
    this.currentUser = null;
  }

  setOnLoginPage(value: boolean) {
    this.onLoginPage = value;
  }

  getOnLoginPage(): boolean {
    return this.onLoginPage;
  }
}
