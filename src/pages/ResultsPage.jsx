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
  const [playlistURL, setPlaylistURL] = useState('');
  const [localSites, setLocalSites] = useState(undefined);
  const [localMuseums, setLocalMuseums] = useState(undefined);
  const [restaraunts, setRestaraunts] = useState(undefined);

  const params = useParams();

  const { city, state } = params;

  const { REACT_APP_OPEN_TRIP_API_KEY } = process.env;

  useEffect(() => {
    const getMap = async () => {
      const res = await fetch(`http://flip1.engr.oregonstate.edu:5679/map?city=${city}&state=${state}&width=400&height=300`);
      
      const htmlString = await res.text();

      console.log(htmlString);
  
      setMap(htmlString)
    };

    getMap();
  }, [city, state]);

  useEffect(() => {
    const getPlaylist = async () => {
      const res = await fetch('http://flip1.engr.oregonstate.edu:1439/get-playlist?theme=roadtrip');
      
      const resText = await res.text();

      console.log(resText);

      setPlaylistURL(resText);
    };

    getPlaylist();
  }, []);

  useEffect(() => {
    const getLocationData = async () => {
      const coordsRes = await fetch(`http://api.opentripmap.com/0.1/en/places/geoname?apikey=${REACT_APP_OPEN_TRIP_API_KEY}&name=${city}+${state}&country=US`);
      
      const data = await coordsRes.json();

      const coords = { 
        lat: data.lat, 
        lon: data.lon 
      };

      const sitesRes = await fetch(`http://api.opentripmap.com/0.1/en/places/autosuggest?apikey=${REACT_APP_OPEN_TRIP_API_KEY}&name=${city}+${state}&radius=10000&lon=${coords.lon}&lat=${coords.lat}&kinds=architecture`);

      const sites = await sitesRes.json();

      setLocalSites(sites);

      const museumsRes = await fetch(`http://api.opentripmap.com/0.1/en/places/autosuggest?apikey=${REACT_APP_OPEN_TRIP_API_KEY}&name=${city}+${state}&radius=100000&lon=${coords.lon}&lat=${coords.lat}&kinds=museums`);

      const museums = await museumsRes.json();

      setLocalMuseums(museums);
    };

    getLocationData();

  }, [city, state, REACT_APP_OPEN_TRIP_API_KEY]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      let formattedCity = city.replaceAll('+', '%');
      const res = await fetch(`http://flip1.engr.oregonstate.edu:9797/search?city=${formattedCity}&state=${state}`);

      let data = await res.text();
      let dataObj = JSON.parse(data);

      console.log(dataObj);

      setRestaraunts(dataObj);
    };

    fetchRestaurants();
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
            <Grid item xs={6} style={{width: '40%'}}>
              <Item>
                <h3>Spotify Playlist</h3>
                <p>Need some tunes for your drive?</p>
                <Button variant="outlined" onClick={showPlaylistHandler} >
                  {showPlaylist ? 'Hide Playlist' : 'Generate Playlist'}
                </Button>
                {showPlaylist && (
                  <div style={{marginTop: '1rem'}}>
                    <iframe 
                      title="Day Trip Playlist"
                      id="spot" 
                      src={playlistURL} 
                      width="300" 
                      height="380" 
                      frameBorder="0" 
                      allowtransparency="true" 
                      allow="encrypted-media">
                    </iframe>
                  </div>
                )}
              </Item>
            </Grid>
            <Grid item xs={12} style={{width: '95%'}}>
              <Item style={{width: '100%'}}>
                <Results sitesData={localSites} museumData={localMuseums} restarauntData={restaraunts} />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </main>
    </Fragment>  
  )
};

export default ResultsPage;