import { Fragment } from 'react';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const ResultList = (props) => {
  const { tabTitle, data } = props;

  return (
  <Fragment>
    <Typography>{tabTitle}</Typography>
    <List>
      {data && (data.features.map(listObj => (<>
        <ListItem>
          <ListItemText
            primary={listObj.properties.name}
            secondary={`Tags: ${listObj.properties.kinds}`}
          />
        </ListItem>
        <Divider component="li" />
        </>)
      ))}
    </List>
  </Fragment>
  );
};

export default ResultList;