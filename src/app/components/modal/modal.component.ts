import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() header: string = '';
  @Input() title: string = '';
  @Input() content: string = '';

  @Output() onClose = new EventEmitter<void>(); // Add this line

  closeModal() {
    this.onClose.emit(); // Replace your alert with this line
  }
}
