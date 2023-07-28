// Inside db.ts

import { Dexie, Table } from "dexie";

export interface Loan {
  id?: number;
  title: string;
  amount: number;
  tax: number;
  months: number;
  solicitedDate: Date;
  monthlyPayment: number;
  risk: number;
  img?: string;
  prestamista?: User;
  prestatario: User;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  personalId: string;
  address: string;
  password: string; // Add this line
  isPrestamista: boolean;
  isPrestatario: boolean;
  companyName?: string;
  companyId?: string;
}

const prestatario = {
  name: 'Renato Rojas',
  email: 'renatorojas@gmail.com',
  phone: '5678-1234',
  personalId: '987654321',
  address: '456 Street, City, Province',
  password: 'password2',
  companyName: 'Acme Corp.',
  companyId: '987654321',
  isPrestamista: false,
  isPrestatario: true
};

const prestatarioWhoIsAlsoPrestamista = {
  name: 'Don Juan',
  email: 'donjuan@gmail.com',
  phone: '5678-1234',
  personalId: '987654321',
  address: '456 Street, City, Province',
  password: 'password3',
  companyName: 'Acme Corp.',
  companyId: '987654321',
  isPrestamista: true,
  isPrestatario: true
};

const prestamista = {
  name: 'Fernando Mainieri',
  email: 'fernandomainieri@gmail.com',
  phone: '1234-5678',
  personalId: '123456789',
  address: '123 Street, City, Province',
  password: 'password1',
  isPrestamista: true,
  isPrestatario: false
};

export class AppDB extends Dexie {
  users!: Table<User, number>;
  loans!: Table<Loan, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(2).stores({
      users: '++id, email',
      loans: '++id, id, prestatario.id, prestamista.id',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    // Populate users
    const prestamistaId = await db.users.add(prestamista);

    const prestatarioId = await db.users.add(prestatario);

    const prestatarioWhoIsAlsoPrestamistaId = await db.users.add(prestatarioWhoIsAlsoPrestamista);

    console.log('prestamistaId: ', prestatarioWhoIsAlsoPrestamistaId);


    // Populate loans
    const loanId = await db.loans.add({
      id: 1,
      title: 'Préstamo de prueba 1',
      amount: 5000,
      tax: 5,
      months: 12,
      solicitedDate: new Date(),
      monthlyPayment: 500,
      risk: 25,
      img: '',
      prestatario: prestatario,
    });

    // Populate loans
    const loanId2 = await db.loans.add({
      id: 2,
      title: 'Préstamo de prueba 2',
      amount: 5000,
      tax: 5,
      months: 12,
      solicitedDate: new Date(),
      monthlyPayment: 500,
      risk: 25,
      img: '',
      prestatario: prestatario,
      prestamista: prestamista
    });

    // Populate loans
    const loanId3 = await db.loans.add({
      id: 3,
      title: 'Préstamo de prueba 3',
      amount: 5000,
      tax: 5,
      months: 12,
      solicitedDate: new Date(),
      monthlyPayment: 500,
      risk: 25,
      img: '',
      prestatario: prestatario,
      prestamista: prestatarioWhoIsAlsoPrestamista
    });
  }
}

export const db = new AppDB();
