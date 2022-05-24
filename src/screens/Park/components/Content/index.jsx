import Camera from "../../../../images/Camera.png";
import Location from "../../../../images/location.png";
import ErrorMsg from "../../../../components/ErrorMsg";
import Map from "../Map";
import Images from "./Images";
import styles from "./index.module.scss";

const ParkContent = ({ park, error }) => {
  const { addresses, description, designation, images } = park;
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {error && <ErrorMsg msg={error} />}
        {!error && park && (
          <>
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
                <div
                  className={styles.locationIcon}
                  key={park.addresses[0].line1}
                >
                  <img src={Location} alt="" />
                  <span>
                    {park.addresses[0].city}, {park.addresses[0].stateCode}
                  </span>
                </div>
              )}
              {park.latitude && park.longitude && <Map park={park} />}
            </div>
            {images?.length > 0 && <Images imageArr={images} />}
          </>
        )}
      </div>
    </div>
  );
};

export default ParkContent;
