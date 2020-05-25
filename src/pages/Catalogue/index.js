import React, {Component} from 'react';
import axios from 'axios';
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fade, withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Table from '../../components/Table';
import {LoadingButton} from '../../components/LoadingButton';

const useStyles = (theme) => ({
  root: {
    minWidth: '600px',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  loadingButton: {
    margin: '0 0 12px 0',
  },
});

class Catalogue extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      allBerriesInfo: null,
      berries: [],
      error: null,
      isLoading: false,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    this.setState({isLoading: true});

    try {
      const commonInfo = (await axios('https://pokeapi.co/api/v2/berry/?limit=20')).data;
      const berriesURLs = commonInfo.results.map((el) => el.url);
      const berries = await this.fetchBerries(berriesURLs);
      this._isMounted && this.setState({allBerriesInfo: commonInfo, berries, isLoading: false});
    } catch (error) {
      this._isMounted && this.setState({error});
    } finally {
      this._isMounted && this.setState({isLoading: false});
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClickButton = async () => {
    const {allBerriesInfo: stateAllBerriesInfo, berries: stateBerries} = this.state;
    try {
      const nextCommonInfo = (await axios(stateAllBerriesInfo.next)).data;
      const berriesURLs = nextCommonInfo.results.map((el) => el.url);
      const newBerries = await this.fetchBerries(berriesURLs);
      this._isMounted && this.setState({
        allBerriesInfo: {
          ...nextCommonInfo,
          results: [...stateAllBerriesInfo.results, ...nextCommonInfo.results],
        },
        berries: [...stateBerries, ...newBerries],
        isLoading: false,
      });
    } catch (error) {
      this._isMounted && this.setState({error});
    } finally {
      this._isMounted && this.setState({isLoading: false});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  fetchBerries = async (berriesURLs) => {
    const berries = [];
    const requestBuffer = [];
    const urls = [...berriesURLs];

    for (let i = 0; i < berriesURLs.length;) {
      let requestsNumber = 5;
      while (urls.length > 0 && requestsNumber > 0) {
        const url = urls.shift();
        requestBuffer.push(axios(url));
        requestsNumber--;
      }
      const loadedBerries = await axios.all(requestBuffer);
      berries.push(...loadedBerries.map((el) => el.data));
      requestBuffer.length = 0;
      i += requestsNumber;
    }

    return berries;
  }

  render() {
    const {classes} = this.props;
    const {
      allBerriesInfo,
      berries,
      isLoading,
    } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant='h6' noWrap>
              POKEMON BERRIES
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.handleSubmit}>
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{'aria-label': 'search'}}
                />
              </form>
            </div>
          </Toolbar>
        </AppBar>
        {isLoading
          ? <CircularProgress />
          : (
            <div>
              <Table list={berries} />
              {allBerriesInfo?.next && (
                <LoadingButton
                  isLoading={isLoading}
                  onClick={this.handleClickButton}
                  className={classes.loadingButton}
                >
                  More
                </LoadingButton>
              )}
            </div>
          )}
      </div>
    );
  }
}

export default withStyles(useStyles)(Catalogue);
