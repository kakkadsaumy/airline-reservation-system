let allRoutes = [];

async function populateCities() {
    const res = await fetch('routes.json');
    const data = await res.json();

    const cities = new Set();

    data.routes.forEach(r => {
        cities.add(r.from);
        cities.add(r.to);
    });

    const source = document.getElementById("source");
    const dest = document.getElementById("destination");

    cities.forEach(city => {
        let o1 = document.createElement("option");
        o1.value = city.toLowerCase();
        o1.text = city;

        let o2 = document.createElement("option");
        o2.value = city.toLowerCase();
        o2.text = city;

        source.appendChild(o1);
        dest.appendChild(o2);
    });
}

async function loadRoutes() {
    const source = document.getElementById("source").value;
    const dest = document.getElementById("destination").value;

    const res = await fetch('routes.json');
    const data = await res.json();

    allRoutes = data.routes;

    const filtered = allRoutes.filter(r =>
        r.from.toLowerCase() === source &&
        r.to.toLowerCase() === dest
    );

    const container = document.getElementById("routesContainer");
    container.innerHTML = "";

    filtered.forEach(r => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${r.path.join(" → ")}</h3>
            <p>Economy: $${r.classes.economy.price.toFixed(0)}</p>
            <p>Business: $${r.classes.business.price.toFixed(0)}</p>
            <p>First: $${r.classes.first.price.toFixed(0)}</p>
            <button onclick='selectRoute(${JSON.stringify(r)})'>Select</button>
        `;

        container.appendChild(div);
    });

    anime({
        targets: '.card',
        opacity: [0,1],
        translateY: [40,0],
        delay: anime.stagger(120),
        duration: 700,
        easing: 'easeOutExpo'
    });
}

function selectRoute(route) {
    localStorage.setItem("selectedRoute", JSON.stringify(route));
    window.location.href = "booking.html";
}

document.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        anime({
            targets: e.target,
            scale: [1, 0.95, 1],
            duration: 200
        });
    }
});

anime({
    targets: 'body',
    opacity: [0,1],
    duration: 800
});

anime({
    targets: 'h1',
    opacity: [0,1],
    translateY: [-30,0],
    duration: 1000,
    easing: 'easeOutExpo'
});

populateCities();

anime({
    targets: '.r1',
    rotate: 360,
    duration: 20000,
    loop: true,
    easing: 'linear'
});

anime({
    targets: '.r2',
    rotate: -360,
    duration: 15000,
    loop: true,
    easing: 'linear'
});

anime({
    targets: '.r3',
    rotate: 360,
    duration: 10000,
    loop: true,
    easing: 'linear'
});

anime({
    targets: '.core',
    scale: [1, 1.3],
    direction: 'alternate',
    loop: true,
    duration: 1200,
    easing: 'easeInOutSine'
});

anime({
    targets: '.hud-circle',
    rotate: 360,
    duration: 40000,
    loop: true,
    easing: 'linear'
});

anime({
    targets: '.hud-line',
    opacity: [0.1, 0.4],
    direction: 'alternate',
    loop: true,
    duration: 2000,
    easing: 'easeInOutSine'
});

const plane = document.getElementById("planeCursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let planeX = mouseX;
let planeY = mouseY;

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animatePlane() {
    planeX += (mouseX - planeX) * 0.15;
    planeY += (mouseY - planeY) * 0.15;

    const dx = mouseX - planeX;
    const dy = mouseY - planeY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    plane.style.left = planeX + "px";
    plane.style.top = planeY + "px";
    plane.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    createTrail(planeX, planeY);

    requestAnimationFrame(animatePlane);
}

animatePlane();

function createTrail(x, y) {
    const trail = document.createElement("div");
    trail.className = "trail";

    trail.style.left = x + "px";
    trail.style.top = y + "px";

    document.body.appendChild(trail);

    anime({
        targets: trail,
        opacity: [0.5, 0],
        scale: [1, 0.2],
        duration: 600,
        easing: "easeOutQuad",
        complete: () => trail.remove()
    });
}