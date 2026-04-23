import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
    "https://fybivbxhdfwlhoifnhdo.supabase.co",
    "sb_publishable_DfEaxwx0nn6jmV0gRHxqyQ_qysTuL-6"
);

const route = JSON.parse(localStorage.getItem("selectedRoute"));
let selectedClass = null;

const codes = [
"+1","+7","+20","+27","+30","+31","+32","+33","+34","+36","+39","+40","+41","+43","+44","+45","+46","+47","+48","+49",
"+51","+52","+53","+54","+55","+56","+57","+58","+60","+61","+62","+63","+64","+65","+66","+81","+82","+84","+86","+90",
"+91","+92","+93","+94","+95","+98","+211","+212","+213","+216","+218","+220","+221","+222","+223","+224","+225","+226",
"+227","+228","+229","+230","+231","+232","+233","+234","+235","+236","+237","+238","+239","+240","+241","+242","+243"
];

function formatName(name) {
    return name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

const container = document.getElementById("bookingCard");

container.innerHTML = `
<div class="card">
    <h2>${route.path.join(" → ")}</h2>
    <button onclick="choose('economy')">Economy - $${route.classes.economy.price.toFixed(0)}</button>
    <button onclick="choose('business')">Business - $${route.classes.business.price.toFixed(0)}</button>
    <button onclick="choose('first')">First - $${route.classes.first.price.toFixed(0)}</button>
</div>
`;

window.choose = function(type) {
    selectedClass = type;
    generateForm();
};

function generateForm() {

    const form = document.getElementById("form");
    form.innerHTML = "";

    let count = prompt("Number of passengers:");

    for (let i = 0; i < count; i++) {

        form.innerHTML += `
        <h3>Passenger ${i+1}</h3>
        <input placeholder="First Name" id="first${i}" required>
        <input placeholder="Last Name" id="last${i}" required>
        <input placeholder="Email" id="email${i}" required>

        <select id="code${i}">
            ${codes.map(c => `<option>${c}</option>`).join("")}
        </select>

        <input placeholder="Phone" id="phone${i}" required>
        <input type="number" placeholder="Age" id="age${i}" required>

        <select id="gender${i}">
            <option>M</option>
            <option>F</option>
            <option>T</option>
        </select>

        <input placeholder="Passport (A1234567)" id="pass${i}" required>
        `;
    }

    form.innerHTML += `<button type="submit">Confirm Booking</button>`;

    form.onsubmit = function(e) {
        e.preventDefault();
        confirmBooking(count);
    };
}

async function confirmBooking(count) {

    if (!selectedClass) return;

    const passportRegex = /^[A-Z][0-9]{7}$/;

    let names = [];

    for (let i = 0; i < count; i++) {

        let first = formatName(document.getElementById(`first${i}`).value);
        let last = formatName(document.getElementById(`last${i}`).value);
        let passport = document.getElementById(`pass${i}`).value;

        if (!passportRegex.test(passport)) {
            alert("Invalid passport");
            return;
        }

        names.push(first + " " + last);
    }

    if (route.classes[selectedClass].seats < count) {
        alert("Not enough seats");
        return;
    }

    route.classes[selectedClass].seats -= count;

    let total = route.classes[selectedClass].price * count;

    await supabase.from("bookings").insert([
        {
            route: route.path.join(" → "),
            class: selectedClass,
            passengers: names,
            total: total
        }
    ]);

    const ticketText = `
BOOKING CONFIRMED

Route: ${route.path.join(" → ")}
Class: ${selectedClass.toUpperCase()}
Passengers:
${names.join("\n")}

Total: $${total.toFixed(0)}
Status: CONFIRMED
`;

    document.getElementById("confirmation").innerHTML = `
        <div class="card">
            <h2>Booking Confirmed</h2>
            <p>${names.join("<br>")}</p>
            <p>${route.path.join(" → ")}</p>
            <p>${selectedClass.toUpperCase()}</p>
            <p>Total: $${total.toFixed(0)}</p>
        </div>
    `;

    const blob = new Blob([ticketText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ticket.txt";
    link.click();
}

anime({
    targets: 'body',
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutQuad'
});

anime({
    targets: 'h1',
    opacity: [0, 1],
    translateY: [-30, 0],
    duration: 1000,
    easing: 'easeOutExpo'
});