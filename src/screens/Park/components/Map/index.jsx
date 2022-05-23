import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../../../../constants";

const mapStyles = {
  height: "60vh",
  border: "2px solid black",
};

const exampleMapStyles = [
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [
      {
        color: "#908e7d",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#e9e4de",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },

  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#a7aa94",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#a8c0c9",
      },
    ],
  },
];

const Map = ({ park }) => {
  const { id, fullName, latitude, longitude } = park;
  const lat = Number(latitude);
  const long = Number(longitude);

  // Load the Google maps scripts
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const center = {
    lat: lat || 0,
    lng: long || 0,
  };

  return (
    <div>
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && (
        <GoogleMap
          center={center}
          mapContainerStyle={mapStyles}
          options={{
            styles: exampleMapStyles,
          }}
          zoom={12}
        >
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
