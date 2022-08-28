import { IExpense } from "./IExpense";
import { IIncome } from "./IIncome";

export interface IUser {
  id: string;
  name: string;
  email: string;
  balance: number;
  expenses: IExpense[];
  incomes: IIncome[];
}
