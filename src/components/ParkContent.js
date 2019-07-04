import React from 'react';

const ParkContent = ({park}) => {
  const parkImages = park.images && park.images.length > 0
  const parkAddresses = park.addresses && park.addresses.length > 0
  console.log(parkImages)
  return (
    <div className="container">
      <div>
        <h2>{park.fullName}</h2>
        <p>{park.designation}</p>
        {parkAddresses &&
          <p>{park.addresses[0].city}, {park.addresses[0].stateCode}</p>
        }
      </div>
      <div>{park.description}</div>
      <div>{
        parkImages &&
        <img className="park-image" src={park.images[0].url}/>
      }</div>
    </div>
  );
}


export default ParkContent;
