import React, { Component } from "react";
import axios from "axios";

export default class UpdateTrip extends Component {
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

    axios
      .get(`api/Trips/SingleTrip/${id}`)
      .then((trip) => {
        const response = trip.data;

        this.setState({
          name: response.name,
          description: response.description,
          dateStarted: new Date(response.dateStarted)
            .toISOString()
            .slice(0, 10),
          dateCompleted:
            response.dateCompleted &&
            new Date(response.dateCompleted).toISOString().slice(0, 10),
        });
      })
      .catch((err) => console.error(err));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;

    let tripObject = {
      name: this.state.name,
      description: this.state.description,
      dateStarted: new Date(this.state.dateStarted).toISOString(),
      dateCompleted:
        this.state.dateCompleted &&
        new Date(this.state.dateCompleted).toISOString(),
    };

    axios
      .put(`api/Trips/updateTrip/${id}`, tripObject)
      .then((result) => {
        this.props.history.push("/trips");
      })
      .catch((err) => console.error(err));
  };

  onUpdateCancel = () => {
    this.props.history.push("/trips");
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
            <button onClick={this.onUpdateCancel} className="btn btn-default">
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}
