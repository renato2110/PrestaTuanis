import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { db } from 'src/app/database/db';
import { AuthenticationService } from 'src/service/authentication';


@Component({
  selector: 'app-crear-prestamo',
  templateUrl: './crear-prestamo.component.html',
  styleUrls: ['./crear-prestamo.component.scss']
})

export class CrearPrestamoComponent {
  creationForm: FormGroup;
  fileSelected: File = new File([], 'image', undefined);
  @ViewChild('imagePreview') imagePreview: ElementRef | undefined;
  @ViewChild('inputFileUploaded', {static: false}) inputFileUploaded: ElementRef | undefined;

  probability: number = 0;
  totalAmount: number = 0;
  payment: number = 0;
  firstMonth: string = '';
  lastMonth: string = '';
  graphData: Object[] = [];
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.creationForm = this.fb.group({
      amount: [, Validators.required],
      description: ['', Validators.required],
      image: [, Validators.required],
      months: [, Validators.required],
      purpose: [, Validators.required],
      tax: [, Validators.required]
    });

    this.creationForm.valueChanges.subscribe(result => {
      this.calcResults(result);
    });
  }

  handleUploadLinkClick() {
    this.inputFileUploaded?.nativeElement.click();
  }

  async redirectToPrestamo() {
    const { amount, tax, months, description, purpose } = this.creationForm.value;
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const prestatario = await db.users.get({ email: currentUser.email, password: currentUser.password });
      if (prestatario) {

        const reader = new FileReader();
        let image;
        reader.readAsDataURL(this.fileSelected);
        reader.onload = async () => {
          image = reader.result as string;
          const newLoan = await db.loans.add({
            title: purpose,
            amount: Number(amount),
            tax: Number(tax),
            months: Number(months),
            solicitedDate: new Date(),
            monthlyPayment: this.payment,
            risk: this.probability,
            img: image,
            prestatario,
            description: description,
          });
          this.router.navigateByUrl(`prestamo?id=${newLoan}`);
        };

      }
    }
  }

  onSubmit() {
    if (this.creationForm.valid) {
      this.showModal = true;
    }
  }

  handleFileChanged() {
    this.fileSelected = this.inputFileUploaded?.nativeElement.files[0];
    const src = URL.createObjectURL(this.fileSelected);
    this.imagePreview?.nativeElement.setAttribute('src', src);
  }

  calcResults(result: any) {
    this.totalAmount = Number(result.amount);
    if (result.months) {
      this.payment =  Math.round(this.totalAmount / result.months);
      const tax = Number(result.tax)
      const nextMonthDate = this.getNextMonthDate();
      this.calcProbability(this.totalAmount, Number(result.months), tax);
      this.calcGraphData(Number(result.months), nextMonthDate, this.payment, tax);
      this.firstMonth = nextMonthDate.toDateString();
      nextMonthDate.setMonth(nextMonthDate.getMonth() + Number(result.months-1));
      this.lastMonth = nextMonthDate.toDateString();
    }
  }

  getNextMonthDate() {
    var now = new Date();
    if (now.getMonth() == 11) {
        return new Date(now.getFullYear() + 1, 0, 1);
    } else {
        return new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
  }

  calcGraphData(months: number, firstMonth: Date, amount: number, tax: number) {
    let newGraphData: Object[] = [];
    let lastAmount = amount;
    for (let i = 0; i < months; i++) {
      let month: string | number = i;
      if (months <= 12) {
        const newDate = new Date(firstMonth.getTime());
        newDate.setMonth(newDate.getMonth() + i)
        month = newDate.toLocaleString('default', {month: 'short'})
      }
      const payment = Math.round((lastAmount * tax) / 100);
      this.totalAmount += payment;
      lastAmount += payment;
      newGraphData.push({
        month,
        gold: payment
      });
    };
    this.graphData = newGraphData;
  }

  calcProbability(amount: number, months: number, tax: number) {
    let newProbability = 0;
    // Calcular probabilidad de acuerdo a la cantidad de meses (min:10 y max:30)
    newProbability += months <= 24 ? 30 : months <= 48 ? 20 : 10;
    // Calcular probabilidad de acuerdo a la cantidad de interes (min:10 y max:30)
    newProbability += tax <= 10 ? 10 : tax < 20 ? 20 : 30;
    // Calcular probabilidad de acuerdo a la cantidad solicitada (min:10 y max:30)
    newProbability += amount <= 2000 ? 30 : amount <= 5000 ? 20 : 10;
    this.probability = newProbability;
  }
}
