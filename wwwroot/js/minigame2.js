﻿// Rules Navigation button for Rules Modal
let rules = document.getElementById("rulesCard");

// Modal that displays/hides the rules to the user
let rulesModal = document.getElementById("rules");
// button for closing rules modal
let rulesSpan = document.getElementById("close");
// Boolean to hide/show rules
let rulesOpen = false;

// Modal that displays/hides when user's game ends
let modal = document.getElementById("endGame");

// button for closing or retrying after game ends
let closeSpan = document.getElementById("endSpan");
let retry = document.getElementById("retrySpan");

// Creates a 2D drawing panel
const canvas = document.getElementById('miniGame');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; // set drawing panel to browser viewing width
canvas.height = window.innerHeight; // set drawing panel to broswer viewing height

// (x,y) co-ordinates for canvas center
const center = { x: canvas.width / 2, y: canvas.height / 2 };

// images to display as enemy, player, boss, projectile, and background
const bossSVG = new Image();
bossSVG.src = document.getElementById("bossSVG").src;

const enemySVG = new Image();
enemySVG.src = document.getElementById("enemySVG").src;

const playerSVG = new Image();
playerSVG.src = document.getElementById("playerSVG").src;

const projectile = new Image();
projectile.src = document.getElementById("projectileSVG").src;

const backgroundImg = new Image();
backgroundImg.src = document.getElementById("backgroundImg").src;


class Upgrade {
    constructor(x, y, radius, speed, type) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.type = type; // Offensive(true) or Defensive(false) boolean upgrade
        this.active = false; // Upgrade active boolean
    }

    draw() {
        // If true(offensive upgrade draw)
        if (this.type == true) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(250,0,250,1)';
            ctx.fill();
        }
        else { // else false(defensive upgrade draw)
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(0,250,0,1)';
            ctx.fill();
        }
    }

    update() {
        // If upgrade not active update location, else draw upgrade used graphic
        if (!this.active) {
            this.draw();
            this.x = this.x + this.speed.x;
            this.y = this.y + this.speed.y;
        } else {
            this.drawUse();
        }
    }

    drawUse() {
        // If/else to draw Offensive or Defensive upgrades on player
        if (this.type == true) {
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.radius / 2.5, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'rgba(250,0,250,1)';
            ctx.stroke();
        }
        else {
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.radius / 2, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'rgba(0,250,0,1)';
            ctx.stroke();
        }
    }
}

class UpgradeTwo {
    constructor(x, y, radius, speed, type) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.type = type; // Offensive(true) or Defensive(false) boolean upgrade
        this.active = false; // Upgrade active boolean
    }

    draw() { // If true(offensive upgrade draw) , else false(defensive upgrade draw)
        if (this.type == true) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(0,0,250,1)';
            ctx.fill();
        }
        else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(0,250,250,1)';
            ctx.fill();
        }
    }

    update() { // If upgrade not active update location, else draw upgrade used graphic
        if (!this.active) {
            this.draw();
            this.x = this.x + this.speed.x;
            this.y = this.y + this.speed.y;
        } else {
            this.drawUse();
        }
    }

    drawUse() { // If/else to draw Offensive or Defensive upgrades on player
        if (this.type == true) {
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.radius / 2.5, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'rgba(0,0,250,1)';
            ctx.stroke();
        }
        else {
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.radius / 2, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'rgba(0,250,250,1)';
            ctx.stroke();
        }
    }
}


class Player {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        // equation to draw svg to match canvas radius
        this.radiusShip = Math.sqrt(((radius / 2) * (radius / 2)) * 2);
    }

    draw() { // draw player svg on canvas element at (x,y)
        ctx.drawImage(playerSVG, this.x - (this.radiusShip / 2), this.y - (this.radiusShip / 2), this.radiusShip, this.radiusShip);
    }

}


class Projectile {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.upgraded = false; // change projectile type based on upgrade(boolean)
    }

    draw() { // draw projectile svg on canvas element from (x,y)
        ctx.drawImage(projectile, this.x, this.y, this.radius, this.radius);
    }

    update() { // update projectile on canvas element based on upgrades(boolean) and level
        if (this.upgraded && levelCount == 1) {
            this.radius = 30;
            this.draw();
            this.x = this.x + this.speed.x;
            this.y = this.y + this.speed.y;
        } else if (this.upgraded && levelCount == 2) {
            this.draw();
            this.radius += .5;
            this.radiusShip += 1;
            this.x = this.x + this.speed.x;
            this.y = this.y + this.speed.y;
        } else {
            this.draw();
            this.x = this.x + this.speed.x;
            this.y = this.y + this.speed.y;
        }
    }
}


class Enemy {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        // equation to draw svg to match canvas radius
        this.radiusShip = Math.sqrt(((radius / 2) * (radius / 2)) * 2);
    }

    draw() { // draw enemy svg on canvas element at (x,y)
        ctx.drawImage(enemySVG, this.x - (this.radiusShip / 2), this.y - (this.radiusShip / 2), this.radiusShip, this.radiusShip);
    }

    update() { // update enemy location on canvas element
        this.draw();
        this.x = this.x + this.speed.x;
        this.y = this.y + this.speed.y;
    }
}

class Boss {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.health = 10000;
        // equation to draw svg to match canvas radius
        this.radiusShip = Math.sqrt(((radius / 2) * (radius / 2)) * 2);
    }

    draw() { // draw enemy boss svg on canvas element at (x,y) and draw boss health bar 
        ctx.drawImage(bossSVG, this.x - (this.radiusShip / 2), this.y - (this.radiusShip / 2), this.radiusShip, this.radiusShip);
        ctx.font = "30px Verdana";
        ctx.fillStyle = 'white';
        ctx.fillText('HP: ' + Math.ceil((this.health / 10000) * 100) + "%", (this.x - (this.radiusShip / 2) + 30), (this.y - (this.radiusShip / 2)));
    }

    update() { // update enemy boss location and health bar on cavnas element
        this.draw();
        this.speed += 0.002;
        const distance = window.innerHeight > window.innerWidth ? (window.innerWidth / 3) : (window.innerHeight / 3);
        this.x = center.x + (distance * Math.sin(this.speed));
        this.y = center.y + (distance * Math.cos(this.speed));
    }
}


// (x,y) co-ordinates for mouse
let mouse = {
    x: null,
    y: null
};
// updates mouse (x,y) co-ordinates on mouse movement
canvas.addEventListener('mousemove',
    (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Crosshair {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw() { // draw a crosshair(+) at mouse (x,y) co-ordinates on canvas element
        ctx.beginPath();
        ctx.moveTo(this.x + this.size, this.y,);
        ctx.lineTo(this.x - this.size, this.y);
        ctx.moveTo(this.x, this.y + this.size);
        ctx.lineTo(this.x, this.y - this.size);
        ctx.moveTo(this.x + this.size, this.y);
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    update() { // update crosshair on mouse (x,y) co-ordinates on canvas element
        this.x = mouse.x;
        this.y = mouse.y;

        this.draw();
    }
}


// construct player in center of canvas
const player = new Player(center.x, center.y, 110);
// draw crosshair on mouse (x,y) co-ordinates
const crosshair = new Crosshair(mouse.x, mouse.y, 10, 'rgba(100,100,255,1)'); // #crosshair

// constructs an array to contain projectiles
const projectiles = [];
// constructs an array to contain enemies
const enemies = [];
// constructs an array to contain bosses
const bosses = [];
// constructs an array to contain upgrades #upgrade
const upgrades = [];

let levelCount = 1;
// score of player at new game
let score = 0;
// number of enemy spaceships destroyed
let enemyCount = 0;
// display score to player at game end
var finalScore = document.getElementById("score");

let shieldCount = 0;

// current animation frame
let frame;
// Variable to store enemy Interval
var enemyTimer;

// spawns a boss at 50 enemies destroyed
function spawnBoss() {
    const radius = 300;
    const distance = window.innerHeight > window.innerWidth ? (window.innerWidth / 4) : (window.innerHeight / 4);
    let angle = 0;
    let x = center.x + (distance * Math.sin(angle));
    let y = center.y + (distance * Math.cos(angle));

    bosses.push(new Boss(x, y, radius, angle));
};
// animates boss spaceship and spawns random enemy spaceships and animates them
function animateBoss() {
    frame = requestAnimationFrame(animateBoss);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    player.draw();
    ctx.font = "30px Verdana";
    ctx.fillStyle = 'rgba(0, 255, 0, 1)';
    ctx.fillText('Score: ' + score + '\t\tShields: ' + shieldCount, (canvas.width / 25), 50);

    if (Math.random() * 100 < 0.5) {
        const radius = Math.random() * 100 + 55;
        let x;
        let y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius * Math.PI : canvas.width + radius * Math.PI;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius * Math.PI : canvas.height + radius * Math.PI;
        }

        const angle = Math.atan2(center.y - y, center.x - x);
        const speed = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };


        enemies.push(new Enemy(x, y, radius, speed));
    }

    projectiles.forEach((projectile, i) => {
        projectile.update();

        // if projectile leaves canvas its removed from array
        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(i, 1);
            }, 0);
        }
    });

    bosses.forEach((boss, i) => {
        boss.update();

        projectiles.forEach((projectile, j) => {
            const dist = Math.hypot(projectile.x - boss.x, projectile.y - boss.y);
            if (dist - boss.radiusShip / 2 - projectile.radius / 2 < .05 && !projectile.upgraded) {
                boss.radius -= 0.15;
                boss.radiusShip = Math.sqrt(((boss.radius / 2) * (boss.radius / 2)) * 2);
                boss.health -= 5;
                setTimeout(() => {
                    projectiles.splice(j, 1);
                }, 0);
            }
            else if (dist - boss.radiusShip / 2 - projectile.radius / 2 < .05 && projectile.upgraded) {
                boss.radius -= 0.15;
                boss.radiusShip = Math.sqrt(((boss.radius / 2) * (boss.radius / 2)) * 2);
                boss.health -= 10;
                setTimeout(() => {
                    projectile.upgraded = false;
                }, 0);
            }
            if (boss.health <= 0) {
                score += 100;
                setTimeout(() => {
                    bosses.splice(i, 1);
                    enemies.splice(0, enemies.length);
                    enemies.length = 0;
                    enemyCount = 0;
                    shieldCount = 0;
                    upgrades.splice(0, upgrades.length);
                    cancelAnimationFrame(frame);
                    clearInterval(enemyTimer);
                    nextLevel();
                }, 0);
            }
        });
    });
    enemies.forEach((enemy, i) => {
        enemy.update();
        // if enemy comes in contact with player stop animation and display end game modal
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        for (let upgrade of upgrades) {
            if (!upgrade.type && upgrade.active && (dist - enemy.radiusShip / 2 - player.radiusShip / 2 < .05)) {
                setTimeout(() => {
                    enemies.splice(i, 1);
                    upgrades.splice(upgrades.indexOf(upgrade), 1);
                    shieldCount--;
                }, 0);
                break;
            };
        };
        if (dist - enemy.radiusShip / 2 - player.radiusShip / 2 < .05 && !upgrades.some(checkUpgrade)) {
            gameEnd();
        };


        // if a projectile hits enemy, reduce enemy size and update score
        projectiles.forEach((projectile, j) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (dist - enemy.radiusShip / 2 - projectile.radius / 2 < .05 && !projectile.upgraded) {
                if (enemy.radiusShip - 15 >= 20) {
                    enemy.radiusShip = enemy.radiusShip / 2;
                    setTimeout(() => {
                        projectiles.splice(j, 1);
                        score++;
                    }, 0);
                } else {
                    setTimeout(() => {
                        const reward = Math.random() * 2 < 0.5 ? true : false; // Random reward boolean #upgrade
                        if (reward) { upgrades.push(new Upgrade(enemy.x, enemy.y, 5, enemy.speed, Math.random() < 0.33 ? true : false)) }; // #upgrade
                        enemies.splice(i, 1);
                        projectiles.splice(j, 1);
                        score += 10;
                    }, 0);
                }

            };
            if (dist - enemy.radiusShip / 2 - projectile.radius / 2 < .05 && projectile.upgraded) {
                setTimeout(() => {
                    const reward = Math.random() * 4 < 0.5 ? true : false; // Random reward boolean #upgrade
                    if (reward) { upgrades.push(new Upgrade(enemy.x, enemy.y, 5, enemy.speed, false)) }; // #upgrade
                    enemies.splice(i, 1);
                    score += 10;
                }, 0);
            };
        });
    });
    // draw each upgrade in array and update possition #upgrade start
    upgrades.forEach((upgrade, i) => {
        upgrade.update();
        const dist = Math.hypot(player.x - upgrade.x, player.y - upgrade.y);
        if (dist - upgrade.radius / 2 - player.radiusShip / 2 < .05 && !upgrade.active) {
            upgrade.active = true;
            if (!upgrade.type) {
                shieldCount++;
            };
        };
        for (let projectile of projectiles) {
            if (upgrade.type && upgrade.active && !projectile.upgraded) {
                projectile.upgraded = true;
            }
        }
    });
    // #upgrade end
    // keep crosshair on canvas
    crosshair.update(); // #crosshair
};

// spawns enemy randomly around the edge of the canvas
function spawnEnemy() {
    if (levelCount == 1) {
        enemyTimer = setInterval(() => {
            const radius = Math.random() * 100 + 55;
            let x;
            let y;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius * Math.PI : canvas.width + radius * Math.PI;
                y = Math.random() * canvas.height;
            } else {
                x = Math.random() * canvas.width;
                y = Math.random() < 0.5 ? 0 - radius * Math.PI : canvas.height + radius * Math.PI;
            }

            const angle = Math.atan2(center.y - y, center.x - x);
            const speed = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            };


            enemies.push(new Enemy(x, y, radius, speed));
        }, 2000);
    } else if (levelCount == 2) {
        enemyTimer = setInterval(() => {
            const radius = Math.random() * 100 + 55;
            let x;
            let y;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius * Math.PI : canvas.width + radius * Math.PI;
                y = Math.random() * canvas.height;
            } else {
                x = Math.random() * canvas.width;
                y = Math.random() < 0.5 ? 0 - radius * Math.PI : canvas.height + radius * Math.PI;
            }

            const angle = Math.atan2(center.y - y, center.x - x);
            const speed = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            };


            enemies.push(new Enemy(x, y, radius, speed));
        }, 1000);
    }
};

// animates the drawing pad 
function animate() {
    frame = requestAnimationFrame(animate);
    // clear canvas and draw player
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    player.draw();

    // displays player score to user
    ctx.font = "30px Verdana";
    ctx.fillStyle = 'rgba(0, 255, 0, 1)';
    ctx.fillText('Score: ' + score + '\t\tShields: ' + shieldCount, (canvas.width / 25), 50);

    // draw each projectile in array and update possition
    projectiles.forEach((projectile, i) => {
        projectile.update();

        // if projectile leaves canvas its removed from array
        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(i, 1);
            }, 0);
        }
    });

    // draw each enemy in array and update possition
    enemies.forEach((enemy, i) => {
        enemy.update();
        // if enemy comes in contact with player stop animation and display end game modal
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        for (let upgrade of upgrades) {
            if (!upgrade.type && upgrade.active && (dist - enemy.radiusShip / 2 - player.radiusShip / 2 < .05)) {
                setTimeout(() => {
                    enemies.splice(i, 1);
                    upgrades.splice(upgrades.indexOf(upgrade), 1);
                    shieldCount--;
                }, 0);
                break;
            };
        };
        if (dist - enemy.radiusShip / 2 - player.radiusShip / 2 < .05 && !upgrades.some(checkUpgrade)) {
            gameEnd();
        };


        // if a projectile hits enemy, reduce enemy size and update score
        projectiles.forEach((projectile, j) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (dist - enemy.radiusShip / 2 - projectile.radius / 2 < .05 && !projectile.upgraded) {
                if (enemy.radiusShip - 15 >= 20) {
                    enemy.radiusShip = enemy.radiusShip / 2;
                    setTimeout(() => {
                        projectiles.splice(j, 1);
                        score++;
                    }, 0);
                } else {
                    setTimeout(() => {
                        const reward = Math.random() * 5 < 0.5 ? true : false; // Random reward boolean #upgrade
                        if (reward && levelCount == 1) { upgrades.push(new Upgrade(enemy.x, enemy.y, 5, enemy.speed, Math.random() < 0.33 ? true : false)) };// #upgrade
                        if (reward && levelCount == 2) { upgrades.push(new UpgradeTwo(enemy.x, enemy.y, 5, enemy.speed, Math.random() < 0.33 ? true : false)) };
                        enemies.splice(i, 1);
                        projectiles.splice(j, 1);
                        score += 10;
                        enemyCount += 1;
                    }, 0);
                }

            };
            if (dist - enemy.radiusShip / 2 - projectile.radius / 2 < .05 && projectile.upgraded) {
                setTimeout(() => {
                    const reward = Math.random() * 10 < 0.5 ? true : false; // Random reward boolean #upgrade
                    if (reward && levelCount == 1) { upgrades.push(new Upgrade(enemy.x, enemy.y, 5, enemy.speed, false)) }; // #upgrade
                    if (reward && levelCount == 2) { upgrades.push(new UpgradeTwo(enemy.x, enemy.y, 5, enemy.speed, false)) };
                    if (levelCount == 1) {
                        enemies.splice(i, 1);
                        score += 10;
                        enemyCount += 1;
                    } else if (levelCount == 2) {
                        if (enemy.radiusShip - 15 >= 20) {
                            enemy.radiusShip = enemy.radiusShip / 2;
                            projectiles.splice(j, 1);
                            score++;
                        } else {
                            enemies.splice(i, 1);
                            score += 10;
                            enemyCount += 1;
                        }
                    }
                }, 0);
            };
        });
    });
    // draw each upgrade in array and update possition #upgrade start
    upgrades.forEach((upgrade, i) => {
        upgrade.update();
        const dist = Math.hypot(player.x - upgrade.x, player.y - upgrade.y);
        if (dist - upgrade.radius / 2 - player.radiusShip / 2 < .05 && !upgrade.active) {
            upgrade.active = true;
            if (!upgrade.type) {
                shieldCount++;
            }
        };
        for (let projectile of projectiles) {
            if (upgrade.type && upgrade.active && !projectile.upgraded) {
                projectile.upgraded = true;
            }
        }
    });

    // draw crosshair on canvas
    crosshair.update(); 

    // if 50 enemys destroyed spawn boss level
    if (enemyCount == 50 && levelCount == 1) {
        setTimeout(() => {
            cancelAnimationFrame(frame);
            clearInterval(enemyTimer);
            enemies.splice(0, enemies.length);
            spawnBoss();
            animateBoss();
            enemyCount = 0;
        }, 0);
    }
};

// on mouse click or screen tap draw projectiles from center to mouse(x,y) co-ordinates
canvas.addEventListener('mousedown',
    (e) => {
        const angle = Math.atan2(e.clientY - center.y, e.clientX - center.x);
        const speed = {
            x: Math.cos(angle) * 3,
            y: Math.sin(angle) * 3
        };
        if (projectiles.length < 7) {
            projectiles.push(new Projectile(center.x, center.y, 15, speed));
        }
    }
);

animate();
spawnEnemy();

// when window is resized updates canvas and player
window.addEventListener('resize',
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        center.x = canvas.width / 2;
        center.y = canvas.height / 2;
        player.x = center.x;
        player.y = center.y;
        player.draw();
    }
);

// Displays/hides navigation buttons
function displayButtons() {
    var buttons = document.getElementById("pageLinks");
    if (buttons.style.display == "block") {
        buttons.style.display = "none";
    } else {
        buttons.style.display = "block";
    }
}

// Javascript to handle button animations
const button = document.querySelectorAll('a');
const turbulence = document.querySelector('feTurbulence');
let verticleFrequency = 0.001;
turbulence.setAttribute('baseFrequency', verticleFrequency + '0.0001');

const steps = 20;
const interval = 25;

button.forEach(function (button) {
    button.addEventListener('mouseover', function () {
        verticleFrequency = 0.001;
        for (let i = 0; i < steps; i++) {
            setTimeout(function () {
                verticleFrequency += 0.005;
                turbulence.setAttribute('baseFrequency', verticleFrequency + ' ' + verticleFrequency);
            }, i * interval);

        }
    })
});
// end button animations javascript

// Display/hide end game prompt to user
function gameEnd() {
    cancelAnimationFrame(frame);
    canvas.style.cursor = 'crosshair'; // #crosshair
    finalScore.textContent = 'Score: ' + score;
    modal.style.display = "block";
    closeSpan.onclick = function () {
        modal.style.display = "none";
    }
    retry.onclick = function () {
        location.reload();
    }
};
function checkUpgrade(upgrade) {
    return !upgrade.type;
}
// Display/hide rules prompt to user on click
// also cancels / resumes canvas animation
rules.onclick = function () {
    rulesModal.style.display = "block";
    cancelAnimationFrame(frame);
    clearInterval(enemyTimer);
    rulesSpan.onclick = function () {
        rulesModal.style.display = "none";
        requestAnimationFrame(animate);
        spawnEnemy();
    };
};

window.addEventListener('keydown',
    (key) => {
        if (key.keyCode == 27 && !rulesOpen) {
            rules.click();
            rulesOpen = true;
        }
        else if (key.keyCode == 27 && rulesOpen) {
            rulesSpan.click();
            rulesOpen = false;
        }
    }
);

let imgCount = 0;
function nextLevel() {
    frame = setTimeout(nextLevel, 800);
    let number = imgCount;
    if (number <= 10) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(frameArray[number], 0, 0, canvas.width, canvas.height);
        imgCount++;
    } else if (number == 11) {
        backgroundImg.src = backgroundImg2.src;
        levelCount++;
        animate();
        spawnEnemy();
        imgCount++;
    }

}