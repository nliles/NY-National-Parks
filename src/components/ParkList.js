import React, { Component } from 'react';
import ListItem from './ListItem'
import { NPS_API, API_KEY } from "./Constants"

class ParkList extends Component {
  constructor() {
  super()
    this.state = {
      data: [],
      showParkList: false
    }
  }

  componentDidMount = () => {
    this.getParks();
  }

  toggleView = () => {
    const { showParkList } = this.state;
    this.setState({ showParkList: !showParkList})
  }

  getParks = () => {
    const url = `${NPS_API}/parks?stateCode=ny&api_key=${API_KEY}`
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.setState({ data: data.data })
        })
        .catch(error => { console.log(error) });
  }

  render() {
    const { data, showParkList } = this.state
    return (
      <div>
        <button onClick={() => this.toggleView()}>
           Click Me
        </button>
        {!showParkList ?
          <div>National Park Info</div>
          :
          data.length > 0 ?
          <ul>
            {data.map((park) =>
              <ListItem key={park.id} park={park}/>
            )}
          </ul>
          :
          'loading'
        }

      </div>
    )
  }
}

export default ParkList
