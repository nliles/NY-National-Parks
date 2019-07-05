import React, { Component } from "react";
import { withRouter } from "react-router";
import ParkContent from "./ParkContent";
import { API_KEY, NPS_API } from "./utils/Constants";

class ParkView extends Component {
  constructor() {
    super();
    this.state = {
      park: {},
      error: ""
    };
  }

  componentDidMount = () => {
    this.getPark(this.props.match.params.id);
  };

  componentDidUpdate = (nextProps) => {
    this.getPark(nextProps.match.params.id);
  }

  getPark = (parkCode) => {
    const url = `${NPS_API}/parks?parkCode=${parkCode}&fields=images,addresses&api_key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(park => {
        if (park.error) {
          this.setState({
            error: "Something went wrong. Please try again later."
          });
        } else {
          this.setState({ park: park.data[0] });
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return <ParkContent {...this.state} />;
  }
}

export default withRouter(ParkView);
