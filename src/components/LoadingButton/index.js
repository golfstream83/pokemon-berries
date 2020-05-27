import React from 'react';
import {CircularProgress, Button} from '@material-ui/core';

export const LoadingButton = ({
  children,
  isLoading,
  onClick,
  className,
}) => (
  <Button
    variant='contained'
    color='primary'
    onClick={onClick}
    className={className}
    size='small'
  >
    {isLoading && <CircularProgress color='secondary' size={14} />}
    {!isLoading && children}
  </Button>
);
