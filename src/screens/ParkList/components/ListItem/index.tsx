import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { Image } from "types";

type ListItemProps = {
  designation: string;
  fullName: string;
  images: Image[];
  parkCode: string;
  states: string;
};

const ListItem = ({
  designation,
  fullName,
  images,
  parkCode,
  states,
}: ListItemProps) => {
  const splitStates = states.split(",");
  const stateLabel = splitStates.length > 1 ? "States" : "State";
  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <span>{designation.toUpperCase()}</span>
        <Link to={`/parks/${parkCode}`} className={styles.title}>
          <div>{fullName}</div>
        </Link>
        <span>
          {stateLabel}: {states}
        </span>
      </div>
      {images.length > 0 && (
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={images[0].url}
            alt={images[0].title}
          />
        </div>
      )}
    </div>
  );
};

export default ListItem;
