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
    disabled={isLoading}
    onClick={onClick}
    className={className}
    size='small'
  >
    {isLoading && <CircularProgress size={14} />}
    {!isLoading && children}
  </Button>
);
