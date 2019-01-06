import './MaterialTable.scss';
import React, { Component } from 'react';
import helpers from '../helpers';
import TodoDialog from '../TodoDialog/TodoDialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

class MaterialTable extends Component {
  state = {
    todos: [],
    selected: '',
    hideDelete: true,
    isAddDialogOpen: false,
    isEditDialogOpen: false,
    recording: false,
  };

  componentDidMount = () => this.setState({todos: helpers.getTodos()});

  handleRowClick = id => () => {
    if (this.state.selected === id) {
      this.setState({selected: ''});
    } else {
      this.setState({selected: id});
    }
  };

  handleDeleteClick = () => {
    const selectedTodo = this.getSelectedTodo();
    helpers.deleteTodo(selectedTodo.id);
    this.setState({
      todos: helpers.getTodos(),
      selected: ''
    });
    if (this.state.recording) {
      helpers.storeRecord({
        action: 'Delete',
        todo: selectedTodo
      })
    }
  };

  handleRecordClick = () => {
    this.setState({recording: !this.state.recording});
  }

  setDialogState = (dialogType, state) =>
    dialogType === 'Add' ? this.setState({isAddDialogOpen: state})
    : this.setState({isEditDialogOpen: state});

  handleAddCompletion = dataObj => {
    const newTodo = {
      id: helpers.generateId(),
      ...dataObj,
    }
    helpers.storeTodo(newTodo);
    this.setState({todos: helpers.getTodos()});
    if (this.state.recording) {
      helpers.storeRecord({
        action: 'Add',
        todo: newTodo
      })
    }
  };

  isNothingSelected = () => this.state.selected.length === 0;

  isSelected = id => this.state.selected === id;

  getSelectedTodo = () => this.state.todos.filter(todo => this.isSelected(todo.id))[0];

  handleEditCompletion = dataObj => {
    if (!dataObj) return;
    helpers.updateTodo(this.state.selected, dataObj);
    this.setState({todos: helpers.getTodos()});
    if (this.state.recording) {
      helpers.storeRecord({
        action: 'Edit',
        todo: {
          id: this.state.selected,
          ...dataObj
        }
      })
    }
  }

  renderDialogs = () => (
    <div>
      <TodoDialog 
      dialogType="Add"
        open={this.state.isAddDialogOpen}
        setDialogState={this.setDialogState}
        handleCompletion={this.handleAddCompletion}/>
      <TodoDialog
        dialogType="Edit"
        selectedTodo={this.getSelectedTodo()}
        open={this.state.isEditDialogOpen} 
        setDialogState={this.setDialogState}
        handleCompletion={this.handleEditCompletion}/>
    </div>
  );

  renderTableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
      {/* <TableCell>ID</TableCell> */}
      <TableCell>Name</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Date</TableCell>
      <TableCell className="icon-cell">
        <div className="icon-container">
          <IconButton 
            className="record-icon"
            aria-label="Record">
            <FiberManualRecordIcon
              className={this.state.recording ? 'recording' : ''}
              onClick={this.handleRecordClick}/>
          </IconButton>
          <IconButton 
            className="add-icon"
            aria-label="Add">
            <AddIcon 
              onClick={() => this.setDialogState('Add', true)}/>
          </IconButton>
          <IconButton 
            className={'edit-icon ' + (this.isNothingSelected() ? 'hidden' : '')} 
            aria-label="Edit">
            <EditIcon 
              onClick={() => this.setDialogState('Edit', true)}/>
          </IconButton>
          <IconButton 
            className={'delete-icon ' + (this.isNothingSelected() ? 'hidden' : '')} 
            aria-label="Delete">
            <DeleteIcon 
              onClick={this.handleDeleteClick}/>
          </IconButton>
        </div>
      </TableCell>
      </TableRow>
    </TableHead>
  );

  renderTableBody = () => (
    <TableBody>
      {this.state.todos.map(row => {
        return (
          <TableRow 
            key={row.id}
            role="checkbox"
            onClick={this.handleRowClick(row.id)}
            selected={this.isSelected(row.id)}>
            <TableCell padding="checkbox">
              <Checkbox checked={this.isSelected(row.id)} />
            </TableCell>
            {/* <TableCell component="th" scope="row">
              {row.id}
            </TableCell> */}
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
  
  render() {
    return (
    <Paper className="paper">
      {this.renderDialogs()}
      <Table padding="dense">
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    </Paper>
    )
  }
}

export default MaterialTable;
