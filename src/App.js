import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import LandingPage from './pages/LandingPage';
import ResultsPage from './pages/ResultsPage';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6E8898FF',
    }, secondary: {
      main: '#9FB1BCFF',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
