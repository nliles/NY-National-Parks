import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const ListItem = ({ park }) => {
  const states = park.states.split(",");
  const stateLabel = states.length > 1 ? "States" : "State";
  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <span>{park.designation.toUpperCase()}</span>
        <Link to={`/parks/${park.parkCode}`}>
          <div className={styles.title}>{park.fullName}</div>
        </Link>
        <span>
          {stateLabel}: {park.states}
        </span>
      </div>
      {park.images.length > 0 && (
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={park.images[0].url}
            alt={park.images[0].title}
          />
        </div>
      )}
    </div>
  );
};

export default ListItem;
