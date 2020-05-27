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

const useStyles = (theme) => ({
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
  cardContent: {
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
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
          <div>
            Growth time:
            {' '}
            {berry.growth_time}
          </div>
          <div>
            Max harvest:
            {' '}
            {berry.max_harvest}
          </div>
          <div>
            Firmness:
            {' '}
            {berry.firmness.name}
          </div>
          <div>
            Natural gift power:
            {' '}
            {berry.natural_gift_power}
          </div>
          <div>
            Natural gift type:
            {' '}
            {berry.natural_gift_type.name}
          </div>
          <div>
            Smoothness:
            {' '}
            {berry.smoothness}
          </div>
          <div>
            Soil dryness:
            {' '}
            {berry.soil_dryness}
          </div>
          <div>
            Size:
            {' '}
            {berry.size}
          </div>
        </Typography>
        <hr />
        {this.renderLinksToBerriesWithSimilarFirmness()}
      </>
    );
  }

  renderLinksToBerriesWithSimilarFirmness = () => {
    const {berries, classes} = this.props;
    return (
      <Typography variant='body1'>
        <span>Berries with similar firmness</span>
        <div>
          {
          berries
            .filter((berry) => berry.firmness.name === this.state.berry.firmness.name)
            .map((berry) => (
              <>
                <NavLink to={`/berries/${berry.id}`} className={classes.link}>{`${berry.name}`}</NavLink>
                {' '}
              </>
            ))
        }
        </div>
      </Typography>
    );
  }

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
            <NavLink to='/berries/' className={classes.link}>
              Back to berries list
            </NavLink>
          </CardActions>
          <CardContent className={classes.cardContent}>
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
