import React, { Component } from "react";
import axios from "axios";

export default class DeleteTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      dateStarted: "",
      dateCompleted: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get("api/Trips/SingleTrip/" + id).then((trip) => {
      const response = trip.data;

      this.setState({
        name: response.name,
        description: response.description,
        dateStarted: new Date(response.dateStarted).toISOString().slice(0, 10),
        dateCompleted:
          response.dateCompleted &&
          new Date(response.dateCompleted).toISOString().slice(0, 10),
      });
    });
  }

  handleCancel = (e) => {
    this.props.history.push("/trips");
  };

  handleConfirm = (e) => {
    const { id } = this.props.match.params;

    axios
      .delete(`api/Trips/DeleteTrip/${id}`)
      .then((result) => {
        this.props.history.push("/trips");
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h2>Delete trip confirmation</h2>

        <div className="card">
          <div className="card-body">
            <h4 className="card-title"> {this.state.name} </h4>
            <p className="card-text"> {this.state.description} </p>
            <button onClick={this.handleCancel} className="btn btn-default">
              Cancel
            </button>
            <button onClick={this.handleConfirm} className="btn btn-danger">
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}
