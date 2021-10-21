import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import LandingPage from './pages/LandingPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Suspense fallback={<div className='centered'>
        <LoadingSpinner />
      </div>}>
    <Switch>
      <Route path='/' exact>
        <LandingPage />
      </Route>
      <Route path='/results/:date/:city/:state'>
        <ResultsPage />
      </Route>
    </Switch>
    </Suspense>
  );
}

export default App;
