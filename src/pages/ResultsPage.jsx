import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import Results from '../components/Results/Reuslts';

import Header from '../components/Header/Header';

import classes from './ResultsPage.module.css';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
  backgroundColor:  'rgba(211, 208, 203, 0.228)',
}));


const ResultsPage = () => {
  const [map, setMap] = useState('')
  const [showPlaylist, setShowPlaylist] = useState(false);
  const params = useParams();

  const { date, city, state } = params;

  useEffect(() => {
    const getMap = async () => {
      const res = await fetch(`/map?city=${city}&state=${state}`);
      
      const htmlString = await res.text();
  
      // const parser = new DOMParser();
  
      // // Parse the text
      // let doc = parser.parseFromString(htmlString, "text/html");
  
      // let html = doc.querySelector('iframe');
  
      setMap(htmlString)
    };

    getMap();
  }, [city, state]);

  const createMarkup = () => {
    return {__html: map}
  }

  const showPlaylistHandler = () => {
    setShowPlaylist(prevState => !prevState);
  };

  return (
    <Fragment>
      <Header showImage={false} />
      <main className={classes.mainContent}>
        
        <Box sx={{ flexGrow: 1 }} >
          <Grid container spacing={2} style={{marginLeft: '1rem', marginBottom: '1rem'}} >
            <Grid item xs={6}>
              <Item>
                <h3>Map of {city}, {state}</h3>
                <div dangerouslySetInnerHTML={createMarkup()}></div>
              </Item>
            </Grid>
            <Grid item sx={6} style={{width: '40%'}}>
              <Item>
                <h3>Spotify Playlist</h3>
                <p>Need some tunes for your drive?</p>
                <Button variant="outlined" onClick={showPlaylistHandler} >
                  {showPlaylist ? 'Hide Playlist' : 'Generate Playlist'}
                </Button>
                {showPlaylist && <div style={{marginTop: '1rem'}}><img alt='Spotify' width="200" height="130" src="https://c32-cdn.guidingtech.com/optim/assets/2020/07/1040791/Change-Playlist-Cover-on-Spotify_4d470f76dc99e18ad75087b1b8410ea9.jpg?1595602893" /></div>}
              </Item>
            </Grid>
            <Grid item sx={12} style={{width: '95%'}}>
              <Item style={{width: '100%'}}>
                <Results date={date} />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </main>
    </Fragment>  
  )
};

export default ResultsPage;