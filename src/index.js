import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

document.title = 'Event Store';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
