const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const getDay = day => WEEKS.indexOf(day); // string 'mon' → number 1
export const getNum = day => WEEKS[day];

// 새로운 todo 추가하면 기존 마지막 todo.id에 + 1
// const generateId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

// Date 객체 → 오늘 요일을 알아내는 함수
export const getDate = () => new Date().getDay();

// filter by day of the week
export const filterByDay = (todos, day) => todos.filter(todo => todo.day === WEEKS[day]);

// filter by uncompleted: 오늘 전날까지 todo 요소 중에서 completed가 false인 요소 필터
export const filterByUncompleted = todos =>
  todos.filter(todo => getDay(todo.day) < getDate()).filter(todo => !todo.completed);

// filter by completed
export const filterByCompleted = todos => todos.filter(todo => todo.completed);

// filter id by uncompleted before day
export const getUncompletedId = todos => {
  // 1. 지난날짜만 뽑기
  // 2. completed값이 false 인것만 뽑기
  // 3. day가 uncompleted 아닌것만 뽑기
  return todos
    .filter(todo => getDay(todo.day) < getDate())
    .filter(todo => !todo.completed)
    .filter(todo => todo.day !== 'uncompleted');
};
