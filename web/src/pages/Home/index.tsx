import { useState } from "react";
import { NewOperationModal } from "../../components/NewOperationModal";
import { useAuth } from "../../hooks/useAuth";

export function Home() {
  const { currentUser, logout } = useAuth();
  const [userOperations, setUserOperations] = useState<any>([]);
  const [isNewOperationModalOpen, setIsNewOperationModalOpen] = useState(false);

  function handleOpenNewOperationModal() {
    setIsNewOperationModalOpen(true);
  }

  function handleCloseNewOperationModal() {
    setIsNewOperationModalOpen(false);
  }

  function addNewOperation(operation: any) {
    //@ts-ignore
    setUserOperations((prev) => [...prev, operation]);
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>Hello, {currentUser?.name}</h2>

      <div className="operations">
        {/* @ts-ignore */}
        {userOperations.map((userOperation) => (
          <div>
            Name: {userOperation?.name}, R${userOperation?.amount}, Date:{" "}
            {userOperation?.date}, Type: {userOperation?.type}
          </div>
        ))}
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
