import Camera from "../../../../images/Camera.png";
import Location from "../../../../images/location.png";
import Map from "../Map";
import styles from "./index.module.scss";

const ParkContent = ({ park, error }) => {
  const { addresses, description, designation, images } = park;
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {park.fullName && (
          <div className={styles.header} key={park.fullName}>
            <h2 className={styles.header}>{park.fullName}</h2>
            <strong>{designation}</strong>
          </div>
        )}
        <div className={styles.description}>
          <p>{description}</p>
        </div>
        <div className={styles.location}>
          {addresses?.length && (
            <div className={styles.locationIcon} key={park.addresses[0].line1}>
              <img src={Location} alt="" />
              <span>
                {park.addresses[0].city}, {park.addresses[0].stateCode}
              </span>
            </div>
          )}
          <Map park={park} />
        </div>
        <div className={styles.cameraIcon}>
          <img src={Camera} alt="" />
          <span>Photos</span>
        </div>
        <div className={styles.images}>
          {images?.length > 0 &&
            images.map((image) => (
              <div className={styles.image}>
                <img key={image.title} src={image.url} alt={image.title} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ParkContent;
