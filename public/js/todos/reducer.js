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

const getDay = day => WEEKS.indexOf(day); // string 'mon' → number 1
const getNum = day => WEEKS[day];

// 새로운 todo 추가하면 기존 마지막 todo.id에 + 1
// const generateId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

// Date 객체 → 오늘 요일을 알아내는 함수
const getDate = () => new Date().getDay();

// filter by day of the week
const filterByDay = (todos, day) => todos.filter(todo => todo.day === WEEKS[day]);

// filter by uncompleted: 오늘 전날까지 todo 요소 중에서 completed가 false인 요소 필터
const filterByUncompleted = todos => {
  return todos.filter(todo => getDay(todo.day) < getDate()).filter(todo => !todo.completed);
};

// filter by completed
const filterByCompleted = todos => todos.filter(todo => todo.completed);

// filter id by uncompleted before day
const getUncompletedId = todos => {
  // 1. 지난날짜만 뽑기
  // 2. completed값이 false 인것만 뽑기
  // 3. day가 uncompleted 아닌것만 뽑기
  return todos
    .filter(todo => getDay(todo.day) < getDate())
    .filter(todo => !todo.completed)
    .filter(todo => todo.day !== 'uncompleted');
};

// console.log(filterByDay(todos, 'mon'));
console.log(filterByUncompleted(todos));
// console.log(filterByCompleted(todos));
// console.log(generateId());
// getUncompletedId(todos);
// console.log(getUncompletedId(todos));
