import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.recentlyStreamsChanged = [];
    this.state = {
      aggregationSelected: null,
      recentlyAggregations: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8082/eventstore-api/aggregations')
      .then(response => {
        let data = [];
        response.data.forEach(aggregation => {
          data.push({
            name: aggregation
          });
        });
        this.setState({
          recentlyAggregations: data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  selectAggregation(aggregation) {
    let streams = [];
    axios.get(`http://localhost:8082/eventstore-api/streams?aggregation=${aggregation.name}`)
      .then(response => {
        response.data.forEach(stream => {
          streams.push({
            id: stream,
            aggregation: aggregation,
            name: aggregation.name + stream
          });
        });
        this.setState({
          aggregationSelected: { aggregation, streams}
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Event Store</h1>
        </header>
        <main>
          <h2>Aggregations</h2>
          <div className="streams">
            <div className="streams__recent">
              <table>
                <thead>
                  <tr>
                    <th>Recently Aggregations</th>
                  </tr>    
                </thead>
                <tbody>
                  { this.state.recentlyAggregations.map((aggregation) => (
                    <tr key={aggregation.name}>
                      <td>
                        <a href={null} onClick={(e) => this.selectAggregation(aggregation)}>
                          {aggregation.name}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="streams__detail">
              <table>
                <thead>
                  <tr>
                    <th>Stream #</th>
                    <th>Name</th>
                  </tr>
                </thead>
                { this.state.aggregationSelected &&
                  <tbody>
                    { this.state.aggregationSelected.streams.map((stream) => (
                        <tr key={stream.id}>
                          <td><Link to={
                            {
                              pathname: "/detail/" + stream.name,
                              ...stream
                            }
                          }>{stream.id}</Link></td>
                          <td><Link to={
                            {
                              pathname: "/detail/" + stream.name,
                              ...stream
                            }
                          }>{stream.name}</Link></td>
                        </tr>
                      )
                    ) }
                  </tbody>
                }
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
