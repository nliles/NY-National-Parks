import Camera from "../../../../images/Camera.png";
import Location from "../../../../images/location.png";
import Map from "../Map"
import styles from "./index.module.css"

const ParkContent = ({ park, error }) => {
  const { addresses, description, designation, images } = park
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.header}>{park.fullName}</h2>
        <div>
          {designation && (
            <div className={styles.designation}>
              <strong>{designation}</strong>
            </div>
          )}
          {addresses?.length && (
            <div className={styles.locationIcon}>
              <img src={Location} alt="" />
              <span>
                {park.addresses[0].city}, {park.addresses[0].stateCode}
              </span>
            </div>
          )}
        <Map park={park}/>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div className={styles.cameraIcon}>
          <img src={Camera} alt="" />
          <p>Photos</p>
        </div>
        <div className={styles.images}>
          {images?.length > 0 &&
            images.map(image => (
              <img key={image.id} src={image.url} alt={image.title} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ParkContent;
