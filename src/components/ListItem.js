import React from 'react';
import { Link } from 'react-router-dom'

const ListItem = ({park}) => {
  return (
    <Link to={`/parks/${park.parkCode}`}><h3>{park.fullName}</h3></Link>
  )
}

export default ListItem
