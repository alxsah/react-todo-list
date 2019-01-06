import React, { Component } from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  bold: {
    fontWeight: 'bold'
  },
  recordItem: {
    marginBottom: '8px',
    background: '#C5CAE9',
    padding: '8px 16px',
    borderRadius: '8px',
    '& p': {
      margin: '8px 0'
    }
  },
  dialogTitle: {
    '& h2': {
      color: theme.palette.primary.main
    }
  }
});

class RecordDialog extends Component {
  state = {
    records: []
  }

  static propTypes = {
    setDialogState: PropTypes.func,
    open: PropTypes.bool,
    classes: PropTypes.object
  }

  handleEnter = () => this.setState({records: helpers.getRecords()});
  handleClose = () => this.props.setDialogState(false);
  handleClear = () => {helpers.clearRecords(); this.setState({records: []})};

  renderRecordItems = () => {
    return (
      this.state.records.length === 0 ? <p>There are no records available.</p> :
      this.state.records.map((record, index) => (
        <div className={this.props.classes.recordItem} key={index}>
          <p><span className={this.props.classes.bold}>Action:</span> {record.action}</p>
          <p><span className={this.props.classes.bold}>Todo ID:</span> {record.todo.id}</p>
          <p><span className={this.props.classes.bold}>Todo Name:</span> {record.todo.name}</p>
          <p><span className={this.props.classes.bold}>Todo Description:</span> {record.todo.description}</p>
          <p><span className={this.props.classes.bold}>Todo Date:</span> {record.todo.date}</p>
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
        <DialogTitle className={this.props.classes.dialogTitle} id="form-dialog-title">Recorded Todo Actions</DialogTitle>
        {this.renderDialogContent()}
        {this.renderDialogActions()}
      </Dialog>
    );
  }
}

const RecordDialogStyled = withStyles(styles)(RecordDialog);
export default RecordDialogStyled;
