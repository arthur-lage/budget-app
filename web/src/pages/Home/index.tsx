import { useEffect, useState } from "react";
import { NewOperationModal } from "../../components/NewOperationModal";
import { useAuth } from "../../hooks/useAuth";
import { IOperation } from "../../interfaces/IOperation";
import { api } from "../../services/api";

export function Home() {
  const { currentUser, logout } = useAuth();
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
    const newOperation = await api.post("/operations", {
      name: operation.name,
      type: operation.type,
      amount: operation.amount,
      date: operation.date,
    });

    //@ts-ignore
    setUserOperations((prev) => [...prev, newOperation.data.operation]);
  }

  async function deleteOperation(operationId: string) {
    await api.delete("/operations/" + operationId);

    let newUserOperationsList =
      userOperations && userOperations?.length > 1
        ? userOperations?.filter(
            (userOperation) => userOperation.id != operationId
          )
        : [];

    setUserOperations(newUserOperationsList);
  }

  useEffect(() => {
    async function fetchUserOperations() {
      const res = await api.get("/operations");

      setUserOperations(res.data.operations);
    }

    fetchUserOperations();
  }, []);

  async function handleDeleteAllOperations() {
    await api.delete("/operations");

    setUserOperations([]);
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>Hello, {currentUser?.name}</h2>

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
