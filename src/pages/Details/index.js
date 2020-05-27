import React, {Component} from 'react';
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

const useStyles = () => ({
  root: {
    minWidth: '600px',
  },
  toolbar: {
    margin: '8px 0',
  },
  card: {
    width: '800px',
    margin: '12px auto',
  },
  backlink: {
    marginLeft: '0',
  },
});

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      berry: null,
    };
  }

  componentDidMount() {
    const {match: {params: {id}}, berries} = this.props;
    const berry = berries?.find((el) => el.id.toString() === id);
    this.setState({berry});
  }

  componentDidUpdate(prevProps) {
    const {match: {params: {id}}, berries} = this.props;
    const {match: {params: {id: prevId}}} = prevProps;
    if (id !== prevId) {
      const berry = berries?.find((el) => el.id.toString() === id);
      this.setState({berry});
    }
  }

  renderContent = () => {
    const {berry} = this.state;
    return (
      <>
        <Typography variant='body1'>
          Growth time:
          {berry.growth_time}
          Max harvest:
          {berry.max_harvest}
          Firmness:
          {berry.firmness.name}
          Natural gift power:
          {berry.natural_gift_power}
          Natural gift type:
          {berry.natural_gift_type.name}
          Smoothness:
          {berry.smoothness}
          Soil dryness:
          {berry.soil_dryness}
          Size:
          {berry.size}
        </Typography>
        <hr />
        {this.renderLinksToBerriesWithSimilarFirmness()}
      </>
    );
  }

  renderLinksToBerriesWithSimilarFirmness = () => (
    <>
      <span>Berries with similar firmness</span>
      <div>
        {
          this.props.berries
            .filter((berry) => berry.firmness.name === this.state.berry.firmness.name)
            .map((berry) => (
              <>
                <NavLink to={`/berries/${berry.id}`}>{`${berry.name}`}</NavLink>
                {' '}
              </>
            ))
            }
      </div>
    </>
  )

  renderError = () => <div>Something went wrong...</div>;

  render() {
    const {classes} = this.props;
    const {berry} = this.state;
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar variant='dense' className={classes.toolbar}>
            <Typography variant='h6' color='inherit'>
              {berry && berry.name?.toUpperCase()}
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardActions>
            <ArrowBackIcon color='primary' fontSize='inherit' />
            <NavLink to='/berries/'>
              Back to berries list
            </NavLink>
          </CardActions>
          <CardContent>
            {berry ? this.renderContent() : this.renderError()}
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  berries: state.berriesState.berries,
  berriesInfo: state.berriesInfoState.berriesInfo,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Details));
