import { IOperation } from "../../interfaces/IOperation";
import { OperationCard } from "../OperationCard";

import styles from "./styles.module.scss";

type Props = {
  userOperations: IOperation[] | null;
  setUserOperations: (userOperations: IOperation[]) => void;
  updateUserBalance: (newBalance: number) => void;
};

export function OperationList({
  userOperations,
  setUserOperations,
  updateUserBalance,
}: Props) {
  return (
    <div className={styles.container}>
      {userOperations && userOperations.length > 0 ? (
        <>
          {userOperations?.map((userOperation) => (
            <OperationCard
              key={userOperation.id}
              operation={userOperation}
              setUserOperations={setUserOperations}
              updateUserBalance={updateUserBalance}
              userOperations={userOperations}
            />
          ))}
        </>
      ) : (
        <h2 className={styles.noOperations}>NO OPERATIONS FOUND</h2>
      )}
    </div>
  );
}
