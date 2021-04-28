const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function makeHoverNode(span, text) {
  span.addEventListener("mouseenter", function (event) {
    const span = event.target;
    const text = span.getAttribute("data-text");
    const allSpan = document.createElement("span");
    allSpan.innerText = text;
    allSpan.classList.add("all-text");
    allSpan.addEventListener("mouseleave", function (event) {
      const span = event.target;
      if (span.parentNode) {
        span.parentNode.removeChild(span);
      }
    });
    span.appendChild(allSpan);
  });

  return `${text.substring(0, 10)}...`;
}

function finToDo(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  const currentId = parseInt(li.id);
  const editToDos = toDos.map(function (item, idx) {
    if (item.id === currentId) {
      item.fin = !item.fin;
    }
    return item;
  });
  toDos = editToDos;
  saveToDos();
  paintFin();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
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

function paintFin() {
  const lis = toDoList.querySelectorAll("li");
  lis.forEach(function (li) {
    li.removeAttribute("class");
  });
  const finToDoId = toDos.map(function (toDo) {
    if (toDo.fin) return toDo.id;
  });
  finToDoId.forEach(function (id) {
    if (id) {
      const li = document.getElementById(id);
      li.classList.add("fin");
    }
  });
}

function paintToDo(text, id, fin) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const btnSpan = document.createElement("span");
  const span = document.createElement("span");
  delBtn.innerText = "❌";
  finBtn.innerText = "✔️";
  span.setAttribute("data-text", text);
  span.innerText = text.length <= 10 ? text : makeHoverNode(span, text);
  delBtn.addEventListener("click", deleteToDo);
  finBtn.addEventListener("click", finToDo);
  btnSpan.appendChild(delBtn);
  btnSpan.appendChild(finBtn);
  li.appendChild(btnSpan);
  li.appendChild(span);
  li.id = id;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: id,
    fin: fin,
  };
  toDos.push(toDoObj);
  paintFin();
  saveToDos();
}

function createId() {
  return new Date().getTime();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue.length !== 0) {
    paintToDo(currentValue, createId(), false);
  }
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, toDo.id, toDo.fin);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
