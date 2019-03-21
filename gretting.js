const nameForm = document.querySelector('.name-form'),
  input = nameForm.querySelector('input'),
  greeting = document.querySelector('.greetings');

const USER_LS = "currentUser",
  SHOW_CLASS = "show";

const saveName = (text) => {
  localStorage.setItem(USER_LS, text);
}

const handleSubmit = (event) => {
  event.preventDefault();
  const currentValue = input.value;
  patingGreeting(currentValue);
  saveName(currentValue);
}

const askForName = () => {
  nameForm.classList.add(SHOW_CLASS);
  nameForm.addEventListener('submit', handleSubmit);
}

const patingGreeting = (text) => {
  nameForm.classList.remove(SHOW_CLASS);
  greeting.classList.add(SHOW_CLASS);
  greeting.innerText = `Hello ${text}`;
}

const loadName = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    patingGreeting(currentUser);
  }
}

let init = () => {
  loadName();
}

init();