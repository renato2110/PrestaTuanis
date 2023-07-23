import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
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
}
