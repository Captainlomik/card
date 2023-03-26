import "./scss/style.scss";
import gsap from "gsap";

let cat = document.querySelector(".cat1");
let tail = document.querySelector(".cat1__tail");
let txt = document.querySelector(".card__txt");

//Глаза
document.onmousemove = function (event) {
  let x = event.x - 208;
  let y = event.y - 368;

  document.querySelector(".eye__l").style.transform =
    "rotate(" + 57.2958 * argctg(x, y) + "deg)";
  document.querySelector(".eye__r").style.transform =
    "rotate(" + 57.2958 * argctg(x - 100, y) + "deg)";

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

btn.addEventListener("click", confetti);

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

    if (flag) setTimeout(del, 50000); //Если включено конфети, то удалить
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

