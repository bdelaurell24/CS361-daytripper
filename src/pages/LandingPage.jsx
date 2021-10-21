import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header/Header';

import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import states from './states';

import classes from './LandingPage.module.css';

const LandingPage = () => {
  const [date, setDate] = useState(null);
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
            the attractions, restraunts and events to make it memorable.
          </p>
          <Grid container spacing = {2}>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newValue) => {
                    const dateObject = new Date(newValue);
                    setDate(dateObject.toLocaleDateString('en-US'));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                label="City"
                name="city"
                value={city}
                onChange={changeHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
              <Link style={{textDecoration: 'none'}} to={`/results/${date? date.replace('/', '-').replace('/', '-'): ''}/${city}/${state}`}>
                <Button variant="text" size="large" style={{color: 'black'}}>Plan Trip</Button>
              </Link>
            </Grid>
          </Grid>
        </section>
      </main>
    </Fragment>
  );
};

export default LandingPage;