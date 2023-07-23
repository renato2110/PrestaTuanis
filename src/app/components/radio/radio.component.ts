import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';
  @Output() selectedOptionChange = new EventEmitter<string>();

  onRadioChange(option: string) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption);
  }
}
