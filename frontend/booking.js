const route = JSON.parse(localStorage.getItem("selectedRoute"));

const container = document.getElementById("bookingCard");

container.innerHTML = `
    <div class="card">
        <h2>${route.path.join(" → ")}</h2>
        <button onclick="book('economy')">Economy - $${route.classes.economy.price.toFixed(0)}</button>
        <button onclick="book('business')">Business - $${route.classes.business.price.toFixed(0)}</button>
        <button onclick="book('first')">First - $${route.classes.first.price.toFixed(0)}</button>
    </div>
`;

function book(type) {
    alert("Booking confirmed: " + type.toUpperCase());
}