const todoFormEl = document.querySelector('.todo-form'),
  todoInputEl = todoFormEl.querySelector('input'),
  todoListEl = document.querySelector('.todo-list');

const TODOLIST_LS = "todoList";

const todos = [];

const saveTodos = () => {
  localStorage.setItem(TODOLIST_LS, JSON.stringify(todos));
}

const deleteTodo = (event) => {
  const btnEl = event.target;
  const liEl = btnEl.parentNode;
  todoListEl.removeChild(liEl);
  const cleanTodos = todos.filter((todo) => {
    return todo.id !== parseInt(liEl.id);
  })
  saveTodos();
}

const paintTodo = (text) => {
  const liEl = document.createElement('li');
  const delBtnEl = document.createElement('button');
  const newId = todos.length + 1;
  delBtnEl.innerText = '❌';
  delBtnEl.addEventListener('click', deleteTodo);
  const spanEl = document.createElement('span');
  spanEl.innerText = text;
  liEl.appendChild(delBtnEl);
  liEl.appendChild(spanEl);
  liEl.id = newId;
  todoListEl.appendChild(liEl);
  const todoObj = {
    text: text,
    id: newId
  };
  todos.push(todoObj);
  saveTodos();
}

handleSubmit = (event) => {
  event.preventDefault();
  const currentValue = todoInputEl.value;
  paintTodo(currentValue);
  todoInputEl.value = "";
}

const loadTodoList = () => {
  const loadedTodos = localStorage.getItem(TODOLIST_LS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach((todo) => {
      paintTodo(todo.text);
    });
  }
}

init = () => {
  loadTodoList();
  todoFormEl.addEventListener('submit', handleSubmit);
}

init();