import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Detail from './Detail';


const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/detail/:name' component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;