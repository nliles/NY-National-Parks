import React, { Component } from 'react';
import { withRouter } from "react-router";
import ParkContent from "./ParkContent"
import { API_KEY, NPS_API } from "./utils/Constants"

class ParkView extends Component {
  constructor() {
    super()
    this.state = {
      park: {},
    }
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.getPark(this.props.match.params.id)
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getPark(parkCode) {
    const url = `${NPS_API}/parks?parkCode=${parkCode}&fields=images,addresses&api_key=${API_KEY}`
    return fetch(url)
      .then((response) => response.json())
      .then((park) => {
        if (this._isMounted === true) {
          this.setState({ park: park.data[0] })
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const { park } = this.state;
    return (
      <ParkContent park={park}/>
    )
  }

}

export default withRouter(ParkView)
