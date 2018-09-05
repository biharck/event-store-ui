import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Detail extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <Link to="/" className="home__link">
            <h1 className="App-title">Event Store</h1>
          </Link>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>Event #</th>
                <th>Name</th>
                <th>Type</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.location.eventNumber}</td>
                <td>{this.props.location.name}</td>
                <td>{this.props.location.type}</td>
                <td>{this.props.location.createdDate}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>JSON</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <pre>
                    <code className="json" ref="code">
                      {JSON.stringify(this.props.location.jsonObj, null, 2)}
                    </code>
                  </pre>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Internal Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>EventId</td>
                <td>{this.props.location.eventId}</td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    );
  }
}

export default Detail;