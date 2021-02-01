﻿const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 150) * (canvas.width / 150),
};

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(250, 0, 150,.65)';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }

}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 13000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = 'rgba(250, 0, 150, 0.6)';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityVal = 1;
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = 0; j < particlesArray.length; j++) {
            let distance = ((particlesArray[i].x - particlesArray[j].x)
                * (particlesArray[i].x - particlesArray[j].x))
                + ((particlesArray[i].y - particlesArray[j].y)
                    * (particlesArray[i].y - particlesArray[j].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityVal = 1 - (distance / 10000);
                var gradient = ctx.createLinearGradient(particlesArray[i].x, particlesArray[i].y, particlesArray[j].x, particlesArray[j].y);
                gradient.addColorStop("0", 'rgba(250, 0, 0, ' + opacityVal + ')');
                gradient.addColorStop(1 / 8, 'rgba(250, 100, 100, ' + opacityVal + ')');
                gradient.addColorStop(2 / 8, 'rgba(100, 100, 100, ' + opacityVal + ')');
                gradient.addColorStop(3 / 8, 'rgba(100, 250, 100, ' + opacityVal + ')');
                gradient.addColorStop(4 / 8, 'rgba(0, 250, 0, ' + opacityVal + ')');
                gradient.addColorStop(5 / 8, 'rgba(100, 250, 100, ' + opacityVal + ')');
                gradient.addColorStop(6 / 8, 'rgba(100, 100, 100, ' + opacityVal + ')');
                gradient.addColorStop(7 / 8, 'rgba(100, 100, 250, ' + opacityVal + ')');
                gradient.addColorStop("1", 'rgba(0, 0, 250, ' + opacityVal + ')');


                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
    document.body.style.background = "#000000 url('" + canvas.toDataURL() + "')"
}

window.addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height / 150) * (canvas.width / 150);
        init();
    }
);

window.addEventListener('mouseout',
    function () {
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

init();
animate();