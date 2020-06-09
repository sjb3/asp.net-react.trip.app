import React, { Component } from "react";
import axios from "axios";

export default class CreateTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      dateStarted: null,
      dateCompleted: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let tripObject = {
      Id: Math.floor(Math.random() * 1000),
      name: this.state.name,
      description: this.state.description,
      dateStarted: this.state.dateStarted,
      dateCompleted: this.state.dateCompleted,
    };

    axios
      .post("api/Trips/AddTrip", tripObject)
      .then((result) => {
        this.props.history.push("/trips");
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="trip-form">
        <h3>Add new trip</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Trip name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Trip description: </label>
            <textarea
              type="text"
              className="form-control"
              value={this.state.description}
              name="description"
              onChange={this.handleChange}
            />
          </div>
          <div className="row">
            <div className="col col-md-6 col-sm-6 col-xs-12">
              <div className="form-group">
                <label>Date of start: </label>
                <input
                  type="date"
                  className="form-control"
                  value={this.state.dateStarted}
                  name="dateStarted"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col col-md-6 col-sm-6 col-xs-12">
              <div className="form-group">
                <label>Date of completion: </label>
                <input
                  type="date"
                  className="form-control"
                  value={this.state.dateCompleted}
                  name="dateCompleted"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Add trip" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
