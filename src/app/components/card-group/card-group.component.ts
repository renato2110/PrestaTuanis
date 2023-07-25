import { Component, Input } from '@angular/core';

interface Prestamo {
  amount: number;
  tax: number;
  months: number;
  img: string;
}

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss']
})

export class CardGroupComponent {
  @Input() data: Prestamo[] = [];
}
