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
    //return [];
    const { data } = this.state;
    const start = 10 * (pageNumber - 1)
    const url = `${NPS_API}/parks?limit=10&start=${start}&fields=images&sort=fullName&api_key=${API_KEY}`
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
    const displayData = filteredData.length > 0 ? filteredData : data;
    return (
    <div className="list-container">
       <div className="list-container-btn">
        <button className="list-btn" data-js="btn" onClick={() => this.setState({ showParkList: !showParkList})}>
            <span className="list-btn-text">See All Parks</span>
        </button>
      </div>

      <div className="list-view">
        {!showParkList ?
          (<div className="list-view-text-div">
            <div className="list-view-title"><h2>Find a National Park</h2></div>
            <div>
              <p>Click the button above to display a complete list of
              all the national parks, monuments, and other types of proteted areas
              in the United States. Click on any park in the list to get a more detailed
              description.</p>
            </div>
          </div>)
          :
          data.length > 0 ?
          <div className="list-view-content">
            <form>
               <input
                 className="list-view-search"
                 placeholder="Find a Park..."
                 value={this.state.query}
                 onChange={this.handleInputChange}
               />
             </form>
            <div className="list-view-scroll" ref={(ref) => this.scrollParentRef = ref}>
               <ul className="list-view-list">
                 <InfiniteScroll
                     pageStart={1}
                     loadMore={this.getParks}
                     hasMore={false}
                     //hasMore={queryLength ? false : (true || false)}
                     useWindow={false}
                     getScrollParent={() => this.scrollParentRef}
                     loader={<div className="loader" key={0}>Loading...</div>}>
                     {displayData.map(park =>
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
