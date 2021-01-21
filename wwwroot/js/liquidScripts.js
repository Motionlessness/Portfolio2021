const canvas = document.getElementById('canvasL');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mouseover', function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
class Button{
    constructor(x, y, width, heigth, baseX) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heigth;
        this.baseX = x;
    }
    update(){
        let directionX = 3;
        if ((mouse.x < this.x + this.width &&
            mouse.x > this.x &&
            mouse.y < this.y + this.height &&
            mouse.y > this.y) && (this.x > this.baseX - 30)){
                this.x -= directionX;
        }else if (this.x < this.baseX){
            this.x += directionX;
        }
    }
    draw(){
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
}

const buttons = [];
function createButton(){
    for (let i = 0; i < 5; i++) {
        let topMargin = 50;
        let buttMargin = 5;
        let x = 150;
        let y = topMargin+((50+buttMargin)*i);
        let height = 50;
        let width = 200;
        buttons.push(new Button(x, y, width, height));
    }
}
createButton();

function drawButton(){
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].update();
        buttons[i].draw();
    }
}

class Particle {
    constructor(x, y, size, weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.weight = weight;
    }
    update(){
        for(let i = 0; i < buttons.length; i++){
            if(this.x < buttons[i].x + buttons[i].width &&
                this.x > buttons[i].x &&
                this.y < buttons[i].y + buttons[i].height &&
                this.y > buttons[i].y){
                    this.weight = 0;
                    if(Math.random()*20>=10){
                        this.x -= 5;
                    }else{
                        this.x += 5;
                    }

                }else this.weight += 0.001;
        }
        if(this.y > canvas.height){
            this.y = 0 - this.size;
            this.x = (Math.random()*60)+200;
            this.weight = (Math.random()*0.01) ;
        }
        this.y += this.weight;
    }
    draw(){
        // let gradient = ctx.createRadialGradient(this.x, this.y, this.size, this.x*1.2, this.y*1.2, this.size);
        // gradient.addColorStop('0','rgba(20,0,0,1)');
        // gradient.addColorStop('1','rgba(45,0,0,1)');
        // ctx.fillStyle = gradient;
        ctx.fillStyle = 'rgba(45,0,0,1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.shadowColor = 'rgba(45,0,0,1)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetY = 15;
        ctx.fill();
    }
}
const particleArray = [];
const numParticles = 100;
function createParticle(){
    for (let i = 0; i < numParticles; i++) {
        const x = (Math.random()*60)+200;
        const y = (Math.random()*canvas.height);
        const size = (Math.random()*25)+1;
        const weight = (Math.random()*0.25);
        particleArray.push(new Particle(x,y,size,weight));
    }
}
createParticle();

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
    drawButton();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize',function(e){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})