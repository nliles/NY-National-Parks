import Icon from "../../../../components/Icon";
import camera from "../../../../images/camera.png";
import styles from "./index.module.scss";

const Images = ({ imageArr }) => (
  <div>
    <Icon src={camera} text="Photos" />
    <div className={styles.images}>
      {imageArr.map((image) => (
        <div className={styles.image} key={image.title + image.url}>
          <img src={image.url} alt={image.title} />
        </div>
      ))}
    </div>
  </div>
);

export default Images;
