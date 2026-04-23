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