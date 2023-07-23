import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { LOGIN_PATH, PROFILE_PATH, SELECT_PROFILE_PATH, SIGN_UP_PATH } from "../../app-routing.module";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(private _eref: ElementRef) { }

  @Input() authenticated: boolean = false;

  menuOpen: boolean = false; // Add this line

  toggleMenu() { // And add this method
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    // Add your logout logic here
    console.log('Logout clicked');
    this.authenticated = false; // if you want to simulate a logout
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }

  protected readonly PROFILE_PATH = PROFILE_PATH;
  protected readonly SIGN_UP_PATH = SIGN_UP_PATH;
  protected readonly LOGIN_PATH = LOGIN_PATH;
  protected readonly SELECT_PROFILE_PATH = SELECT_PROFILE_PATH;
}
