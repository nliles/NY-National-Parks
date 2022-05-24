import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "constants";

const mapContainerStyle = {
  height: "60vh",
  border: "2px solid black",
};

const mapStyles = [
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
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#e9e4de",
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

// type MapProps = {
//   id: string,
//   fullName: string,
//   latitude: string,
//   longitude: string
// }

const Map = ({ id, fullName, latitude, longitude }) => {
  const lat = Number(latitude);
  const lng = Number(longitude);

  // Load the Google maps scripts
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
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
