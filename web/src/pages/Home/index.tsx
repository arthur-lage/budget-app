import { useEffect, useState } from "react";
import { NewOperationModal } from "../../components/NewOperationModal";
import { PieChart } from "../../components/PieChart";
import { useAuth } from "../../hooks/useAuth";
import { IOperation } from "../../interfaces/IOperation";
import { api } from "../../services/api";

export function Home() {
  const { currentUser, updateUserBalance, logout } = useAuth();

  const [expensesPercentage, setExpensesPercentage] = useState(0);
  const [incomesPercentage, setIncomesPercentage] = useState(0);

  const [userOperations, setUserOperations] = useState<IOperation[] | null>(
    null
  );
  const [isNewOperationModalOpen, setIsNewOperationModalOpen] = useState(false);

  function handleOpenNewOperationModal() {
    setIsNewOperationModalOpen(true);
  }

  function handleCloseNewOperationModal() {
    setIsNewOperationModalOpen(false);
  }

  async function addNewOperation(operation: IOperation) {
    const res = await api.post("/operations", {
      name: operation.name,
      type: operation.type,
      amount: operation.amount,
      date: operation.date,
    });

    updateUserBalance(res.data.newBalance);

    //@ts-ignore
    setUserOperations((prev) => [...prev, res.data.operation]);
  }

  async function deleteOperation(operationId: string) {
    const res = await api.delete("/operations/" + operationId);

    let newUserOperationsList =
      userOperations && userOperations?.length > 1
        ? userOperations?.filter(
            (userOperation) => userOperation.id != operationId
          )
        : [];

    updateUserBalance(res.data.newBalance);

    setUserOperations(newUserOperationsList);
  }

  async function handleDeleteAllOperations() {
    const res = await api.delete("/operations");

    updateUserBalance(res.data.newBalance);

    setUserOperations([]);
  }

  useEffect(() => {
    async function fetchUserOperations() {
      const res = await api.get("/operations");

      updateUserBalance(res.data.newBalance);

      setUserOperations(res.data.operations);
    }

    fetchUserOperations();
  }, []);

  useEffect(() => {
    if (!userOperations) return;

    function calculateExpensesAndIncomesPercentage() {
      let newExpensesPercentage = 0;
      let newIncomesPercentage = 0;

      userOperations?.forEach((operation) => {
        if (operation.type === "expense") {
          newExpensesPercentage += operation.amount;
        }

        if (operation.type === "income") {
          newIncomesPercentage += operation.amount;
        }
      });

      let convertedExpensesPercentage =
        (newExpensesPercentage / newIncomesPercentage) * 100;

      setExpensesPercentage(convertedExpensesPercentage);
      setIncomesPercentage(100 - convertedExpensesPercentage);
    }

    calculateExpensesAndIncomesPercentage();
  }, [userOperations]);

  return (
    <div>
      <h1>Home</h1>
      <h2>Hello, {currentUser?.name}</h2>
      <h3>Current balance: {currentUser?.balance}</h3>

      {userOperations && (
        <PieChart expenses={expensesPercentage} incomes={incomesPercentage} />
      )}

      <div className="operations">
        <button onClick={handleDeleteAllOperations}>
          Delete all operations
        </button>
        <h2>Operations</h2>
        {userOperations && userOperations.length > 0 ? (
          <>
            {/* @ts-ignore */}
            {userOperations.map((userOperation) => (
              <div key={userOperation.id}>
                <p>Name: {userOperation?.name}</p>
                <p>R${userOperation?.amount}</p>
                {/* @ts-ignore */}
                <p>Date: {String(userOperation?.date)}</p>
                <p>Type: {userOperation?.type}</p>
                <button onClick={() => deleteOperation(userOperation.id)}>
                  Delete Operation
                </button>
              </div>
            ))}
          </>
        ) : (
          <h2>NO OPERATIONS FOUND</h2>
        )}
        <button onClick={handleOpenNewOperationModal} className="new-operation">
          New operation
        </button>
      </div>

      {isNewOperationModalOpen && (
        <NewOperationModal
          addNewOperation={addNewOperation}
          handleCloseNewOperationModal={handleCloseNewOperationModal}
        />
      )}

      <button onClick={logout}>Log Out</button>
    </div>
  );
}
