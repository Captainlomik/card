import "./scss/style.scss";
import gsap from "gsap";

let cat = document.querySelector(".cat1");
let tail = document.querySelector(".cat1__tail");

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
   let mouseX = (event.clientX / cat.offsetWidth) * 2
  gsap.to(tail, 1, {
      x: mouseX * 4,
      rotation: mouseX * 4,

  });
    console.log( mouseX -2  )
};
cat.addEventListener("mouseout", (event) => {
  gsap.to(tail, 1, {
    x: 0,
      rotation: 0,
  });
});
