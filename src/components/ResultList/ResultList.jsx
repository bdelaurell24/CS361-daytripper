import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const ResultList = () => {
  return (
    <List>
      <ListItem>
        <ListItemText
          primary='Title'
          secondary='Info about bla bla bla'
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary='Title'
          secondary='Info about bla bla bla'
        />
      </ListItem>
      <Divider  component="li" />
      <ListItem>
        <ListItemText
          primary='Title'
          secondary='Info about bla bla bla'
        />
      </ListItem>
    </List>
  );
};

export default ResultList;