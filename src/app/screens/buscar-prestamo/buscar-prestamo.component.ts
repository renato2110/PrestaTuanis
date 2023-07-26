import { Component } from '@angular/core';
import { Prestamo } from 'src/app/components/card-group/card-group.component';
import { db } from 'src/app/database/db';

@Component({
  selector: 'app-buscar-prestamo',
  templateUrl: './buscar-prestamo.component.html',
  styleUrls: ['./buscar-prestamo.component.scss']
})
export class BuscarPrestamoComponent {

  data: Prestamo[] = [];


  async ngOnInit() {
    const loans = await db.loans.toArray();
    if (loans) {
      this.data = loans;
    }
    
  }
}
