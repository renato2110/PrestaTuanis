import { Component, ElementRef, HostListener, Input } from '@angular/core';
import {
  LOGIN_PATH,
  PRESTAMISTA_PROFILE_PATH,
  PRESTATARIO_PROFILE_PATH,
  SELECT_PROFILE_PATH,
  SIGN_UP_PATH
} from "../../app-routing.module";
import { AuthenticationService } from "../../../service/authentication";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(private _eref: ElementRef, private authService: AuthenticationService) { }

  menuOpen: boolean = false; // Add this line

  toggleMenu() { // And add this method
    this.menuOpen = !this.menuOpen;
  }

  get authenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    console.log('Logout clicked');
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }

  protected readonly SIGN_UP_PATH = SIGN_UP_PATH;
  protected readonly LOGIN_PATH = LOGIN_PATH;
  protected readonly SELECT_PROFILE_PATH = SELECT_PROFILE_PATH;
  protected readonly PRESTAMISTA_PROFILE_PATH = PRESTAMISTA_PROFILE_PATH;
  protected readonly PRESTATARIO_PROFILE_PATH = PRESTATARIO_PROFILE_PATH;
}
