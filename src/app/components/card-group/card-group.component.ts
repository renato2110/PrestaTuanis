import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/database/db';

export interface Prestamo {
  id?: number;
  amount: number;
  prestamista?: User;
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
