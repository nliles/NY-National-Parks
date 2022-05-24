import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const ErrorMsg = ({ msg }) => <div className={styles.error}>{msg}</div>;

export default ErrorMsg;
