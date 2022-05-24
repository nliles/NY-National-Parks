import location from "images/location.png";
import ErrorMsg from "components/ErrorMsg";
import Spinner from "components/Spinner";
import Icon from "components/Icon";
import Map from "../Map";
import Header from "./Header";
import Images from "./Images";
import styles from "./index.module.scss";
import { Park } from "types";

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
        {loading && (
          <div className={styles.loading}>
            <Spinner />
          </div>
        )}
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
