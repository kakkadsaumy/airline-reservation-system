const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

window.radar = { cx: 0, cy: 0, radius: 300 };

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let angle = 0;
const speed = 0.009;

const planes = [];

for (let i = 0; i < 12; i++) {
    planes.push({
        r: Math.random() * 250,
        t: Math.random() * Math.PI * 2,
        heading: Math.random() * 360,
        visible: 0
    });
}

function drawRadar(cx, cy) {
    const maxR = 300;

    window.radar.cx = cx;
    window.radar.cy = cy;
    window.radar.radius = maxR;

    ctx.strokeStyle = "rgba(0,255,120,0.12)";
    ctx.lineWidth = 1;

    for (let r = 60; r <= maxR; r += 60) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
    }

    for (let i = 0; i < 360; i += 30) {
        const rad = i * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(rad) * maxR, cy + Math.sin(rad) * maxR);
        ctx.stroke();
    }

    const sweepWidth = 0.45;

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    gradient.addColorStop(0, "rgba(0,255,120,0.25)");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, maxR, angle, angle + sweepWidth);
    ctx.closePath();
    ctx.fill();

    const prevAngle = angle;
    let nextAngle = angle + speed;
    if (nextAngle > Math.PI * 2) nextAngle -= Math.PI * 2;

    planes.forEach(p => {
        p.t += 0.001;
        if (p.t > Math.PI * 2) p.t -= Math.PI * 2;

        const x = cx + Math.cos(p.t) * p.r;
        const y = cy + Math.sin(p.t) * p.r;

        let crossed;

        if (prevAngle < nextAngle) {
            crossed = p.t >= prevAngle && p.t <= nextAngle;
        } else {
            crossed = p.t >= prevAngle || p.t <= nextAngle;
        }

        if (crossed && p.visible < 0.01) {
            p.visible = 1;
        }

        p.visible -= 0.04;
        if (p.visible < 0) p.visible = 0;

        if (p.visible > 0) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate((p.heading * Math.PI) / 180);

            const color = p.visible > 0.7 ? "#ffff66" : "#00ff78";

            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;

            ctx.font = "14px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText("✈", 0, 0);

            ctx.restore();
        }
    });

    angle = nextAngle;
}

function animate() {
    ctx.fillStyle = "#030805";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    drawRadar(cx, cy);

    requestAnimationFrame(animate);
}

animate();