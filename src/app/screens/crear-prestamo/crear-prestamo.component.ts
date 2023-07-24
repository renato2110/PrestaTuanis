import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


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

  constructor(private fb: FormBuilder) {
    this.creationForm = this.fb.group({
      amount: [],
      description: [''],
      image: [],
      months: [],
      purpose: [],
      tax: []
    });

    this.creationForm.valueChanges.subscribe(result => {
      this.calcResults(result);
    });
  }

  handleUploadLinkClick() {
    this.inputFileUploaded?.nativeElement.click();
  }

  onSubmit() {
    console.log(this.creationForm.value);
  }

  handleFileChanged() {
    this.fileSelected = this.inputFileUploaded?.nativeElement.files[0];
    const src = URL.createObjectURL(this.fileSelected);
    this.imagePreview?.nativeElement.setAttribute('src', src);
  }

  calcResults(result: any) {
    this.totalAmount = Math.round(Number(result.amount) + ((result.amount * result.tax) / 100));
    if (result.months) {
      this.payment =  Math.round(this.totalAmount / result.months);
      const nextMonthDate = this.getNextMonthDate();
      this.calcGraphData(Number(result.months), nextMonthDate);
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

  calcGraphData(months: number, firstMonth: Date) {
    let newGraphData: Object[] = [];
    for (let i = 0; i < months; i++) {
      let month: string | number = i;
      if (months <= 12) {
        const newDate = new Date(firstMonth.getTime());
        newDate.setMonth(newDate.getMonth() + i)
        month = newDate.toLocaleString('default', {month: 'short'})
      }
      newGraphData.push({
        month,
        gold: this.payment
      });
    };
    this.graphData = newGraphData;
    console.log(this.graphData);
  }
}