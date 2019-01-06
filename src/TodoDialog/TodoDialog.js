import './TodoDialog.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class TodoDialog extends Component {
  state = {
    showMissingFieldsError: false,
    error: false
  }
  
  static propTypes = {
    setDialogState: PropTypes.func,
    handleCompletion: PropTypes.func,
    dialogType: PropTypes.string,
    selectedTodo: PropTypes.object,
    open: PropTypes.bool
  }

  static defaultProps = {
    dialogType: 'Add',
    selectedTodo: {
      name: '',
      description: '',
    }
  };

  nameInput = React.createRef();
  descriptionInput = React.createRef();

  handleClose = () => this.props.setDialogState(this.props.dialogType, false);

  handleChange = name => event => {
    this.setState({
      showMissingFieldsError: false,
      [name]: event.target.value,
    });
  };

  areFieldsMissing = () => 
    this.nameInput.current.value === '' 
    || this.descriptionInput.current.value === '';

  handleSubmit = () => {
    if (!this.areFieldsMissing()) {
      this.props.setDialogState(this.props.dialogType, false);
      this.props.handleCompletion({
        name: this.nameInput.current.value, 
        description: this.descriptionInput.current.value, 
        date: moment().format('DD/MM/YYYY')
      });
    } else {
      this.setState({showMissingFieldsError: true})
    }
  }

  renderNameTextField = () => (
    <TextField
      autoFocus
      className="name-field"
      style={{marginBottom: '24px'}}
      margin="normal"
      id="name"
      label="Todo Name"
      type="text"
      defaultValue={this.props.selectedTodo.name}
      inputRef={this.nameInput}
      fullWidth/>
  );

  renderDescriptionTextField = () => (
    <TextField
      autoFocus
      multiline
      rows="4"
      margin="dense"
      id="description"
      label="Description"
      type="text"
      defaultValue={this.props.selectedTodo.description}
      inputRef={this.descriptionInput}
      fullWidth/>
  );

  renderDialogContent = () => (
    <DialogContent>
      {this.renderNameTextField()}
      {this.renderDescriptionTextField()}
      <p className={this.state.showMissingFieldsError ? 'error-message' : 'hidden'}>
        Please fill out all the fields.
      </p>
      <p className={this.state.error ? 'error-message' : 'hidden'}>
        There was an error
        {this.props.dialogType === 'Add' ? 'adding' : 'editing'} your todo.
      </p>
    </DialogContent>
  );

  renderDialogActions = () => (
    <DialogActions>
      <Button onClick={this.handleSubmit} color="primary">
        Confirm
      </Button>
      <Button onClick={this.handleClose} color="primary">
        Cancel
      </Button>
    </DialogActions>
  );

  render() {
    return (
      <Dialog
      open={this.props.open}
      onClose={this.handleClose}
      onEnter={this.handleEnter}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{this.props.dialogType} a Todo</DialogTitle>
      {this.renderDialogContent()}
      {this.renderDialogActions()}
    </Dialog>
    );
  }
}

export default TodoDialog;