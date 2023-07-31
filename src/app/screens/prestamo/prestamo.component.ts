import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loan, User, db } from 'src/app/database/db';
import { AuthenticationService } from 'src/service/authentication';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss']
})
export class PrestamoComponent {

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService) { }

    id: number = -1;
    amount: number = 0;
    tax: number = 0;
    months: number = 0;
    solicitedDate: string = '';
    risk: number = 0;
    userName: string = '';
    userAddress: string = '';
    userEmail: string = '';
    loan: Loan | undefined = undefined;
    status: string = '';
    currentUser: User | null = null;
    showButton: boolean = false;
    description: string = '';

    async ngOnInit() {
      this.currentUser = this.authService.getCurrentUser();

      const id = Number(this.activatedRoute.snapshot.queryParams['id']);
      if (id) {
        this.loan = await db.loans.get({ id });
        if (this.loan && this.loan.id) {
          this.id = this.loan.id;
          this.amount = this.loan.amount;
          this.tax = this.loan.tax;
          this.months = this.loan.months;
          this.solicitedDate = this.loan.solicitedDate.toDateString();
          this.risk = this.loan.risk;
          this.userName = this.loan.prestatario.name;
          this.userAddress = this.loan.prestatario.address;
          this.userEmail = this.loan.prestatario.email;
          this.status = this.loan.prestamista ? 'Financiado' : 'Abierto';
          this.description = this.loan.description ? this.loan.description : 'Sin Descripción';
          this.showButton = this.loan.prestatario.id !== this.currentUser?.id && !this.loan.prestamista;
        }
      }
    }

    async financiar() {
      if (this.loan && this.loan.id && this.currentUser) {
        this.loan.prestamista = this.currentUser;
        await db.loans.update(this.loan.id, this.loan);
        this.showButton = false;
      }
    }
}
