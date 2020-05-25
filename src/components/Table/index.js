import React, {Component} from 'react';
import Link from '@material-ui/core/Link';
import {withStyles} from '@material-ui/core/styles';

const useStyles = () => ({
  table: {
    margin: '12px 24px',
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
});

class Table extends Component {
  handleClickButton = () => {

  }

  render() {
    const {classes, list} = this.props;
    return (
      <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span className={classes.column}>
            Name
          </span>
          <span className={classes.column}>
            Growth time
          </span>
          <span className={classes.column}>
            Max harvest
          </span>
          <span className={classes.column}>
            Firmness
          </span>
          <span className={classes.column}>
            Details
          </span>
        </div>
        {list.map((item) => (
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
              <Link href='#' onClick={this.handleClickButton}>
                View details
              </Link>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(useStyles)(Table);
