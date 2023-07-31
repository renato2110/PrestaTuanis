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
  filteredData: Prestamo[] = [];
  searchFilter: string = '';
  searchFilterText: string = '';
  sinPrestamistas: boolean = false;
  filterOptions: DropdownValue[] = [{
    id: 'amount',
    text: 'Monto solicitado',
    tabindex: 12,
  },
  {
    id: 'tax',
    text: 'Tasa de interés',
    tabindex: 13,
  },
  {
    id: 'months',
    text: 'Periodo (meses)',
    tabindex: 14,
  }]

  async ngOnInit() {
    const loans = await db.loans.toArray();
    if (loans) {
      this.data = loans;
      this.filteredData = this.data;
    }
  }
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchValue: [, Validators.required],
      sinPrestamistas: [],
    });
  }

  async onSubmit() {
    if (this.searchForm.valid && this.searchFilterText!=='') {
      let obj = {
        [this.searchFilter]: Number(this.searchForm.value.searchValue)
      };
      const loans = await db.loans.where(obj).toArray();
      this.data = loans;
      this.filterData();
    }
  }

  selectFilterOption(value: DropdownValue) {
    this.searchFilter = value.id;
    this.searchFilterText = value.text;
    this.onSubmit();
  }

  filterData() {
    const sinPrestamistas = this.searchForm.value.sinPrestamistas;
    if (sinPrestamistas) {
      this.filteredData = this.filteredData.filter((loan) =>
        !loan.prestamista
      );
    }
    else {
      this.filteredData = this.data;
    }
  }
}
