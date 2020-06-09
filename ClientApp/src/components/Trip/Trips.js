import React, { Component } from "react";
import axios from "axios";

export default class Trips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.populateTripData();
  }

  populateTripData() {
    axios.get("api/Trips/getTrips").then((result) => {
      const response = result.data;

      this.setState({
        trips: response,
        loading: false,
      });
    });
  }

  renderAllTrips = (trips) => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date Started</th>
            <th>Date Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, i) => (
            <tr key={i}>
              <td>{trip.name}</td>
              <td>{trip.description}</td>
              <td>{new Date(trip.dateStarted).toLocaleDateString()}</td>
              <td>
                {trip.dateCompleted
                  ? new Date(trip.dateCompleted).toLocaleDateString()
                  : "-"}
              </td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    let content = this.state.loading ? (
      <p>
        <em>Loading ...</em>
      </p>
    ) : (
      this.renderAllTrips(this.state.trips)
    );
    return (
      <div>
        <h1>ALl TRIPS</h1>
        {content}
      </div>
    );
  }
}
