import { Fragment, useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import ResultList from '../ResultList/ResultList';
import RestarauntResults from '../ResultList/RestarauntResults';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Results = ({
  sitesData,
  museumData,
  restarauntData,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Tabs value={value} onChange={handleChange} centered >
        <Tab label="Restaurants" />
        <Tab label="Site Attractions" />
        <Tab label="Arts and Entertainment" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <RestarauntResults tabTitle="Restaurants" data={restarauntData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ResultList tabTitle="Site Attractions" data={sitesData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ResultList tabTitle="Arts and Entertainment" data={museumData} />
      </TabPanel>
    </Fragment>
  );
};

export default Results;