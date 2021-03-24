import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import { ReactComponent as CaretIcon } from './components/Header/Icons/caret.svg';
import Header from './components/Header/Header';
import LazyLoader from './components/LazyLoader/LazyLoader';

const BarChartPage = React.lazy(() => import('./components/BarChart/BarChart'));
const ScatterChartPage = React.lazy(() => import('./components/ScatterChart/ScatterChart'));
const LineChartPage = React.lazy(() => import('./components/LineChart/LineChart'));
const GlobePage = React.lazy(() => import('./components/Globe/Globe'));
const CityMapPage = React.lazy(() => import('./components/CityMap/CityMap'));
const ScatterMenuPage = React.lazy(() => import('./components/ScatterMenu/ScatterMenu'));
const MultipleViewsPage = React.lazy(() => import('./components/MultipleViews/MultipleViews'));
const ChoroplethPage = React.lazy(() => import('./components/Choropleth/Choropleth'));

function App() {
  return (
    <Router>
      <Header navIcon={<CaretIcon />} title={'React D3 Scrapbook'} />
      <Switch>
        <Route exact path="/" component={LazyLoader(BarChartPage)} />
        <Route exact path="/scatter" component={LazyLoader(ScatterChartPage)} />
        <Route exact path="/line" component={LazyLoader(LineChartPage)} />
        <Route exact path="/globe" component={LazyLoader(GlobePage)} />
        <Route exact path="/cities" component={LazyLoader(CityMapPage)} />
        <Route exact path="/scatter-menu" component={LazyLoader(ScatterMenuPage)} />
        <Route exact path="/missing-migrants" component={LazyLoader(MultipleViewsPage)} />
        <Route exact path="/choropleth" component={LazyLoader(ChoroplethPage)} />
      </Switch>
    </Router>
  );
}

export default App;
