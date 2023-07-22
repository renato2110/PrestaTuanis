import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() header: string = '';
  @Input() title: string = '';
  @Input() content: string = '';

  closeModal() {
    alert('Close');
  }
}
