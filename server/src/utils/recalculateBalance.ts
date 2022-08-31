import { Operation } from "@prisma/client";

export function recalculateBalance(operations: Operation[]) {
  let newBalance = 0;

  if (operations.length > 0) {
    operations.forEach((operation) => {
      if (operation.type == "expense") {
        newBalance -= operation.amount;
      } else if (operation.type == "income") {
        newBalance += operation.amount;
      }
    });
  }

  return newBalance;
}
