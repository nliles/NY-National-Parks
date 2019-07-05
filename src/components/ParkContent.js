import React from "react";
import Camera from "../images/Camera.png";
import Location from "../images/Location.png";

const ParkContent = ({ park, error }) => {
  const parkImages = park.images && park.images.length > 0;
  const parkAddresses = park.addresses && park.addresses.length > 0;

  if (error !== "") {
    return (
      <div className="list-view">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="content-container-title">
        <h2 className="content-container-header">{park.fullName}</h2>
        <div>
          {park.designation && (
            <div>
              <span>{park.designation && park.designation}</span>
            </div>
          )}
          {parkAddresses && (
            <div className="location-icon">
              <img src={Location} alt="location-icon" />
              <span>
                {park.addresses[0].city}, {park.addresses[0].stateCode}
              </span>
            </div>
          )}
        </div>
        <div>
          <p>{park.description}</p>
        </div>
        <div className="camera-icon">
          <img src={Camera} alt="cam-icon" />
          <p>Photos</p>
        </div>
        <div className="content-container-images">
          {parkImages &&
            park.images.map(image => (
              <img key={image.id} src={image.url} alt={image.title} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ParkContent;
