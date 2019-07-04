import React from 'react';
import { Link } from 'react-router-dom'

const ListItem = ({park}) => {
  console.log(park)
  return (
     <div className="list-item">
        <div className="list-item-content">
          <span>{park.designation.toUpperCase()}</span>
          <Link to={`/parks/${park.parkCode}`}><div className="list-item-title">{park.fullName}</div></Link>
          <span>Location: {park.states}</span>
        </div>
        {park.images.length > 0 &&
          <div className="list-item-image-container">
            <img className="list-item-image" src={park.images[0].url} alt={park.images[0].title}/>
          </div>
        }

    </div>
  )
}

export default ListItem
