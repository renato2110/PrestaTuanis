import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() name: string = 'radio';
  selectedOption: string = '';
}
