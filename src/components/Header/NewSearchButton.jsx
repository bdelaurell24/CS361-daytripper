import { Link } from 'react-router-dom';

import classes from './NewSearchButton.module.css';

const NewSearchButton = () => {

  return (
    <Link to='/' style={{ textDecoration: 'none' }}>
      <button className={classes.button}>
        <span>New Search</span>
      </button>
    </Link>
  )
};

export default NewSearchButton;