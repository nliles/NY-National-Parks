import { Link } from "react-router-dom";
import styles from "./index.module.css";

const NavBar = () => (
  <nav className={styles.nav}>
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to={`/`}>
          <h1 className={styles.title}>US National Parks</h1>
        </Link>
      </div>
    </header>
  </nav>
);

export default NavBar;
