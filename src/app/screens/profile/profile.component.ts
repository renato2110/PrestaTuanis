import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  loans = [
    { title: 'Préstamo para Capital de Trabajo', loanAmount: 5000, interestRate: 8.2 },
    { title: 'Préstamo para Expansión de Negocio', loanAmount: 8000, interestRate: 7.5 },
    { title: 'Préstamo para Compra de Maquinaria', loanAmount: 10000, interestRate: 6.7 },
    { title: 'Préstamo para Inversión en Tecnología', loanAmount: 6000, interestRate: 5.4 },
    { title: 'Préstamo para Adquisición de Franquicia', loanAmount: 7000, interestRate: 9.1 },
    { title: 'Préstamo para Renovación de Local Comercial', loanAmount: 5500, interestRate: 7.8 },
    { title: 'Préstamo para Inventario', loanAmount: 4500, interestRate: 6.9 },
    { title: 'Préstamo para Línea de Crédito', loanAmount: 3000, interestRate: 5.5 },
    { title: 'Préstamo para Expansión de Negocio', loanAmount: 7500, interestRate: 8.7 },
    { title: 'Préstamo para Capital de Trabajo', loanAmount: 4000, interestRate: 6.5 },
    { title: 'Préstamo para Compra de Equipo', loanAmount: 6500, interestRate: 7.2 },
    { title: 'Préstamo para Inversión en Marketing', loanAmount: 5500, interestRate: 6.8 },
    { title: 'Préstamo para Adquisición de Franquicia', loanAmount: 9000, interestRate: 9.5 },
    { title: 'Préstamo para Expansión de Negocio', loanAmount: 8000, interestRate: 8.9 },
    { title: 'Préstamo para Renovación de Local Comercial', loanAmount: 5200, interestRate: 7.6 },
    { title: 'Préstamo para Línea de Crédito', loanAmount: 3800, interestRate: 5.9 }
  ];


  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      id: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }


}
