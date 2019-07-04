import React from 'react';
import Camera from "../images/Camera.png"
import Location from "../images/location.png"

const ParkContent = ({park}) => {
  const parkImages = park.images && park.images.length > 0
  const parkAddresses = park.addresses && park.addresses.length > 0

  return (
    <div className="content-container">
      <div className="content-container-title">
        <h2 className="content-container-header">{park.fullName}</h2>
        <div>
          <span>{park.designation && park.designation}</span>
          {park.designation && <br/>}
          {parkAddresses &&
            <div className="location-icon"><img src={Location} alt="location-icon"/><span>{park.addresses[0].city}, {park.addresses[0].stateCode}
            </span></div>
          }
        </div>
        <p>{park.description}</p>
        <div className="camera-icon"><img src={Camera} alt="cam-icon"/><p>Photos</p></div>
      </div>
      <div className="content-container-row">
      {
        parkImages &&
        park.images.map(image => <div className="content-container-column"><img key={image.id} src={image.url} alt={image.title}/></div>)
      }</div>
    </div>
  );
}


export default ParkContent;
