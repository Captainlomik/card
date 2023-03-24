import './scss/style.scss';

document.onmousemove = function (event) {
    let x = event.x - 120;
    let y = event.y - 370;

    document.querySelector('.eye__l').style.transform = 'rotate(' + 57.2958 * argctg(x, y) + 'deg)';
    document.querySelector('.eye__r').style.transform = 'rotate(' + 57.2958 * argctg(x-116, y) + 'deg)';

    function argctg(x, y) {
       if( x > 0 && y > 0) return Math.PI / 2 - Math.atan(x / y)
       if( x < 0 && y > 0) return Math.PI / 2 - Math.atan(x / y)
       if( x < 0 && y < 0) return Math.PI + Math.atan(y / x)
       if( x > 0 && y < 0) return 3 * Math.PI / 2 + Math.abs(Math.atan(x / y))
    }
}
