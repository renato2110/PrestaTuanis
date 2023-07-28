import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownValue } from 'src/app/components/button/button.component';
import { Prestamo } from 'src/app/components/card-group/card-group.component';
import { db } from 'src/app/database/db';

@Component({
  selector: 'app-buscar-prestamo',
  templateUrl: './buscar-prestamo.component.html',
  styleUrls: ['./buscar-prestamo.component.scss']
})
export class BuscarPrestamoComponent {
  searchForm: FormGroup;

  data: Prestamo[] = [];
  searchFilter: string = '';
  searchFilterText: string = '';
  filterOptions: DropdownValue[] = [{
    id: 'amount',
    text: 'Monto solicitado'
  },
  {
    id: 'tax',
    text: 'Tasa de interés'
  },
  {
    id: 'months',
    text: 'Periodo (meses)'
  }]

  async ngOnInit() {
    const loans = await db.loans.toArray();
    if (loans) {
      this.data = loans;
    }
  }
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchValue: [, Validators.required],
    });
  }

  async onSubmit() {
    let obj = {
      [this.searchFilter]: Number(this.searchForm.value.searchValue)
    };
    const loans = await db.loans.where(obj).toArray();
    this.data = loans;
  }

  selectFilterOption(value: DropdownValue) {
    this.searchFilter = value.id;
    this.searchFilterText = value.text;

  }
}
