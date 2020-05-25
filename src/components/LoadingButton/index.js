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
    color='secondary'
    disabled={isLoading}
    onClick={onClick}
    className={className}
  >
    {isLoading && <CircularProgress size={14} />}
    {!isLoading && children}
  </Button>
);
