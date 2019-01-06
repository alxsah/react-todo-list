import './RecordDialog.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class RecordDialog extends Component {
  state = {
    records: []
  }
  static propTypes = {
    setDialogState: PropTypes.func,
    open: PropTypes.bool
  }

  handleEnter = () => this.setState({records: helpers.getRecords()});
  handleClose = () => this.props.setDialogState(false);
  handleClear = () => {helpers.clearRecords(); this.setState({records: []})};

  renderRecordItems = () => {
    return (
      this.state.records.length === 0 ? <p>There are no records available.</p> :
      this.state.records.map((record, index) => (
        <div className="record-item" key={index}>
          <p><span className="bold">Action:</span> {record.action}</p>
          <p><span className="bold">Todo ID:</span> {record.todo.id}</p>
          <p><span className="bold">Todo Name:</span> {record.todo.name}</p>
          <p><span className="bold">Todo Description:</span> {record.todo.description}</p>
          <p><span className="bold">Todo Date:</span> {record.todo.date}</p>
        </div>
      ))
    )
  }

  renderDialogContent = () => (
    <DialogContent>
      <DialogContentText component={'div'}>
        {this.renderRecordItems()}
      </DialogContentText>
    </DialogContent>
  );

  renderDialogActions = () => (
    <DialogActions>
      <Button onClick={this.handleClose} color="primary">
        Done
      </Button>
      <Button onClick={this.handleClear} color="secondary">
        Clear
      </Button>
    </DialogActions>
  );

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        onEnter={this.handleEnter}
        scroll="paper"
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Recorded Todo Actions</DialogTitle>
        {this.renderDialogContent()}
        {this.renderDialogActions()}
      </Dialog>
    );
  }
}

export default RecordDialog;
