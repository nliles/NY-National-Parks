import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../../../../constants";
import styles from "./index.module.css";

const mapStyles = {
  height: "60vh",
  border: "2px solid black",
};

const Map = ({ park }) => {
  const { id, fullName, latitude, longitude } = park;
  const lat = Number(latitude);
  const long = Number(longitude);

  // Load the Google maps scripts
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const center = {
    lat: lat,
    lng: long,
  };

  return (
    <div className={styles.container}>
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && (
        <GoogleMap center={center} mapContainerStyle={mapStyles} zoom={4}>
          <Marker
            key={id}
            title={fullName}
            position={{
              lat: lat,
              lng: long,
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;