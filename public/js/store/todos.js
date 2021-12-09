import ajax from '../utils/fetch.js';

const store = {
  state: {
    todos: [],
  },

  get todos() {
    return this.state.todos;
  },
  set todos(newTodos) {
    this.state.todos = newTodos;
  },
};

const fetchTodos = async () => {
  try {
    const { data: todos } = await ajax.get('/todos');
    store(todos);
  } catch (e) {
    console.error(e);
  }
};

const generateId = () => Math.max(...store().map(todo => todo.id), 0) + 1;

const addTodo = async ( content) => {
  try {
    const { data: todos } = await ajax.post('/todos', {
      id: generateId(),
      content,
      completed: false,
    });
    store(todos);
  } catch (e) {
    console.error(e);
  }
};

const toggleTodo = async (day, id) => {
  const toggledTodo = store().map(week => (week[day].id === +id ? { ...week, week[day]: [...week[day], week[day].completed: !todo.completed] } : todo));
  //const toggledTodo = store().map(todo => todo.id === +id ?  : todo )
  //store().map(week => week[day].id === +id ?)
  store(toggledTodo);

  const { completed } = store().find(todo => todo.id === +id);

  try {
    const { data: todos } = await ajax.patch(`/todos/${day}/${id}`, { completed: !completed });
    store(todos);
  } catch (e) {
    console.error(e);
  }
};

const updateTodoContent = async ( id, content) => {
  const updatedTodo = store().map(todo => (todo.id === +id ? { ...todo, content } : todo));
  store(updatedTodo);
  try {
    const { data: todos } = await ajax.patch(`/todos/${id}`, { content });
    store(todos);
  } catch (e) {
    console.error(e);
  }
};

const removeTodo = async ( id) => {
  // store.todos = store.todos.filter(todo => todo.id !== +id);

  try {
    const { data: todos } = await ajax.delete(`/todos/${id}`);
    store(todos);
  } catch (e) {
    console.error(e);
  }
};

const removeAllCompletedTodos = async () => {
  try {
    const { data: todos } = await ajax.delete('/todos');
    store(todos);
  } catch (e) {
    console.error(e);
  }
};

export default {
  fetchTodos,
  addTodo,
  toggleTodo,
  updateTodoContent,
  removeTodo,
  removeAllCompletedTodos,
};
