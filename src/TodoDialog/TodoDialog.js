import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  errorMessage: {
    fontFamily: 'Roboto',
    color: theme.palette.secondary.main
  },
  hidden: {
    visibility: 'hidden'
  }
});

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
    open: PropTypes.bool,
    classes: PropTypes.object
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
      fullWidth
      className="name-field"
      style={{marginBottom: '24px'}}
      margin="normal"
      id="name"
      label="Todo Name (Max 50 chars)"
      type="text"
      defaultValue={this.props.selectedTodo.name}
      inputRef={this.nameInput}
      inputProps={{ maxLength: 50 }}
      />
  );

  renderDescriptionTextField = () => (
    <TextField
      autoFocus
      multiline
      fullWidth
      rows="4"
      margin="dense"
      id="description"
      label="Description (Max 200 chars)"
      type="text"
      defaultValue={this.props.selectedTodo.description}
      inputRef={this.descriptionInput}
      inputProps={{ maxLength: 200 }}
      />
  );

  renderDialogContent = () => (
    <DialogContent>
      {this.renderNameTextField()}
      {this.renderDescriptionTextField()}
      <p className={this.state.showMissingFieldsError ? this.props.classes.errorMessage : this.props.classes.hidden}>
        Please fill out all the fields.
      </p>
    </DialogContent>
  );

  renderDialogActions = () => (
    <DialogActions>
      <Button onClick={this.handleSubmit} color="primary">
        Confirm
      </Button>
      <Button onClick={this.handleClose} color="secondary">
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

const TodoDialogStyled = withStyles(styles)(TodoDialog);
export default TodoDialogStyled;