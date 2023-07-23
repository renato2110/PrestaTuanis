import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loan-summary',
  templateUrl: './loan-summary.component.html',
  styleUrls: ['./loan-summary.component.scss']
})
export class LoanSummaryComponent {
  @Input() title: string = '';
  @Input() loanAmount: number = 0;
  @Input() interestRate: number = 0;
}
