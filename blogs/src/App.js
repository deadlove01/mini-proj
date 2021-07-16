import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Container, Grid, TextField, Typography } from '@material-ui/core'
import PostCreate from './components/PostCreate';

const App = () => {


  return (
    <Grid container direction="column">
      <Grid item container sm={false} xs={false}>
        <Grid item xs={false} sm={2} />
          <PostCreate />
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
}

export default App;
