import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface Prestamo {
  id?: number;
  amount: number;
  tax: number;
  months: number;
  img?: string;
}

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss']
})

export class CardGroupComponent {
  @Input() data: Prestamo[] = [];

  constructor(private router: Router) {}

  viewDetails(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigateByUrl(`prestamo?id=${id}`);
    }
  }
}
