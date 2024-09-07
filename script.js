document.addEventListener('DOMContentLoaded', () => {
    const egg = document.getElementById('egg');
    const basket = document.getElementById('basket');
    let eggFallingInterval;
    let eggTopPosition = 0;
    const basketWidth = basket.offsetWidth;
    const eggWidth = egg.offsetWidth;
    function startEggFall() {
        eggTopPosition = 0;
        egg.style.left = '${Math.random() * (window.innerWidth - eggWidth)}px';
        egg.style.top = '-70px';
        egg.style.display = 'block';

        eggFallingInterval = setInterval(() => {
            eggTopPosition += 5;
            egg.style.top = '${eggTopPosition}px';

            if (eggTopPosition > window.innerHeight - 40) {
                checkCollision();
            }
        }, 20);
    }
    function checkCollision() {
        const eggRect = egg.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();
        if (
            eggRect.left < basketRect.right &&
            eggRect.right > basketRect.left &&
            eggRect.bottom > basketRect.top
        ) {
            clearInterval(eggFallingInterval);
            egg.style.display = 'none';
            setTimeout(startEggFall, 1000); 
        } else if (eggTopPosition > window.innerHeight) {
            clearInterval(eggFallingInterval);
            alert("لقد سقطت البيضة! حاول مرة أخرى.");
            setTimeout(startEggFall, 1000); 
        }
    }
    document.addEventListener('mousemove', (event) => {
        const basketPosition = event.clientX - basketWidth / 2;
        if (basketPosition >= 0 && basketPosition <= window.innerWidth - basketWidth) {
            basket.style.left = '${basketPosition}px';
        }
    });
    startEggFall();
});