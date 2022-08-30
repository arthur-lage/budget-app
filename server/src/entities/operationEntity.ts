import { v4 as uuid } from "uuid";

export class Operation {
  public readonly id: string;
  public name: string;
  public type: string;
  public amount: number;
  public date: Date;
  public userId: string;

  constructor(
    name: string,
    type: string,
    amount: number,
    date: Date,
    userId: string
  ) {
    this.id = uuid();
    this.name = name;
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.userId = userId;
  }
}
