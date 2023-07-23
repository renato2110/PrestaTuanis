import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() rightChange = new EventEmitter<boolean>();

  onCheckboxChange(event: Event) {
    this.rightChange.emit((event.target as HTMLInputElement).checked);
  }
}
