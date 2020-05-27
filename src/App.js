import React from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import Details from './pages/Details';
import Catalogue from './pages/Catalogue';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/berries' />} />
        <Route exact path='/berries' component={Catalogue} />
        <Route exact path='/berries/:id' component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
