import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    const { aggregation, id } = this.props.location;
    axios.get(`http://localhost:8082/eventstore-api/events?aggregation=${aggregation.name}&streamId=${id}`)
      .then(response => {
        let events = [];
        response.data.forEach(event => {
          const createdDate = new Date(event.commitTimestamp);
          events.push({
            sequence: event.sequence,
            createdDate: createdDate.getUTCFullYear() + "/" +
                         (createdDate.getUTCMonth()+1) + "/" +
                         createdDate.getUTCDate(),
            payload: event.payload
          });
        });
        this.setState({
          events: events
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
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
                <th>Sequence</th>
                <th>Created Date</th>
                <th>JSON</th>
              </tr>
            </thead>
            <tbody>
              {this.state.events.map(event => {
                return (<tr key={event.sequence}>
                    <td>{event.sequence}</td>
                    <td>{event.createdDate}</td>
                    <td>
                      <pre>
                        <code className="json" ref="code">
                          {JSON.stringify(event.payload, null, 2)}
                        </code>
                      </pre>
                    </td>
                  </tr>)
              })}
            </tbody>
          </table>
          {/* <table>
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
          </table> */}
        </main>
      </div>
    );
  }
}

export default Detail;