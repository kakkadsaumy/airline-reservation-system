function goBack() {
    if (document.referrer) window.history.back();
    else window.location.href = "index.html";
}

const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

const cities = {
    "New Delhi": [28.5562, 77.1000],
    "Mumbai": [19.0896, 72.8656],
    "Dubai": [25.2532, 55.3657],
    "London": [51.4700, -0.4543],
    "Paris": [49.0097, 2.5479],
    "New York": [40.6413, -73.7781],
    "Singapore": [1.3644, 103.9915],
    "Tokyo": [35.5494, 139.7798],
    "Kolkata": [22.6547, 88.4467],
    "Cairo": [30.1120, 31.4000],
    "Hong Kong": [22.3080, 113.9185],
    "Accra": [5.6052, -0.1668],
    "Port Louis": [-20.4300, 57.6836],
    "Berlin": [52.3667, 13.5033],
    "Brasilia": [-15.8711, -47.9186],
    "Buenos Aires": [-34.8222, -58.5358],
    "Lisbon": [38.7742, -9.1342],
    "Beijing": [40.0799, 116.6031]
};

const airportInfo = {
    "New Delhi": "DEL / New Delhi / Indira Gandhi International Airport",
    "Mumbai": "BOM / Mumbai / Chhatrapati Shivaji Maharaj International Airport",
    "Dubai": "DXB / Dubai / Dubai International Airport",
    "London": "LHR / London / Heathrow Airport",
    "Paris": "CDG / Paris / Charles de Gaulle Airport",
    "New York": "JFK / New York / John F. Kennedy International Airport",
    "Singapore": "SIN / Singapore / Changi Airport",
    "Tokyo": "HND / Tokyo / Haneda Airport",
    "Kolkata": "CCU / Kolkata / Netaji Subhas Chandra Bose International Airport",
    "Cairo": "CAI / Cairo / Cairo International Airport",
    "Hong Kong": "HKG / Hong Kong / Hong Kong International Airport",
    "Accra": "ACC / Accra / Kotoka International Airport",
    "Port Louis": "MRU / Mauritius / Sir Seewoosagur Ramgoolam International Airport",
    "Berlin": "BER / Berlin / Berlin Brandenburg Airport",
    "Brasilia": "BSB / Brasilia / Brasilia International Airport",
    "Buenos Aires": "EZE / Buenos Aires / Ministro Pistarini International Airport",
    "Lisbon": "LIS / Lisbon / Humberto Delgado Airport",
    "Beijing": "PEK / Beijing / Beijing Capital International Airport"
};


Object.keys(cities).forEach(city => {
    L.circleMarker(cities[city], { radius: 6, color: '#3b82f6' })
        .addTo(map)
        .bindPopup(airportInfo[city] || city);
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