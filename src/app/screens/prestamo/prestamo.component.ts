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

    async ngOnInit() {
      this.currentUser = this.authService.getCurrentUser();

      const id = Number(this.activatedRoute.snapshot.queryParams['id']);
      if (id) {
        this.loan = await db.loans.get({ id });
        console.log(this.loan?.prestamista);
        console.log(this.currentUser?.id);
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
          this.status = this.loan.prestamista ? 'En solicitud' : 'Financiado';

          this.showButton = !!this.currentUser?.isPrestamista && this.currentUser.id !== this.loan.prestamista?.id;
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
