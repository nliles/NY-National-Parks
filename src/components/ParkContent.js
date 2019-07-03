import React from 'react';

const ParkContent = ({park}) => {
  return (
      <div>
        {(park || {}).fullName}
        {(park || {}).description}
      </div>
  );
}


export default ParkContent;
