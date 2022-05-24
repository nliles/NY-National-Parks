import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import styles from "./index.module.scss";

const NavBar = () => {
  const { pathname } = useLocation();
  return (
    <nav className={styles.nav}>
      <header className={styles.header}>
        <div className={styles.content}>
          <Link to={`/`}>
            <h1 className={styles.title}>US National Parks</h1>
          </Link>
        </div>
      </header>
      <div className={cn([styles.image], {
        [styles.show]: pathname === '/'
      })} />
    </nav>
  );
}

export default NavBar;
