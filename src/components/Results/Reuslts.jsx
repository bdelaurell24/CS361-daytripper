import { Fragment, useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ResultList from '../ResultList/ResultList';

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Results = ({
  date,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Tabs value={value} onChange={handleChange} centered >
        <Tab label="Restaurants" />
        <Tab label="Attractions" />
        <Tab label="Local Events" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Restaurants
        <ResultList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Attractions
        <ResultList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Local Events on {date}
        <ResultList />
      </TabPanel>
    </Fragment>
  );
};

export default Results;