const body = document.querySelector("body");

const IMG_NUMBER = 9;

function paintImg(imgNum) {
  const image = new Image();
  image.src = `../images/${imgNum}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
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
