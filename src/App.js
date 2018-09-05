import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.recentlyStreamsChanged = [];
    this.state = {
      streamSelected: null
    }
    this.loadStreams();
  }

  loadStreams() {
    //axios
    this.recentlyStreamsChanged = [
      {
        name: '@$stats-0.0.0.0:2113',
        events: [
          {
            eventNumber: 43,
            name: '43@$stats-0.0.0.0:2113',
            type: '$statsCollected',
            createdDate: '2018-09-02 19:07:58',
            jsonObj: {
              'proc-startTime': "2018-09-02T21:45:31.0000000Z",
              'proc-id': 1,
              'proc-mem': 326393856
            },
            eventId: '590d4e82-e4bc-4566-967a-73c582d88632'
          }
        ]
      },
      {
        name: '@$projections-$master',
        events: [
          {
            eventNumber: 27,
            name: '27@$projections-$master',
            type: '$statistics-report',
            createdDate: '2018-09-02 18:45:35',
            jsonObj: {
              'proc-startTime': "2018-09-02T21:45:31.0000000Z",
              'proc-id': 1,
              'proc-mem': 326393856
            },
            eventId: '590d4e82-e4bc-4566-967a-73c582d88632'
          }
        ]
      }
    ];
  }

  selectStream(stream) {
    this.setState({
      streamSelected: stream
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Event Store</h1>
        </header>
        <main>
          <h2>Stream Browser</h2>
          <div className="streams">
            <div className="streams__recent">
              <table>
                <thead>
                  <tr>
                    <th>Recently Changed Streams</th>
                  </tr>    
                </thead>
                <tbody>
                  { this.recentlyStreamsChanged.map((stream) => (
                    <tr key={stream.name}>
                      <td>
                        <a href={null} onClick={(e) => this.selectStream(stream)}>
                          {stream.name}
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
                    <th>Event #</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                { this.state.streamSelected &&
                  <tbody>
                    { this.state.streamSelected.events.map((event) => (
                        <tr key={event.eventNumber}>
                          <td><Link to={
                            { 
                              pathname: "/detail/" + event.name,
                              ...event
                            }
                          }>{event.eventNumber}</Link></td>
                          <td><Link to={
                            { 
                              pathname: "/detail/" + event.name,
                              ...event
                            }
                          }>{event.name}</Link></td>
                          <td>{event.type}</td>
                          <td>{event.createdDate}</td>
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
