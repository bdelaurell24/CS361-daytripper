import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header/Header';

const ResultsPage = () => {
  const params = useParams();

  const { date, city, state } = params;

  return (
    <Fragment>
      <Header showImage={false} />
      <div>{`${date}: ${city}, ${state}`}</div>
    </Fragment>  
  )
};

export default ResultsPage;