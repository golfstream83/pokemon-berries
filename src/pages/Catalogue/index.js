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
import {BERRIES_INFO_LOADING_DEFAULT_URL} from '../../constants';

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
  content: {
    textAlign: 'center',
  },
  table: {
    textAlign: 'center',
  },
  loadingButton: {
    marginBottom: '12px',
    display: 'inline-block',
  },
  error: {
    marginTop: '12px',
    color: theme.palette.error.main,
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
      isLoadingInitialData: false,
      isLoadingAdditionalData: false,
      searchTerm: '',
    };
  }

  componentDidMount() {
    const {berriesInfo, berries} = this.props;

    if (isEmpty(berriesInfo) || isEmpty(berries)) {
      this.loadData(BERRIES_INFO_LOADING_DEFAULT_URL, true);
    }
  }

  handleClickButton = () => {
    this.loadData(this.props.berriesInfo.next);
  }

  handleChangeSearchText = (event) => {
    this.setState({searchTerm: event.target.value}, () => this.debouncedSearchByName());
  }

  loadData = async (url, isInitialLoading = false) => {
    try {
      this.setState({
        isLoadingInitialData: isInitialLoading, isLoadingAdditionalData: !isInitialLoading,
      });
      const {onAddBerries, onAddBerriesInfo} = this.props;
      const newBerriesInfo = (await axios(url)).data;
      const berriesURLs = newBerriesInfo.results.map((el) => el.url);
      const newBerries = await this.getBerries(berriesURLs);
      onAddBerriesInfo(newBerriesInfo);
      onAddBerries(newBerries);
    } catch (error) {
      this.setState({error});
    } finally {
      this.setState({
        isLoadingInitialData: isInitialLoading && !isInitialLoading,
        isLoadingAdditionalData: isInitialLoading && !isInitialLoading,
      });
    }
  }

  getBerries = async (berriesURLs) => {
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

  renderContent = () => {
    const {
      classes,
      berriesInfo,
      berries,
    } = this.props;
    const {
      filteredBerries,
      searchTerm,
      isLoadingAdditionalData,
      error,
    } = this.state;
    const list = searchTerm ? filteredBerries : berries;

    if (error) {
      return this.renderError();
    }

    return (
      <div className={classes.table}>
        <Table list={list} />
        {berriesInfo?.next && (
          <LoadingButton
            isLoading={isLoadingAdditionalData}
            onClick={this.handleClickButton}
            className={classes.loadingButton}
          >
            More
          </LoadingButton>
        )}
      </div>
    );
  }

  renderError = () => <div className={this.props.classes.error}>Something went wrong...</div>;

  render() {
    const {classes} = this.props;
    const {searchTerm, isLoadingInitialData} = this.state;

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
        <div className={classes.content}>
          {isLoadingInitialData ? <CircularProgress /> : this.renderContent()}
        </div>
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
