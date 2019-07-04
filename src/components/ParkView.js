import React, { Component } from 'react';
import { withRouter } from "react-router";
import ParkContent from "./ParkContent"
import { API_KEY, NPS_API } from "./utils/Constants"

class ParkView extends Component {
  constructor() {
    super()
    this.state = {
      park: {},
      images: []
    }
  }

  componentDidMount() {
    this.getPark(this.props.match.params.id)
    this.getPhotos(this.props.match.params.id)
  }

  getPark(parkCode) {
    console.log(parkCode)
    return fetch(`${NPS_API}/parks?parkCode=${parkCode}&api_key=${API_KEY}`, {
    })
      .then((response) => response.json())
      .then((park) => {
        console.log(park)
        this.setState({ park: park.data[0] })
      })
      .catch(error => console.log(error));
  }

  getPhotos = (parkCode) => {
    const url = `${NPS_API}/places?parkCode=${parkCode}&api_key=${API_KEY}`
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
            this.setState({ images: data.data })
        })
        .catch(error => { console.log(error) });
  }


  render() {
    console.log(this.state.images)
    return (
      <ParkContent park={this.state.park} images={this.state.images} />
    )
  }

}

export default withRouter(ParkView)
