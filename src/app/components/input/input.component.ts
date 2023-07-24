import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() textArea: boolean = false;
  @Input() pattern: string = '';
  @Input() patternExample: string = '';
  value: string = '';
  active: boolean = false;

  formControl: FormControl = new FormControl(''); // Initialize here

  private onChange = (value: string) => {};
  private onTouched = () => {};

  ngOnChanges(): void {
    if (this.pattern) this.formControl.setValidators(Validators.pattern(this.pattern));
  }

  writeValue(value: string): void {
    this.value = value;
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}
