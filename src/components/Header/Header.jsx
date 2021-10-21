import { Fragment } from 'react';

import NewSearchButton from './NewSearchButton';

import vanImage from '../../assets/VW-Bus-Trip-cover.jpeg';
import classes from './Header.module.css';

const Header = (props) => {
  const { showImage } = props;

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>DayTripper</h1>
        {!showImage && <NewSearchButton />}
      </header>
      {showImage && <div className={classes['main-image']}>
        <img src={vanImage} alt='A van on a roadtrip' />
      </div>}
    </Fragment>
  );
};

export default Header;