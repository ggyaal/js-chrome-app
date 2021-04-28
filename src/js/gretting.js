const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "show-flex";

const GREETINGS = [
  "Hi",
  "What's up",
  "Hello",
  "How are you",
  "fighting,",
  "You can do it,",
  "Glad to see you again",
];

function deleteName() {
  if (confirm("Do you want remove name?\nAll toDo lists will be lost")) {
    localStorage.clear();
    location.reload();
  }
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  if (currentValue.length !== 0) {
    paintGreeting(currentValue);
    saveName(currentValue);
  }
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function randomGreetings() {
  const rNum = Math.floor(Math.random() * GREETINGS.length);
  return GREETINGS[rNum];
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  document.querySelector(".js-toDoForm").classList.add("show-flex");
  const span = document.createElement("span");
  const btn = document.createElement("button");
  span.innerText = `${randomGreetings()} ${text}`;
  btn.innerText = "delete name";
  btn.addEventListener("click", deleteName);
  greeting.appendChild(span);
  greeting.appendChild(btn);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
