import styles from "./index.module.scss";

type ErrorProps = {
  msg: string
}

const ErrorMsg = ({ msg }: ErrorProps) => <div className={styles.error}>{msg}</div>;

export default ErrorMsg;
