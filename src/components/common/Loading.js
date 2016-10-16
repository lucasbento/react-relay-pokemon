import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: 30,
  },
};

const InfinityLoadingSpinner = ({ show }) => (show === true ?
  (
    <div style={styles.loading}>
      <CircularProgress />
    </div>
  ) :
  null
);

export default InfinityLoadingSpinner;
