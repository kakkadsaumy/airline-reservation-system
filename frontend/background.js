const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const gridSize = 40;
let offset = 0;
let glitches = [];

function draw() {

    ctx.fillStyle = "rgba(2,6,23,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    drawGlitches();

    offset += 0.3;

    requestAnimationFrame(draw);
}

function drawGrid() {

    ctx.strokeStyle = "rgba(0,255,255,0.15)";
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + offset % gridSize, 0);
        ctx.lineTo(x + offset % gridSize, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset % gridSize);
        ctx.lineTo(canvas.width, y + offset % gridSize);
        ctx.stroke();
    }
}

function spawnGlitch() {
    glitches.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 200 + 50,
        height: Math.random() * 3 + 1,
        life: 20
    });
}

setInterval(spawnGlitch, 200);

function drawGlitches() {

    ctx.fillStyle = "rgba(255,0,150,0.8)";

    glitches.forEach(g => {
        ctx.fillRect(g.x, g.y, g.width, g.height);
        g.life--;
    });

    glitches = glitches.filter(g => g.life > 0);
}

draw();