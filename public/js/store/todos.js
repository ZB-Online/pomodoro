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

const generateId = day => Math.max(...store()[day].map(todo => todo.id), 0) + 1;

const addTodo = async (day, content) => {
  try {
    const { data: todos } = await ajax.post('/todos', {
      id: generateId(day),
      content,
      completed: false,
      day,
    });
    store(todos);
  } catch (e) {
    console.error(e);
  }
};

const toggleTodo = async (day, id) => {
  // 수정합니다!!!!!!!!!!!
  const toggledTodo = store().map(week => (week[day].id === +id ? { ...week, week[day]: [...week[day], week[day].completed: !todo.completed] } : todo));
  store().map(week => week[day].id === +id ?)
  // todos객체 > 요일객체 > 배열
  store(toggledTodo);

  const { completed } = store().find(todo => todo.id === +id);

  try {
    const { data: todos } = await ajax.patch(`/todos/${day}/${id}`, { completed: !completed });
    store(todos);
  } catch (e) {
    console.error(e);
  }
};

const updateTodoContent = async (day, id, content) => {
  const updatedTodo = store().map(todo => (todo[day].id === +id ? { ...todo, content } : todo));
  store(updatedTodo);
  try {
    const { data: todos } = await ajax.patch(`/todos/${day}/${id}`, { content });
    store(todos);
  } catch (e) {
    console.error(e);
  }
};

const removeTodo = async (day, id) => {
  // store.todos = store.todos.filter(todo => todo.id !== +id);

  try {
    const { data: todos } = await ajax.delete(`/todos/${day}/${id}`);
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
