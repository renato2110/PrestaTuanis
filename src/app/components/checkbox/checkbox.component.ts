import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() right: boolean = false;
  active: boolean = false;

  toggleActive() {
    this.active = !this.active;
  }
}
