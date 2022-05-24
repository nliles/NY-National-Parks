import location from "../../../../images/location.png";
import ErrorMsg from "../../../../components/ErrorMsg";
import Icon from "./Icon"
import Map from "../Map";
import Images from "./Images";
import styles from "./index.module.scss";

const ParkContent = ({ park, error }) => {
  const { addresses, description, designation, images } = park;
  const locationText = `${park?.addresses?.[0].city}, ${park?.addresses?.[0].stateCode}`
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
                <Icon src={location} text={locationText} klass={styles.locationIcon}/>
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
