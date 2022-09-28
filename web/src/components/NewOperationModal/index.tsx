import { X } from "phosphor-react";
import { FormEvent, useState } from "react";

import styles from './styles.module.scss'

type NewOperationModalProps = {
  handleCloseNewOperationModal: () => void;
  addNewOperation: (operation: any) => void;
};

export function NewOperationModal({
  handleCloseNewOperationModal,
  addNewOperation,
}: NewOperationModalProps) {
  const [operationName, setOperationName] = useState("");
  const [operationType, setOperationType] = useState("income");
  const [operationAmount, setOperationAmount] = useState(0);
  const [operationDate, setOperationDate] = useState<string>(convertDateToYearMonthDay(new Date().toISOString()));

  function convertDateToYearMonthDay(date: string) {
    return date.split("T")[0]
  }

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    addNewOperation({
      name: String(operationName),
      type: String(operationType),
      amount: Number(operationAmount),
      date: operationDate,
    });

    setOperationName("");
    setOperationType("income")
    setOperationAmount(0);
    setOperationDate(convertDateToYearMonthDay(new Date().toISOString()));

    handleCloseNewOperationModal();
  }

  return (
    <div
      className={styles.container}
    >
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleCloseNewOperationModal}>
          <X size={64} color="#000" />
        </button>
        <form className={styles.form} onSubmit={submitForm}>
          <div className={styles.inputField}>
            <label htmlFor="operation-name">Operation Name</label>
            <input
              value={operationName}
              onChange={(e) => setOperationName(e.target.value)}
              type="text"
              id="operation-name"
            />
          </div>

          

          <div className={styles.inputField}>
            <label htmlFor="operation-amount">Operation Amount</label>
            <input
              value={operationAmount}
              //@ts-ignore
              onChange={(e) => setOperationAmount(e.target.value)}
              type="number"
              min="0"
              step="any"
              id="operation-amount"
            />
          </div>

          <div className={styles.inputField}>
            <label htmlFor="operation-type">Operation Type</label>
            <select
              onChange={(e) => setOperationType(e.target.value)}
              value={operationType}
              id="operation-type"
            >
              <option defaultChecked value="income">
                Income
              </option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className={styles.inputField}>
            <label htmlFor="operation-date">Operation Date</label>
            <input
              value={operationDate}
              onChange={(e) => setOperationDate(e.target.value)}
              type="date"
              id="operation-date"
            />
          </div>

          <button className={styles.newOperation} type="submit">Create Operation</button>
        </form>
      </div>
    </div>
  );
}
