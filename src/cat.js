import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty";

const catElem = document.querySelector("[data-cat]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const cat_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let catFrame;
let currentFrameTime;
let yVelocity;

export function updatecat(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

export function setupcat() {
  isJumping = false;
  catFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(catElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function getcatRect() {
  return catElem.getBoundingClientRect();
}

export function catLose() {
  catElem.src = "./assets/catLose.png";
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    catElem.src = "./assets/catJump.png";
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    catFrame = (catFrame + 1) % cat_FRAME_COUNT;
    catElem.src = `./assets/motoCat${catFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return;

  incrementCustomProperty(catElem, "--bottom", yVelocity * delta);

  if (getCustomProperty(catElem, "--bottom") <= 0) {
    setCustomProperty(catElem, "--bottom", 0);
    isJumping = false;
  }
  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
}
