import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() primary: boolean = false;
  @Input() underline: boolean = false;

  activate() {
alert('a');
  }

  deactivate() {
alert('de');
  }
}
