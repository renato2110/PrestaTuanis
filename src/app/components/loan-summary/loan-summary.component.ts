import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-summary',
  templateUrl: './loan-summary.component.html',
  styleUrls: ['./loan-summary.component.scss']
})
export class LoanSummaryComponent {
  @Input() title: string = '';
  @Input() loanAmount: number = 0;
  @Input() id: number | undefined = undefined;
  @Input() interestRate: number = 0;

  constructor(private router: Router) {}

  viewDetails() {
    if (this.id !== undefined) {
      this.router.navigateByUrl(`prestamo?id=${this.id}`);
    }
  }
}
