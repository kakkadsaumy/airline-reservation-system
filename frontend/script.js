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
        let opt1 = document.createElement("option");
        opt1.value = city.toLowerCase();
        opt1.text = city;

        let opt2 = document.createElement("option");
        opt2.value = city.toLowerCase();
        opt2.text = city;

        source.appendChild(opt1);
        dest.appendChild(opt2);
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

    if (filtered.length === 0) {
        container.innerHTML = "<p>No routes found</p>";
        return;
    }

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
}

function selectRoute(route) {
    localStorage.setItem("selectedRoute", JSON.stringify(route));
    window.location.href = "booking.html";
}

populateCities();