const body = document.querySelector("body");
const container = document.querySelector(".container");
const upside = document.querySelector(".upside");

const IMG_NUMBER = 13;

function paintColor(num) {
  if (num % 2 !== 0) {
    upside.classList.add("dark");
  }
}

function paintImg(imgNum) {
  const image = new Image();
  image.src = `../images/${imgNum}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
  paintColor(imgNum);
  setTimeout(function () {
    container.classList.add("show-flex");
  }, 2000);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER + 1);
  return number;
}

function init() {
  const imgNum = genRandom();
  paintImg(imgNum);
}

init();
