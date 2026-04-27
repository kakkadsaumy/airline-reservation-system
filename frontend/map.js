function goBack() {
    if (document.referrer) window.history.back();
    else window.location.href = "index.html";
}

const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

const cities = {
    "New Delhi": [28.6139, 77.2090],
    "Mumbai": [19.0760, 72.8777],
    "Dubai": [25.2048, 55.2708],
    "London": [51.5074, -0.1278],
    "Paris": [48.8566, 2.3522],
    "New York": [40.7128, -74.0060],
    "Singapore": [1.3521, 103.8198],
    "Tokyo": [35.6762, 139.6503]
};

Object.keys(cities).forEach(city => {
    L.circleMarker(cities[city], { radius: 6, color: '#3b82f6' })
        .addTo(map)
        .bindPopup(city);
});

let allRoutes = [];
let drawnLines = [];

fetch("routes.json")
.then(res => res.json())
.then(data => {
    allRoutes = data.routes;
    populateCities();
});

function populateCities() {
    const set = new Set();

    allRoutes.forEach(r => {
        set.add(r.from);
        set.add(r.to);
    });

    const source = document.getElementById("source");
    const dest = document.getElementById("destination");

    set.forEach(city => {
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

function clearMap() {
    drawnLines.forEach(l => map.removeLayer(l));
    drawnLines = [];
}

function filterRoutes() {
    clearMap();

    const source = document.getElementById("source").value;
    const dest = document.getElementById("destination").value;

    const filtered = allRoutes.filter(r =>
        r.from.toLowerCase() === source &&
        r.to.toLowerCase() === dest
    );

    const container = document.getElementById("routeOptions");
    container.innerHTML = "";

    filtered.forEach(route => {
        const btn = document.createElement("button");
        btn.innerText = route.path.join(" → ");

        btn.onclick = () => {
            clearMap();
            drawRoute(route);

            document.querySelectorAll("#routeOptions button")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");
        };

        container.appendChild(btn);
    });

    filtered.forEach(route => drawRoute(route));
}

function drawRoute(route) {
    const coords = route.path
        .map(city => cities[city])
        .filter(c => c !== undefined);

    if (coords.length < 2) return;

    const line = L.polyline(coords, { color: '#3b82f6' }).addTo(map);
    drawnLines.push(line);
}