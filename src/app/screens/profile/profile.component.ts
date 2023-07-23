import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PRESTAMISTA } from "../../app-routing.module";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() profileType: 'Prestamista' | 'Prestatario' = 'Prestamista';


  showModal: boolean = false;


  loans = [
    { title: 'Préstamo para Capital de Trabajo', loanAmount: 5000, interestRate: 8.2 },
    { title: 'Préstamo para Expansión de Negocio', loanAmount: 8000, interestRate: 7.5 },
    { title: 'Préstamo para Compra de Maquinaria', loanAmount: 10000, interestRate: 6.7 },
    { title: 'Préstamo para Inversión en Tecnología', loanAmount: 6000, interestRate: 5.4 },
    { title: 'Préstamo para Adquisición de Franquicia', loanAmount: 7000, interestRate: 9.1 },
    { title: 'Préstamo para Renovación de Local Comercial', loanAmount: 5500, interestRate: 7.8 },
    { title: 'Préstamo para Compra de Maquinaria', loanAmount: 10000, interestRate: 6.7 },
    { title: 'Préstamo para Inversión en Tecnología', loanAmount: 6000, interestRate: 5.4 },
    { title: 'Préstamo para Adquisición de Franquicia', loanAmount: 7000, interestRate: 9.1 },
    { title: 'Préstamo para Renovación de Local Comercial', loanAmount: 5500, interestRate: 7.8 },
  ];


  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.profileForm = this.fb.group({});
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.profileType = data['profileType'];

      this.profileForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        id: ['', Validators.required],
        address: ['', Validators.required]
      });

      if (this.profileType === 'Prestatario') {
        this.profileForm.addControl('companyName', this.fb.control('', Validators.required));
        this.profileForm.addControl('companyId', this.fb.control('', Validators.required));
      }
    });
  }




  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      this.showModal = true;
    }
  }


  protected readonly PRESTAMISTA = PRESTAMISTA;
}
