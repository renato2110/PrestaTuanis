import { Component } from '@angular/core';

@Component({
  selector: 'app-buscar-prestamo',
  templateUrl: './buscar-prestamo.component.html',
  styleUrls: ['./buscar-prestamo.component.scss']
})
export class BuscarPrestamoComponent {

  data = [{
    amount: 3000,
    tax: 13,
    months: 24,
    img: "../../../assets/avatar.png"
  },{
    amount: 4000,
    tax: 12,
    months: 20,
    img: "../../../assets/avatar.png"
  },{
    amount: 1000,
    tax: 6,
    months: 36,
    img: "../../../assets/avatar.png"
  },{
    amount: 3000,
    tax: 13,
    months: 24,
    img: "../../../assets/avatar.png"
  },{
    amount: 4000,
    tax: 12,
    months: 20,
    img: "../../../assets/avatar.png"
  },{
    amount: 1000,
    tax: 6,
    months: 36,
    img: "../../../assets/avatar.png"
  }];
}
