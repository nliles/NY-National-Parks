import React from 'react';

const ParkContent = ({park}) => {
  console.log(park)
  return (
    <div className="container">
      <div>
        <h2>{park.fullName}</h2>
        <p>{park.designation}</p>
        <p>States: {park.states}</p>
      </div>
        <div>{park.description}</div>
    </div>
  );
}


export default ParkContent;
