import React, {Component} from 'react';
import {debounce, isEmpty} from 'lodash';
import axios from 'axios';
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fade, withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {connect} from 'react-redux';
import Table from '../../components/Table';
import {LoadingButton} from '../../components/LoadingButton';
import {doAddBerries, doAddBerriesInfo} from '../../actions';

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
  debouncedSearchByName = debounce(() => {
    const {berries} = this.props;
    const {searchTerm} = this.state;
    const filteredBerries = berries.filter((el) => el.name.includes(searchTerm));
    this.setState({filteredBerries});
  }, 350);

  constructor(props) {
    super(props);

    this.state = {
      filteredBerries: [],
      isLoading: false,
      searchTerm: '',
    };
  }

  async componentDidMount() {
    const {
      onAddBerries, onAddBerriesInfo, berriesInfo, berries,
    } = this.props;
    this._isMounted = true;

    if (isEmpty(berriesInfo) || isEmpty(berries)) {
      try {
        this.setState({isLoading: true});
        const newBerriesInfo = (await axios('https://pokeapi.co/api/v2/berry/?limit=20')).data;
        onAddBerriesInfo(newBerriesInfo);
        const berriesURLs = newBerriesInfo.results.map((el) => el.url);
        const newBerries = await this.fetchBerries(berriesURLs);
        onAddBerries(newBerries);
        if (this._isMounted) {
          this.setState({isLoading: false});
        }
      } catch (error) {
        if (this._isMounted) {
          this.setState({error});
        }
      } finally {
        if (this._isMounted) {
          this.setState({isLoading: false});
        }
      }
    }
  }

  handleClickButton = async () => {
    const {berriesInfo: prevBerriesInfo, onAddBerries, onAddBerriesInfo} = this.props;
    try {
      const nextCommonInfo = (await axios(prevBerriesInfo.next)).data;
      onAddBerriesInfo(nextCommonInfo);
      const berriesURLs = nextCommonInfo.results.map((el) => el.url);
      const newBerries = await this.fetchBerries(berriesURLs);
      onAddBerries(newBerries);
      if (this._isMounted) {
        this.setState({isLoading: false});
      }
    } catch (error) {
      if (this._isMounted) {
        this.setState({error});
      }
    } finally {
      if (this._isMounted) {
        this.setState({isLoading: false});
      }
    }
  }

  handleChangeSearchText = (event) => {
    this.setState({searchTerm: event.target.value}, () => this.debouncedSearchByName());
  }

  fetchBerries = async (berriesURLs) => {
    const berries = [];
    const requestBuffer = [];
    const urls = [...berriesURLs];

    for (let i = 0; i < berriesURLs.length;) {
      let requestsNumber = 5;
      /* eslint-disable no-await-in-loop */
      while (urls.length > 0 && requestsNumber > 0) {
        const url = urls.shift();
        requestBuffer.push(axios(url));
        requestsNumber -= 1;
      }
      const loadedBerries = await axios.all(requestBuffer);
      berries.push(...loadedBerries.map((el) => el.data));
      requestBuffer.length = 0;
      i += requestsNumber;
      /* eslint-enable no-await-in-loop */
    }

    return berries;
  }

  renderTable = () => {
    const {
      classes,
      berriesInfo,
      berries,
    } = this.props;
    const {
      filteredBerries,
      searchTerm,
      isLoading,
    } = this.state;
    const list = searchTerm ? filteredBerries : berries;

    return (
      <div>
        <Table list={list} />
        {berriesInfo?.next && (
        <LoadingButton
          isLoading={isLoading}
          onClick={this.handleClickButton}
          className={classes.loadingButton}
        >
          More
        </LoadingButton>
        )}
      </div>
    );
  }

  render() {
    const {classes} = this.props;
    const {searchTerm, isLoading} = this.state;

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
              <InputBase
                value={searchTerm}
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
                onChange={this.handleChangeSearchText}
              />
            </div>
          </Toolbar>
        </AppBar>
        {isLoading ? <CircularProgress /> : this.renderTable()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddBerries: (berries) => dispatch(doAddBerries(berries)),
  onAddBerriesInfo: (berriesInfo) => dispatch(doAddBerriesInfo(berriesInfo)),
});

const mapStateToProps = (state) => ({
  berries: state.berriesState.berries,
  berriesInfo: state.berriesInfoState.berriesInfo,
  error: state.berriesState.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Catalogue));
