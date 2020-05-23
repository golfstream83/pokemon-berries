import React, {Component} from 'react';
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const useStyles = (theme) => ({});

class Detail extends Component {
  render() {
    const {classes} = this.props;
    return (
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6' color='inherit'>
            BERRY
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(useStyles)(Detail);
