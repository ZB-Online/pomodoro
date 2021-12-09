const todos = [
  { id: 1, content: 'HTML', completed: true, day: 'sun' },
  { id: 2, content: 'CSS', completed: true, day: 'mon' },
  { id: 9, content: 'BABEL', completed: false, day: 'mon' },
  { id: 3, content: 'Javascript', completed: false, day: 'tue' },
  { id: 4, content: 'React', completed: false, day: 'wed' },
  { id: 5, content: 'Vue', completed: true, day: 'thur' },
  { id: 6, content: 'Angular', completed: true, day: 'fri' },
  { id: 7, content: 'Svelte', completed: true, day: 'sat' },
  { id: 8, content: 'Webpack', completed: false, day: 'uncompleted' },
];

const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];

// Date 객체 → 오늘 요일을 알아내는 함수
const getDate = () => new Date().getDay();

// filter by day of the week
const filterByDay = (todos, day) => todos.filter(todo => todo.day === day);

// filter by uncompleted
// 오늘 전날까지로 수정해야 함
const filterByUncompleted = todos => todos.filter(todo => !todo.completed);

// filter by completed
const filterByCompleted = todos => todos.filter(todo => todo.completed);

const getDay = day => WEEKS.indexOf(day);

// filter id by uncompleted before day
const getUncompletedId = todos => {
  // day가 uncompleted인 경우 분리
  const before = todos.filter(todo => getDay(todo.day) < getDate());
  return before.filter(el => !el.completed);
};

// 새로운 todo 추가하면 기존 마지막 todo.id에 + 1
const generateId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

console.log(filterByDay(todos, 'uncompleted'));
console.log(filterByUncompleted(todos));
console.log(filterByCompleted(todos));
console.log(generateId());
getUncompletedId(todos);
console.log(getUncompletedId(todos));
