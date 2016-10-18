import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import spacing from 'material-ui/styles/spacing';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    flex: '0 0 50%',
    minHeight: 200,
    margin: spacing.desktopGutter,
    fontFamily: 'Roboto',
  },
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <Paper
            zDepth={2}
            style={styles.paper}
          >
            {this.props.children}
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

// TODO: fix this
export default App;
