import { FormEvent, useState } from "react";

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
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#00000019",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <button onClick={handleCloseNewOperationModal}>Close modal</button>
        <form onSubmit={submitForm}>
          <div className="input-field">
            <label htmlFor="operation-name">Operation name</label>
            <input
              value={operationName}
              onChange={(e) => setOperationName(e.target.value)}
              type="text"
              id="operation-name"
            />
          </div>

          <div className="input-field">
            <label htmlFor="operation-type">Operation type</label>
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

          <div className="input-field">
            <label htmlFor="operation-amount">Amount</label>
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

          <div className="input-field">
            <label htmlFor="operation-date">Date</label>
            <input
              value={operationDate}
              onChange={(e) => setOperationDate(e.target.value)}
              type="date"
              id="operation-date"
            />
          </div>

          <button type="submit">Add new operation</button>
        </form>
      </div>
    </div>
  );
}
