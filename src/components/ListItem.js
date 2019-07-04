import React from 'react';
import { Link } from 'react-router-dom'

const ListItem = ({park}) => {
  console.log(park)
  return (
     <div className="list-item">
        <div className="content-div">
          <span>{park.designation.toUpperCase()}</span>
          <Link to={`/parks/${park.parkCode}`}><div className="link-title">{park.fullName}</div></Link>
          <span>Location: {park.states}</span>
        </div>
        {park.images.length > 0 &&
          <div className="image-div">
            <img className="parkImage" src={park.images[0].url}/>
          </div>
        }

    </div>
  )
}

export default ListItem
