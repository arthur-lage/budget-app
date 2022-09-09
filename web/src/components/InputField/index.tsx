import styles from "./styles.module.scss";

type InputFieldProps = {
  inputType: string;
  inputId: string;

  labelText: string;

  valueState: string;
  setValueState: (e: string) => void;
};

export function InputField({
  inputType = "text",
  inputId,
  valueState,
  labelText,
  setValueState,
}: InputFieldProps) {
  return (
    <div className={styles.inputField}>
      <input
        type={inputType}
        id={inputId}
        className={styles.inputBox}
        placeholder=" "
        value={valueState}
        onChange={(e) => setValueState(e.target.value)}
      />
      <label htmlFor={inputId} className={styles.inputLabel}>
        {labelText}
      </label>
    </div>
  );
}
