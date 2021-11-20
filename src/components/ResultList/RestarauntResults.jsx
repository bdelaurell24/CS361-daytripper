import { Fragment } from 'react';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const RestarauntResults = ({ data, tabTitle }) => {
  return (
    <Fragment>
      <Typography>{tabTitle}</Typography>
      <List>
        {data && (data.map((restaraunt, index) => (<>
          <ListItem key={index} >
            <ListItemText
              primary={restaraunt.name}
              secondary={
                <Fragment>
                {`Price: ${restaraunt.price}`}
                <br />
                {`Address: ${restaraunt.street}, ${restaraunt.city}, ${restaraunt.state}`}
                </Fragment>
              }
            />
          </ListItem>
          <Divider component="li" />
          </>)
        ))}
        {!data && (
          <Typography variant="overline">Sorry, we found no results!</Typography>
        )}
      </List>
    </Fragment>
    );
};

export default RestarauntResults;