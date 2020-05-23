import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import './App.css';
import Catalogue from './pages/Catalogue';
import Detail from './pages/Detail';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/berries' />} />
        <Route exact path='/berries' component={Catalogue} />
        <Route exact path='/berries/:id' component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
