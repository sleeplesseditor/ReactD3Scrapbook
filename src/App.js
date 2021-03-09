import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import Header from './components/Header/Header';
import LazyLoader from './components/LazyLoader/LazyLoader';

const BarChartPage = React.lazy(() => import('./components/BarChart/BarChart'));
const ScatterChartPage = React.lazy(() => import('./components/ScatterChart/ScatterChart'));

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={LazyLoader(BarChartPage)} />
        <Route exact path="/scatter" component={LazyLoader(ScatterChartPage)} />
      </Switch>
    </Router>
  );
}

export default App;
