import './scss/style.scss';
import gsap from 'gsap';

document.onmousemove = function (event) {
    let x = event.x - 208;
    let y = event.y - 368;

    document.querySelector('.eye__l').style.transform = 'rotate(' + 57.2958 * argctg(x, y) + 'deg)';
    document.querySelector('.eye__r').style.transform = 'rotate(' + 57.2958 * argctg(x-100, y) + 'deg)';

    function argctg(x, y) {
       if( x > 0 && y > 0) return Math.PI / 2 - Math.atan(x / y)
       if( x < 0 && y > 0) return Math.PI / 2 - Math.atan(x / y)
       if( x < 0 && y < 0) return Math.PI + Math.atan(y / x)
       if( x > 0 && y < 0) return 3 * Math.PI / 2 + Math.abs(Math.atan(x / y))
    }
}

// let eye = document.querySelector('.eye__l')
// console.log(eye.getBoundingClientRect())

let cat = document.querySelector('.cat1')

cat.onmousemove = function(event){
    document.querySelector('.cat1__tail').style.transform = ''
}

gsap.to(".cat1" , {
    borderRadius: 50,
    x: 100,
    scale: 1.5,
    duration:1
  })