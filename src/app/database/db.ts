// Inside db.ts

import { Dexie, Table } from "dexie";

export interface Loan {
  id?: number;
  amount: number;
  interestRate: number;
  period: number;
  solicitedDate: Date;
  monthlyPayment: number;
  prestamistaEmail: string;
  prestatarioEmail: string;
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

export class AppDB extends Dexie {
  users!: Table<User, number>;
  loans!: Table<Loan, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      users: '++id, email',
      loans: '++id, prestamistaEmail, prestatarioEmail',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    // Populate users
    const prestamistaId = await db.users.add({
      name: 'Fernando Mainieri',
      email: 'fernandomainieri@gmail.com',
      phone: '1234-5678',
      personalId: '123456789',
      address: '123 Street, City, Province',
      password: 'password1', // Add this line
      isPrestamista: true,
      isPrestatario: false
    });

    const prestatarioId = await db.users.add({
      name: 'Renato Rojas',
      email: 'renatorojas@gmail.com',
      phone: '5678-1234',
      personalId: '987654321',
      address: '456 Street, City, Province',
      password: 'password2', // Add this line
      companyName: 'Acme Corp.',
      companyId: '987654321',
      isPrestamista: false,
      isPrestatario: true
    });

    // Populate loans
    const loanId = await db.loans.add({
      amount: 5000,
      interestRate: 5,
      period: 12,
      solicitedDate: new Date(),
      monthlyPayment: 500,
      prestamistaEmail: 'johndoe@gmail.com',
      prestatarioEmail: 'janedoe@gmail.com'
    });
  }
}

export const db = new AppDB();
