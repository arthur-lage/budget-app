import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { NewOperationModal } from "../../components/NewOperationModal";
import { PieChart } from "../../components/PieChart";
import { useAuth } from "../../hooks/useAuth";
import { IOperation } from "../../interfaces/IOperation";
import { api } from "../../services/api";

export function Home() {
  const { currentUser, updateUserBalance, logout } = useAuth();

  const [loading, setLoading] = useState(true);

  const [expensesPercentage, setExpensesPercentage] = useState(0);
  const [incomesPercentage, setIncomesPercentage] = useState(0);

  const [incomesTotal, setIncomesTotal] = useState(0);
  const [expensesTotal, setExpensesTotal] = useState(0);

  const [userOperations, setUserOperations] = useState<IOperation[] | null>(
    null
  );
  const [isNewOperationModalOpen, setIsNewOperationModalOpen] = useState(false);

  const navigate = useNavigate();

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
    if(currentUser && !currentUser.isEmailVerified) {
      return navigate("/not-verified")
    }
  }, [])

  useEffect(() => {
    async function fetchUserOperations() {
      try {
        console.log("rerreraj")
        const res = await api.get("/operations");

        updateUserBalance(res.data.newBalance);

        setUserOperations(res.data.operations);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    }

    fetchUserOperations();
  }, []);

  useEffect(() => {
    if (!userOperations) return;

    function calculateExpensesAndIncomes() {
      let newExpensesPercentage = 0;
      let newIncomesPercentage = 0;
      let newIncomesTotal = 0;
      let newExpensesTotal = 0;

      userOperations?.forEach((operation) => {
        if (operation) {
          if (operation.type === "expense") {
            newExpensesPercentage += operation.amount;
            newExpensesTotal += operation.amount;
          }

          if (operation.type === "income") {
            newIncomesPercentage += operation.amount;
            newIncomesTotal += operation.amount;
          }
        }
      });

      let convertedExpensesPercentage =
        (newExpensesPercentage / newIncomesPercentage) * 100;

      setExpensesPercentage(convertedExpensesPercentage);
      setExpensesTotal(newExpensesTotal);

      setIncomesPercentage(100 - convertedExpensesPercentage);
      setIncomesTotal(newIncomesTotal);
    }

    calculateExpensesAndIncomes();
  }, [userOperations]);

  return (
    <div>
      <header>
        <h1>Home</h1>
        <button onClick={logout}>Log Out</button>
      </header>

      {loading ? (
        <Loading />
      ) : (
        <main>
          <h2>Hello, {currentUser?.name}</h2>
          <h3>Current balance: {currentUser?.balance}</h3>

          {userOperations && userOperations.length > 0 && (
            <PieChart
              incomesTotal={incomesTotal}
              expensesTotal={expensesTotal}
              expenses={expensesPercentage}
              incomes={incomesPercentage}
            />
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
            <button
              onClick={handleOpenNewOperationModal}
              className="new-operation"
            >
              New operation
            </button>
          </div>

          {isNewOperationModalOpen && (
            <NewOperationModal
              addNewOperation={addNewOperation}
              handleCloseNewOperationModal={handleCloseNewOperationModal}
            />
          )}
        </main>
      )}
    </div>
  );
}
