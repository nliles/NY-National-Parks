import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../../../../constants";
import { mapStyles } from "./mapStyles";

const mapContainerStyle = {
  height: "60vh",
  border: "2px solid black",
};

type MapProps = {
  id: string;
  fullName: string;
  latitude: string;
  longitude: string;
};

const Map = ({ id, fullName, latitude, longitude }: MapProps) => {
  const lat = Number(latitude);
  const lng = Number(longitude);

  // Load the Google maps scripts
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY || "",
  });

  const center = {
    lat,
    lng,
  };

  return (
    <div>
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && (
        <GoogleMap
          center={center}
          mapContainerStyle={mapContainerStyle}
          options={{
            styles: mapStyles,
          }}
          zoom={12}
        >
          <Marker
            key={id}
            title={fullName}
            position={{
              lat,
              lng,
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
