import { Link } from "react-router-dom";
import styles from "./index.module.css";

const NavBar = () => (
  <header className={styles.header}>
    <div className={styles.content}>
      <Link to={`/`}>
        <h1 className={styles.title}>US National Parks</h1>
      </Link>
    </div>
  </header>
);

export default NavBar;
