import { v4 as uuid } from "uuid";

// import { IExpense } from "../interfaces/IExpense";
// import { IIncome } from "../interfaces/IIncome";

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public balance: number;

  constructor(name: string, email: string, password: string) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.balance = 0;
  }
}
