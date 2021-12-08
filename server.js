const express = require('express');

const app = express();
const PORT = 5000;

// Mock data
let todos = {
  sun: [
    { id: 3, content: 'Javascript', completed: false, day: 'sun' },
    { id: 2, content: 'CSS', completed: true, day: 'sun' },
    { id: 1, content: 'HTML', completed: false, day: 'sun' },
  ],
  mon: [
    { id: 3, content: 'A', completed: false, day: 'mon' },
    { id: 2, content: 'B', completed: true, day: 'mon' },
    { id: 1, content: 'C', completed: false, day: 'mon' },
  ],
  tue: [
    { id: 3, content: 'D', completed: false, day: 'tue' },
    { id: 2, content: 'E', completed: true, day: 'tue' },
    { id: 1, content: 'F', completed: false, day: 'tue' },
  ],
  wed: [
    { id: 3, content: '1', completed: false, day: 'wed' },
    { id: 2, content: '2', completed: true, day: 'wed' },
    { id: 1, content: '3', completed: false, day: 'wed' },
  ],
  thu: [
    { id: 3, content: '65', completed: false, day: 'thu' },
    { id: 2, content: 'sgf', completed: true, day: 'thu' },
    { id: 1, content: 'af3we5', completed: false, day: 'thu' },
  ],
  fri: [
    { id: 3, content: 'MOMO', completed: false, day: 'fri' },
    { id: 2, content: 'EOEO', completed: true, day: 'fri' },
    { id: 1, content: 'ahaoao', completed: false, day: 'fri' },
  ],
  sat: [
    { id: 3, content: 'lulu', completed: false, day: 'sat' },
    { id: 2, content: 'CJM', completed: true, day: 'sat' },
    { id: 1, content: 'DMD', completed: false, day: 'sat' },
  ],
  uncompleted: [
    { id: 3, content: 'haha', completed: false, day: 'uncompleted' },
    { id: 2, content: 'hoho', completed: true, day: 'uncompleted' },
    { id: 1, content: 'hihi', completed: false, day: 'uncompleted' },
  ],
};

app.use(express.static('public'));
app.use(express.json());

// GET /todos
app.get('/todos', (req, res) => {
  res.send(todos);
});

// POST /todos
app.post('/todos', (req, res) => {
  const day = req.body.day;
  const newTodo = req.body;
  todos[day] = [...todos[day], newTodo];

  res.send(todos);
});

// PATCH /todos {completed}
app.patch('/todos', (req, res) => {
  const { completed, day } = req.body;
  todos[day] = todos[day].map(todo => ({ ...todo, completed }));

  res.send(todos);
});

// PATCH /todos/:id {completed} or {content}
app.patch('/todos/:day/:id', (req, res) => {
  const { id, day } = req.params;
  const payload = req.body;

  todos[day] = todos[day].map(todo => (todo.id === +id ? { ...todo, ...payload } : todo));

  res.send(todos);
});

// DELETE /todos/:id
app.delete('/todos/:day/:id([0-9]+)', (req, res) => {
  const { id, day } = req.params;
  todos[day] = todos[day].filter(todo => todo.id !== +id);

  res.send(todos);
});

// DELETE /todos
app.delete('/todos', (req, res) => {
  todos = {};
  res.send(todos);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
