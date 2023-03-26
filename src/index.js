import "./scss/style.scss";
import gsap from "gsap";

import { setupGroup, updateGround } from "./ground";
import { getcatRect, setupcat, updatecat, catLose } from "./cat";
import { getworkRects, setupwork, updatework } from "./work";

let cat = document.querySelector(".cat1");
let tail = document.querySelector(".cat1__tail");
let txt = document.querySelector(".card__txt");

//Глаза
document.onmousemove = function (event) {
  let x1 = event.x - 232;
  let y1 = event.y - 670;
  let x2 = event.x - 1230;
  let y2 = event.y - 670;

  document.querySelector(".eye__l").style.transform =
    "rotate(" + 57.2958 * argctg(x1, y1) + "deg)";
  document.querySelector(".eye__r").style.transform =
    "rotate(" + 57.2958 * argctg(x1 - 100, y1) + "deg)";

  document.querySelector(".eye2__l").style.transform =
    "rotate(" + 57.2958 * argctg(x2, y2) + "deg)";
  document.querySelector(".eye2__r").style.transform =
    "rotate(" + 60 * argctg(-x2 + 100, -y2) + "deg)";

  function argctg(x, y) {
    if (x > 0 && y > 0) return Math.PI / 2 - Math.atan(x / y);
    if (x < 0 && y > 0) return Math.PI / 2 - Math.atan(x / y);
    if (x < 0 && y < 0) return Math.PI + Math.atan(y / x);
    if (x > 0 && y < 0) return (3 * Math.PI) / 2 + Math.abs(Math.atan(x / y));
  }
};

// Хвост
cat.onmousemove = function (event) {
  let mouseX = (event.clientX / cat.offsetWidth) * 2;
  gsap.to(tail, 1, {
    x: mouseX * 4,
    rotation: mouseX * 4,
  });
};
cat.addEventListener("mouseout", (event) => {
  gsap.to(tail, 1, {
    x: 0,
    rotation: 0,
  });
});

//Текст
gsap.from("h1", {
  rotationY: 36,
  opacity: 0,
  duration: 3,
  yPercent: -100,
  stagger: 0.1,
  ease: "elastic.out(1, 0.3)",
});

//Конфети
let total = 50;
let container = document.querySelector(".card");
let btn = document.querySelector("button");

btn.addEventListener("mouseover", confetti);

function confetti() {
  let w = container.offsetWidth;
  let h = container.offsetHeight;

  let flag = false;

  for (var i = 0, div; i < total; i++) {
    div = document.createElement("div");
    div.classList.add("dot");
    container.insertBefore(div, txt);

    gsap.set(div, {
      x: R(0, w),
      y: R(-100, 100),
      opacity: 1,
      scale: R(0, 0.5) + 0.5,
      backgroundColor: "hsl(" + R(170, 360) + ",50%,50%)",
    });

    animm(div);

    if (flag) setTimeout(del, 10000); //Если включено конфети, то удалить
  }

  function animm(elm) {
    gsap.to(elm, R(0, 5) + 3, {
      y: h,
      repeat: -1,
      delay: -5,
    });
    gsap.to(elm, R(0, 5) + 1, {
      x: "+=70",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(elm, R(0, 1) + 0.5, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
    });
    return (flag = true);
  }

  function R(min, max) {
    return min + Math.random() * (max - min);
  }
}

//Удаление конфети
function del() {
  document.querySelector(".dot").remove();
}

//Удаление блока с текстом
btn.addEventListener("click", deleteTxt);

function deleteTxt() {
  gsap.to(".card__txt-wrapp", {
    opacity: 0,
    display: "none",
    duration: 0.5,
  });

  gsap.to(".game", {
    display: "block",
    opacity: 1,
    duration: 1,
    ease: "slow",
  });
  gsap.fromTo(
    cat,
    {
      opacity: 0,
      duration: 1,
    },
    {
      opacity: 1,
      duration: 2.5,
      ease: "slow(0.7, 0.7, false)",
    }
  );
}

//Игра
const WORLD_HEIGHT = 25;
const WORLD_WIDTH = 100;
const SPEED_SCALE_INCREASE = 0.00001;

const worlElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startElem = document.querySelector("[data-start-screen]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime;
let speedScale;
let score;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  updatecat(delta, speedScale);
  updatework(delta, speedScale);
  if (checkLose()) return handleLose();

  lastTime = time;

  window.requestAnimationFrame(update);
}

//Проигрыш
function checkLose() {
  const catRect = getcatRect();
  return getworkRects().some((rect) => isCollision(rect, catRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

//увеличение скорости
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}

//стартовая позиция
function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGroup();
  setupcat();
  setupwork();
  startElem.classList.add("hide");
  window.requestAnimationFrame(update);
}

//проигрыш
function handleLose() {
  catLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startElem.classList.remove("hide");
  }, 100);
}

//для разных расширений
function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worlElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worlElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
