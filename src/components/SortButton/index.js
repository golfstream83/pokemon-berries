import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export const SortButton = ({
  sortKey,
  activeSortKey,
  isSortReverse,
  onClick,
  children,
}) => {
  const arrow = isSortReverse
    ? <ArrowUpwardIcon fontSize='inherit' />
    : <ArrowDownwardIcon fontSize='inherit' />;
  return (
    <Button
      color={sortKey === activeSortKey ? '' : 'primary'}
      onClick={() => onClick(sortKey)}
    >
      {children}
      {activeSortKey === sortKey && sortKey !== 'NONE' && arrow}
    </Button>
  );
};
