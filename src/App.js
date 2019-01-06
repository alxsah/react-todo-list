import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from './MaterialTable/MaterialTable';
import RecordDialog from './RecordDialog/RecordDialog';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  headingContainer: {
    textAlign: 'center'
  },
  heading: {
    display: 'inline-block',
    fontFamily: 'Roboto',
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    background: `linear-gradient(left, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
  }
});

class App extends Component {
  state = {
    isRecordDialogOpen: false
  }

  setDialogState = state => {
    this.setState({isRecordDialogOpen: state});
  }
  render() {
    return(
      <div className="App">
        <RecordDialog 
          open={this.state.isRecordDialogOpen}
          setDialogState={this.setDialogState}>
        </RecordDialog>
        <Button className="view-todos-record" color="primary" onClick={() => this.setDialogState(true)}>
          View Record
        </Button>
        <div className={this.props.classes.headingContainer}>
          <h1 className={this.props.classes.heading}>Todo List</h1>
        </div>
        <MaterialTable></MaterialTable>
      </div>
    );
  }
}
const AppStyled = withStyles(styles)(App);
export default hot(module)(AppStyled);