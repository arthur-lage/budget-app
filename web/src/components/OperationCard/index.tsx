import { IOperation } from "../../../../server/src/interfaces/IOperation";

import ThreeDotsIcon from "../../assets/three-dots-icon.svg";
import DeleteIcon from "../../assets/delete-icon.svg";
import { api } from "../../services/api";

import styles from "./styles.module.scss";
import { formatter } from "../../utils/currencyFormater";

type Props = {
  operation: Omit<IOperation, "userId">;
  userOperations: IOperation[] | null;
  updateUserBalance: (newBalance: number) => void;
  setUserOperations: (newOperationsList: IOperation[]) => void;
};

export function OperationCard({
  operation,
  userOperations,
  updateUserBalance,
  setUserOperations,
}: Props) {
  async function handleDeleteOperation(operationId: string) {
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

  function handleOperationDetails(operation: Omit<IOperation, "userId">) {}

  return (
    <article className={styles.container} key={operation.id}>
      <section className={styles.information}>
        <div className={styles.left}>
          <p className={styles.operationName}>{operation.name}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.property}>
            <p className={styles.propertyName}>Date</p>
            <p className={styles.propertyValue}>
              {new Date(operation.date).getFullYear()}/
              {new Date(operation.date).getMonth()}/
              {new Date(operation.date).getDate()}
            </p>
          </div>
          <div className={styles.property}>
            <p className={styles.propertyName}>Type</p>
            <p className={styles.propertyValue}>
              {operation.type.charAt(0).toUpperCase()}
              {operation.type.slice(1)}
            </p>
          </div>
          <div className={styles.property}>
            <p className={styles.propertyName}>Amount</p>
            <p className={styles.propertyValue}>
              {formatter.format(operation.amount)}
            </p>
          </div>
          <div className={styles.property}>
            <p className={styles.propertyName}>Created at</p>
            <p className={styles.propertyValue}>
              {new Date(operation.date).getFullYear()}/
              {new Date(operation.date).getMonth()}/
              {new Date(operation.date).getDate()}
            </p>
          </div>
        </div>
      </section>
      <section className={styles.actions}>
        <button
          className={styles.detailsButton}
          onClick={() => handleOperationDetails(operation)}
        >
          <img src={ThreeDotsIcon} alt="Operation Details Icon" />
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => handleDeleteOperation(operation.id)}
        >
          <img src={DeleteIcon} alt="Delete Operation Icon" />
        </button>
      </section>
    </article>
  );
}
