import React, { Component } from "react";
import ListItem from "./ListItem";
import InfiniteScroll from "react-infinite-scroller";
import { NPS_API, API_KEY } from "./utils/Constants";
import uniqBy from "lodash.uniqby";

class ParkList extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      error: "",
      hasMoreItems: true,
      data: [],
      filteredData: [],
      showParkList: false
    };
  }

  componentDidMount = () => {
    this.getParks(1);
  };

  handleInputChange = event => {
    const query = event.target.value;
    let hasMore = query !== "" ? false : true;
    this.setState({ hasMoreItems: hasMore });

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

  getParks = pageNumber => {
    const { data } = this.state;
    const start = 10 * (pageNumber - 1);
    const url = `${NPS_API}/parks?limit=10&start=${start}&fields=images&sort=fullName&api_key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(parkData => {
        if (parkData.error) {
          this.setState({
            error: "Something went wrong. Please try again later."
          });
        } else if (parkData.total === "0") {
          this.setState({ hasMoreItems: false });
        } else {
          const newData = data.concat(parkData.data);
          this.setState({
            data: uniqBy(newData, "id")
          });
        }
      })
      .catch(error => {
        this.setState({
          error: "Something went wrong. Please try again later."
        });
      });
  };

  render() {
    const {
      data,
      query,
      error,
      hasMoreItems,
      showParkList,
      filteredData
    } = this.state;

    const displayData = query !== "" ? filteredData : data;
    const displayNoResults = query !== "" && filteredData.length === 0;

    const descriptionDiv = (
      <div className="list-view-text-div">
        <div className="list-view-title">
          <h2>Find a National Park</h2>
        </div>
        <div>
          <p>
            Click the button above to display a complete list of all the
            national parks, monuments, and other types of proteted areas in the
            United States. Click on any park in the list to get a more detailed
            description.
          </p>
        </div>
      </div>
    );

    const loader = (
      <div className="loader" key={0}>
        Loading ...
      </div>
    );

    return (
      <div className="list-container">
        <div className="list-container-btn">
          <button
            className="list-btn"
            onClick={() => this.setState({ showParkList: !showParkList })}
          >
            <span className="list-btn-text">See All Parks</span>
          </button>
        </div>

        <div className="list-view">
          {!showParkList ? (
            descriptionDiv
          ) : error ? (
            <div className="error-message">{error}</div>
          ) :
          data.length > 0 ? (
            <div className="list-view-content">
              <form>
                <input
                  className="list-view-search"
                  placeholder="Find a Park..."
                  value={this.state.query}
                  onChange={this.handleInputChange}
                />
              </form>
               {displayNoResults &&
               <span>No Results Found</span>}
              <div
                style={{ height: "500px", overflow: "auto" }}
                ref={ref => (this.scrollParentRef = ref)}
              >
                <InfiniteScroll
                  pageStart={1}
                  loadMore={this.getParks}
                  hasMore={hasMoreItems}
                  loader={loader}
                  useWindow={false}
                  getScrollParent={() => this.scrollParentRef}
                >
                  {displayData.map(park => (
                    <ListItem key={park.id} park={park} />
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          )  : (
            <div className="loader">Loading...</div>
          )}
        </div>
      </div>
    );
  }
}

export default ParkList;
