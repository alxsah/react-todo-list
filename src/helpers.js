const storeItem = (storageKey, item) => {
  const storageItem = localStorage.getItem(storageKey);
  if (!storageItem) {
    localStorage.setItem(storageKey, JSON.stringify({ data: [item] }));
  } else {
    localStorage.setItem(storageKey, JSON.stringify({
      data: [...JSON.parse(storageItem).data, item]
    }));
  }
}

const getItem = storageKey => {
  const storageItem = localStorage.getItem(storageKey);
  if (!storageItem) return [];
  return JSON.parse(storageItem).data;
}

const generateId = () => Math.floor(Math.random() * 100000000);

const getTodos = () => getItem('todos');

const storeTodo = todo => storeItem('todos', todo);

const getRecords = () => getItem('todosRecord');

const storeRecord = record => storeItem('todosRecord', record);

const clearRecords = () => localStorage.removeItem('todosRecord');

const deleteTodo = id => {
  const todos = getTodos();
  const filteredTodos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify({data: filteredTodos}));
}

const updateTodo = (id, data) => {
  const todos = getTodos();
  const selectedIndex = todos.map(t => t.id).indexOf(id);
  todos[selectedIndex] = {
    ...todos[selectedIndex],
    name: data.name,
    description: data.description,
    date: data.date
  }
  localStorage.setItem('todos', JSON.stringify({data: todos}));
}

export default {generateId, getTodos, storeTodo, getRecords, storeRecord, clearRecords, deleteTodo, updateTodo};
