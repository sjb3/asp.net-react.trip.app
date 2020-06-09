import React, { Component } from "react";
import axios from "axios";

export default class Trips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: [],
      loading: true,
      failed: false,
      error: "",
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
        failed: false,
        error: "",
      });
    }).catch((error) => {
      this.setState({
        trips: [],
        loading: false,
        failed: true,
        error: "Cannot be loaded",
      });
    });
  }

  onTripUpdate = (id) => {
    this.props.history.push(`/update/${id}`);
  };

  onTripDelete = (id) => {
    this.props.history.push(`/delete/${id}`);
  };

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
              <td>{new Date(trip.dateStarted).toISOString().slice(0, 10)}</td>
              <td>
                {trip.dateCompleted
                  ? new Date(trip.dateCompleted).toISOString().slice(0, 10)
                  : "-"}
              </td>
              <td>
                <div className="form-group">
                  <button
                    onClick={() => this.onTripUpdate(trip.id)}
                    className="btn btn-success"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => this.onTripDelete(trip.id)}
                    className="btn btn-danger"
                  >
                    Danger
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    let content = this.state.loading
      ? (
        <p>
          <em>Loading ...</em>
        </p>
      )
      : (this.state.failed
        ? (
          <div className="text-danger">
            <em>{this.state.error}</em>
          </div>
        )
        : (this.renderAllTrips(this.state.trips)));
    return (
      <div>
        <h1>ALl TRIPS</h1>
        {content}
      </div>
    );
  }
}
