import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { db } from 'src/app/database/db';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss']
})
export class PrestamoComponent {

  constructor(private activatedRoute: ActivatedRoute) { }

    id: number = -1;
    amount: number = 0;
    tax: number = 0;
    months: number = 0;
    solicitedDate: string = '';
    risk: number = 0;
    userName: string = '';
    userAddress: string = '';
    userEmail: string = '';
    status: string = '';

    async ngOnInit() {
      const id = Number(this.activatedRoute.snapshot.queryParams['id']);
      if (id) {
        const loan = await db.loans.get({ id });
        if (loan && loan.id) {
          this.id = loan.id;
          this.amount = loan.amount;
          this.tax = loan.tax;
          this.months = loan.months;
          this.solicitedDate = loan.solicitedDate.toDateString();
          this.risk = loan.risk;
          this.userName = loan.prestatario.name;
          this.userAddress = loan.prestatario.address;
          this.userEmail = loan.prestatario.email;
          this.status = loan.prestamista ? 'En solicitud' : 'Financiado';
        }
      }
    }
}
