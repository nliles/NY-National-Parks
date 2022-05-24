import styles from "./index.module.scss";

const ErrorMsg = ({ msg }) => <div className={styles.error}>{msg}</div>;

export default ErrorMsg;
