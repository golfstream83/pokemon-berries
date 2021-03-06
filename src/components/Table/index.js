import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {SortButton} from '../SortButton';
import {SORTS} from '../../constants';

const useStyles = (theme) => ({
  table: {
    margin: '12px auto',
    width: '800px',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '24px',
    fontSize: '16px',
    padding: '0 10px',
  },
  row: {
    display: 'flex',
    lineHeight: '24px',
    whiteSpace: 'nowrap',
    margin: '10px 0',
    padding: '10px',
    background: '#ffffff',
    border: '1px solid #e3e3e3',
  },
  column: {
    width: '20%',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
});

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };
  }

  handleSort = (sortKey) => {
    const {sortKey: prevSortKey, isSortReverse: prevIsSortReverse} = this.state;
    const isSortReverse = prevSortKey === sortKey && !prevIsSortReverse;
    this.setState({sortKey, isSortReverse});
  }

  render() {
    const {classes, list} = this.props;
    const {sortKey, isSortReverse} = this.state;
    const sortedList = SORTS[sortKey](list) || [];
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span className={classes.column}>
            <SortButton
              sortKey='NAME'
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
              onClick={this.handleSort}
            >
              Name
            </SortButton>
          </span>
          <span className={classes.column}>
            <SortButton
              sortKey='GROWTH_TIME'
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
              onClick={this.handleSort}
            >
              Growth time
            </SortButton>
          </span>
          <span className={classes.column}>
            <SortButton
              sortKey='MAX_HARVEST'
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
              onClick={this.handleSort}
            >
              Max harvest
            </SortButton>
          </span>
          <span className={classes.column}>
            <SortButton
              sortKey='FIRMNESS'
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
              onClick={this.handleSort}
            >
              Firmness
            </SortButton>
          </span>
          <span className={classes.column}>
            <Button color='primary'>
              Details
            </Button>
          </span>
        </div>

        {reverseSortedList.map((item) => (
          <div key={item.name} className={classes.row}>
            <span className={classes.column}>
              {item.name}
            </span>
            <span className={classes.column}>
              {item.growth_time}
            </span>
            <span className={classes.column}>
              {item.max_harvest}
            </span>
            <span className={classes.column}>
              {item.firmness.name}
            </span>
            <span className={classes.column}>
              <Typography variant='body2' color='inherit'>
                <NavLink
                  to={`/berries/${item.id}`}
                  className={classes.link}
                >
                  more details...
                </NavLink>
              </Typography>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(useStyles)(Table);
