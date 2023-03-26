import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty";

const SPEED = 0.05;
const work_INTERVAL_MIN = 700;
const work_INTERVAL_MAX = 3000;
const worldElem = document.querySelector("[data-world]");

let nextworkTime;

export function setupwork() {
  nextworkTime = work_INTERVAL_MIN;
  document.querySelectorAll("[data-work]").forEach((work) => {
    work.remove();
  });
}

export function updatework(delta, speedScale) {
  document.querySelectorAll("[data-work]").forEach((work) => {
    incrementCustomProperty(work, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(work, "--left") <= -100) {
      work.remove();
    }
  });

  if (nextworkTime <= 0) {
    creatework();
    nextworkTime =
      randomNumberBetween(work_INTERVAL_MIN, work_INTERVAL_MAX) / speedScale;
  }
  nextworkTime -= delta;
}

export function getworkRects() {
  return [...document.querySelectorAll("[data-work]")].map((work) => {
    return work.getBoundingClientRect();
  });
}

function creatework() {
  const work = document.createElement("img");
  work.dataset.work = true;
  work.src = "./assets/laptop.png";
  work.classList.add("work");
  setCustomProperty(work, "--left", 100);
  worldElem.append(work);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
