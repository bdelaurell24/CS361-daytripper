import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header/Header';

import { 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button 
} from '@mui/material';

import states from './states';

import classes from './LandingPage.module.css';

const LandingPage = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const changeHandler = (event) => {
    const { name, value } = event.target;

    if (name === 'city') {
      setCity(value);
    } else if (name === 'state') {
      setState(value);
    }
  };

  return (<Fragment>
      <Header showImage={true} />
      <main>
        <section className={classes.summary}>
          <h2>Plan your next adventure!</h2>
          <p>
            Tell us the city, state and date of your next day trip. We'll find
            the attractions, restraunts and arts/entertainment to make it memorable.
          </p>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={4}>
              <TextField
                required
                label="City"
                name="city"
                value={city}
                onChange={changeHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth >
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  value={state}
                  label="State"
                  name="state"
                  onChange={changeHandler}
                >
                  {states.map((state, index) => <MenuItem key={index} value={state['abbreviation']}>{state['name']}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} className={classes.searchBtn}>
              <Link style={{textDecoration: 'none'}} to={`/results/${city.replace(' ', '+')}/${state}`}>
                <Button variant="outlined" size="large" style={{color: 'black'}}>Plan Trip</Button>
              </Link>
            </Grid>
          </Grid>
        </section>
      </main>
    </Fragment>
  );
};

export default LandingPage;