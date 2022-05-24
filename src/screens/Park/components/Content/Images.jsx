import Camera from "../../../../images/Camera.png";
import Location from "../../../../images/location.png";
import ErrorMsg from "../../../../components/ErrorMsg";
import Map from "../Map";
import styles from "./index.module.scss";

const Images = ({ imageArr }) => {
  return (
    <div>
      <div className={styles.cameraIcon}>
        <img src={Camera} alt="" />
        <span>Photos</span>
      </div>
      <div className={styles.images}>
        {imageArr.map((image) => (
          <div className={styles.image} key={image.title}>
            <img src={image.url} alt={image.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
