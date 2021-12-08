import ajax from '../utils/fetch.js';

const $todoInput = document.querySelector('.todo-input');
const $destroy = document.querySelector('.destroy');

document.querySelector('.todo-form').addEventListener('submit', e => {
  e.preventDefault();
  const content = $todoInput.value;
  const day = 'mon';
  ajax.post('/todos', { id: 4, content, completed: false, day });
});

$destroy.addEventListener('click', e => {
  ajax.delete(`/todos`);
  // ajax.patch(`/todos/${'mon'}/4`, {
  //   id: 5,
  // });
});

const render = () => {};
