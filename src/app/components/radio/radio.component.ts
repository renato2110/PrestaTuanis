import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';
  @Output() selectedOptionChange = new EventEmitter<string>();

  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.selectedOption = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onRadioChange(option: string) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption);
    this.onChange(this.selectedOption);
    this.onTouched();
  }
}
