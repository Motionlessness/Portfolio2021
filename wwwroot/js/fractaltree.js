function displayButtons() {
    var buttons = document.getElementById("navbar");
    if (buttons.style.display == "block") {
        buttons.style.display = "none";
    } else {
        buttons.style.display = "block";
    }
}

const canvas = document.querySelector("canvas"); //Space to draw
canvas.width = window.innerWidth; // set the drawing space as big as the browser
canvas.height = window.innerHeight; //resize both width and height to match application

if (canvas.width <= canvas.height * 0.8) { //if on mobile device
    canvasSize = ((canvas.height * .06) + (canvas.width * .1) / Math.PI);
} else {                                   //else assume desktop screen
    canvasSize = ((canvas.height * .1) + (canvas.width * .1) / Math.PI);
}

const ctx = canvas.getContext("2d");

let curvy = true; //curve branch or not

let color1 = "rgb(" + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + ")"; //Random color for branches
let color2 = "rgb(" + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + ")"; //Random color for leaves
let shadow = "rgb(" + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + ")"; //Random shadow color

drawTree(canvas.width / 2, canvas.height *.8 , canvasSize, 0, 20, color1, color2);


// starting x,y ... legnth...angle...branch width... branch color...leaf color
function drawTree(startx, starty, len, angle, bWidth, c1, c2) {
    ctx.beginPath();
    ctx.save(); // save current state for backup
    ctx.strokeStyle = c1; // branch color
    ctx.fillStyle = c2; //leaf color
    ctx.shadowBlur = 2;
    ctx.shadowColor = shadow;
    ctx.lineWidth = bWidth; //branch thickness
    ctx.translate(startx, starty); //move drawing focus to starting points
    ctx.rotate(angle * (Math.PI / 180)); // rotate based on angle given multiplied by the radian 
    ctx.moveTo(0, 0);
    if (!curvy) { //if last branch was curvy draw straight line
        ctx.lineTo(0, -len);
        curvy = true;
    } else //else draw cruvy line
    {
        ctx.bezierCurveTo(10, -len / 2, 10, -len / 2, 0, -len);
        curvy = false;
    }
    ctx.stroke();

    if (len < 13) {//if branches reaching context limit draw leaves
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI / .80);
        ctx.arc(-len, 0, 10, 0, Math.PI / 1.25);//draw leaf
        ctx.shadowBlur = 7;
        ctx.shadowColor = shadow;
        ctx.fill();
        ctx.restore();
        return;
    };

    drawTree(0, -len, len * 0.77, angle + 13, bWidth * 0.65, c1, c2);
    drawTree(0, -len, len * 0.77, angle - 13, bWidth * 0.65, c1, c2);


    ctx.restore();
}

window.addEventListener('resize',
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (canvas.width <= canvas.height * 0.8) {
            canvasSize = ((canvas.height * .06) + (canvas.width * .1) / Math.PI);
        } else {
            canvasSize = ((canvas.height * .1) + (canvas.width * .1) / Math.PI);
        }
        
        curvy = true; //curve branch or not

        color1 = "rgb(" + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + ")"; //Random color for branches
        color2 = "rgb(" + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + ")"; //Random color for leaves
        shadow = "rgb(" + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + ")"; //Random shadow color

        drawTree(canvas.width / 2, canvas.height * .8, canvasSize, 0, 20, color1, color2);
    }
);

canvas.addEventListener('click',
    () => {
        color1 = "rgb(" + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + ")"; //Random color for branches
        color2 = "rgb(" + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + ")"; //Random color for leaves
        shadow = "rgb(" + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + "," + (Math.random() * 255 + 1) + ")"; //Random shadow color

        drawTree(canvas.width / 2, canvas.height * .8, canvasSize, 0, 20, color1, color2);
    }
);