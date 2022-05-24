import location from "images/location.png";
import ErrorMsg from "components/ErrorMsg";
import Spinner from "components/Spinner";
import Icon from "components/Icon";
import { Park } from "types";
import Map from "screens/Park/components/Map";
import Header from "screens/Park/components/Content/Header";
import Images from "screens/Park/components/Content/Images";
import styles from "./index.module.scss";

type ParkContentProps = {
  park: Park;
  error: string;
  loading: boolean;
};

const ParkContent = ({ loading, park, error }: ParkContentProps) => {
  const {
    addresses,
    description,
    designation,
    fullName,
    id,
    images,
    latitude,
    longitude,
    url,
  } = park;
  const locationText = `${addresses?.[0].city}, ${addresses?.[0].stateCode}`;
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {error && <ErrorMsg msg={error} />}
        {loading && <Spinner />}
        {!error && !loading && park && (
          <>
            <Header designation={designation} url={url} fullName={fullName} />
            <div className={styles.description}>
              <p>{description}</p>
            </div>
            <div className={styles.location}>
              {addresses?.length && (
                <Icon
                  src={location}
                  text={locationText}
                  klass={styles.locationIcon}
                />
              )}
              {latitude && longitude && (
                <Map
                  id={id}
                  fullName={fullName}
                  latitude={latitude}
                  longitude={longitude}
                />
              )}
            </div>
            {images?.length > 0 && <Images imageArr={images} />}
          </>
        )}
      </div>
    </div>
  );
};

export default ParkContent;
