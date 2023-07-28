import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PRESTAMISTA } from "../../app-routing.module";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../../service/authentication";
import { db } from "../../database/db";

interface LoanSummary {
  title: string;
  loanAmount: number;
  interestRate: number;
  id?: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() profileType: 'Prestamista' | 'Prestatario' = 'Prestamista';

  showModal: boolean = false;



  // Load loans from db
  loans: LoanSummary[]  = [
    { title: 'Préstamo para Capital de Trabajo', loanAmount: 5000, interestRate: 8.2, id: 1 },
  ];


  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthenticationService) {
    this.profileForm = this.fb.group({});
  }


  async ngOnInit() {
    this.route.data.subscribe(async data => {
      this.profileType = data['profileType'];

      this.profileForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required]],
        phone: ['', Validators.required],
        personalId: ['', Validators.required,],
        address: ['', Validators.required]
      });

      if (this.profileType === 'Prestatario') {
        this.profileForm.addControl('companyName', this.fb.control('', Validators.required));
        this.profileForm.addControl('companyId', this.fb.control('', Validators.required));
      }

      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.profileForm.patchValue({
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          personalId: currentUser.personalId,
          address: currentUser.address,
          companyName: currentUser.companyName,
          companyId: currentUser.companyId
        });

        // Load loans from db
        if (this.profileType === 'Prestamista') {
          const loansFromDb = await db.loans.where('prestamista.id').equals(currentUser.id!).toArray();
          this.loans = loansFromDb.map(loan => ({
            title: loan.title,
            loanAmount: loan.amount,
            interestRate: loan.tax,
            id: loan.id
          }));
        } else if (this.profileType === 'Prestatario') {
          const loansFromDb = await db.loans.where('prestatario.id').equals(currentUser.id!).toArray();
          this.loans = loansFromDb.map(loan => ({
            title: loan.title,
            loanAmount: loan.amount,
            interestRate: loan.tax,
            id: loan.id
          }));
        }
      }
    });
  }



  async onSubmit() {
    console.log(this.profileForm.value, this.profileForm.valid);
    if (this.profileForm.valid) {
      const updatedUser = {
        ...this.authService.getCurrentUser(), // get the current user details
        ...this.profileForm.value // overwrite with the updated values from the form
      };

      console.log('updatedUser',updatedUser);

      // Update the user in the database
      await db.users.update(updatedUser.id!, updatedUser);

      // Update the user in the AuthenticationService
      this.authService.setCurrentUser(updatedUser);

      this.showModal = true;
    }
  }



  protected readonly PRESTAMISTA = PRESTAMISTA;
}
