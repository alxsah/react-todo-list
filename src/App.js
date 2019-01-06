import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.scss';
import MaterialTable from './MaterialTable/MaterialTable';
import RecordDialog from './RecordDialog/RecordDialog';
import Button from '@material-ui/core/Button';


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
        <div className="heading-container">
          <h1>Todo List</h1>
        </div>
        <MaterialTable></MaterialTable>
      </div>
    );
  }
}

export default hot(module)(App);