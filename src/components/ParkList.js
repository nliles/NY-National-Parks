import React, { Component } from 'react';
import ListItem from './ListItem'
import InfiniteScroll from 'react-infinite-scroller';
import { NPS_API, API_KEY } from "./utils/Constants"
import uniqBy from 'lodash.uniqby';

class ParkList extends Component {
  _isMounted = false;

  constructor() {
  super()
    this.state = {
      query: "",
      data: [],
      filteredData: [],
      showParkList: false,
    }
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.getParks();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputChange = event => {
  const query = event.target.value;

  this.setState(prevState => {
    const filteredData = prevState.data.filter(element => {
      return element.fullName.toLowerCase().includes(query.toLowerCase());
    });

    return {
      query,
      filteredData
    };
  });
};

  getParks = (pageNumber) => {
    const { data } = this.state;
    const start = 10 * (pageNumber - 1)
    const url = `${NPS_API}/parks?limit=10&start=${start}&sort=fullName&api_key=${API_KEY}`
    return fetch(url)
        .then((response) => response.json())
        .then((parkData) => {
          if (this._isMounted === true) {
            const newData = data.concat(parkData.data)
              this.setState({ data: uniqBy(newData, 'id')
            })
          }
        })
        .catch(error => { console.log(error) });
  }

  render() {
    const { data, query, showParkList, filteredData } = this.state
    const queryLength = query.length > 0
    const filteredDataL = filteredData.length > 0
    console.log(filteredDataL)
    return (
      <div className="list-container">
       <div className="list-button-container">
        <button className="btn" data-js="btn" onClick={() => this.setState({ showParkList: !showParkList})}>
          <span className="btn-inr">
            <span className="txt-a">See All Parks</span>
          </span>
        </button>
      </div>

      <div className="list-view">
        {!showParkList ?
          <div>National Park Info</div>
          :
          data.length > 0 ?
          <div className="list-view">
            <form>
               <input
                 className="search-input"
                 placeholder="Find a Park..."
                 value={this.state.query}
                 onChange={this.handleInputChange}
               />
             </form>
             <div style={{height: '700px', overflow:'scroll'}} ref={(ref) => this.scrollParentRef = ref}>
             <ul>
               <InfiniteScroll
                   pageStart={1}
                   loadMore={this.getParks}
                   hasMore={queryLength ? false : (true || false)}
                   useWindow={false}
                   getScrollParent={() => this.scrollParentRef}
                   loader={<div className="loader" key={0}>Load</div>}>
                 {data.map(park =>
                 <ListItem key={park.id} park={park}/>
                 )}
               </InfiniteScroll>
             </ul>
            </div>
          </div>
          :
          'loading'
        }
      </div>

    </div>
    )
  }
}

export default ParkList
