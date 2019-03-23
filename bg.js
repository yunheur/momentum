const bodyEl = document.querySelector('body');

const IMG_NUMBER = 5;

const paintImage = (imgNum) => {
  const image = new Image();
  image.src = `images/${imgNum + 1}.jpg`;
  image.classList.add('bgImage');
  bodyEl.prepend(image);
}

const genRandom = () => {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

init = () => {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();