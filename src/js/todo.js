const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const currentId = parseInt(li.id);
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== currentId;
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  if (toDos.length !== 0) {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  } else {
    localStorage.removeItem(TODOS_LS);
  }
}

function paintToDo(text, id) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = id;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: id,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function createId() {
  return new Date().getTime();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue.length !== 0) {
    paintToDo(currentValue, createId());
  }
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
