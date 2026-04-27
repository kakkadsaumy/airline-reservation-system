const route = JSON.parse(localStorage.getItem("selectedRoute"));

const bookingCard = document.getElementById("bookingCard");
const form = document.getElementById("form");

let passengerCount = 1;

bookingCard.innerHTML = `
    <div class="card" style="text-align:center;">

        <h3>${route.path.join(" → ")}</h3>

        <div style="margin-top:15px;">
            <label style="display:block; margin-bottom:6px;">Class</label>
            <select id="classSelect" style="width:100%;">
                <option value="economy">Economy ($${route.classes.economy.price})</option>
                <option value="business">Business ($${route.classes.business.price})</option>
                <option value="first">First ($${route.classes.first.price})</option>
            </select>
        </div>

        <div style="margin-top:20px;">
            <label style="display:block; margin-bottom:10px;">Passengers</label>

            <div class="passenger-control">
                <button type="button" onclick="changePassengers(-1)">-</button>
                <span id="passengerCount">1</span>
                <button type="button" onclick="changePassengers(1)">+</button>
            </div>
        </div>

        <button type="button" style="margin-top:20px;" onclick="generateForms()">Continue</button>

    </div>
`;

window.changePassengers = function (delta) {
    passengerCount += delta;

    if (passengerCount < 1) passengerCount = 1;
    if (passengerCount > 10) passengerCount = 10;

    document.getElementById("passengerCount").innerText = passengerCount;
};

window.generateForms = function () {
    form.innerHTML = "";

    for (let i = 0; i < passengerCount; i++) {
        form.innerHTML += `
            <div class="card">
                <h3>Passenger ${i + 1}</h3>

                <input placeholder="First Name" required>
                <input placeholder="Last Name" required>
                <input type="email" placeholder="Email" required>

                <div style="display:flex; gap:8px;">
                    <select>
                        <option value="+1">+1 (US/CA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+91">+91 (India)</option>
                        <option value="+230">+230 (Mauritius)</option>
                        <option value="+61">+61 (Australia)</option>
                        <option value="+81">+81 (Japan)</option>
                        <option value="+86">+86 (China)</option>
                        <option value="+33">+33 (France)</option>
                        <option value="+49">+49 (Germany)</option>
                        <option value="+971">+971 (UAE)</option>
                        <option value="+27">+27 (South Africa)</option>
                        <option value="+7">+7 (Russia)</option>
                        <option value="+34">+34 (Spain)</option>
                        <option value="+39">+39 (Italy)</option>
                        <option value="+55">+55 (Brazil)</option>
                        <option value="+82">+82 (South Korea)</option>
                        <option value="+65">+65 (Singapore)</option>
                        <option value="+60">+60 (Malaysia)</option>
                        <option value="+66">+66 (Thailand)</option>
                        <option value="+62">+62 (Indonesia)</option>
                    </select>

                    <input placeholder="Phone Number" required style="flex:1;">
                </div>

                <input type="number" placeholder="Age" required>

                <select>
                    <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="T">T</option>
                </select>

                <input placeholder="Passport (A1234567)" required>
            </div>
        `;
    }

    form.innerHTML += `
        <button type="button" onclick="confirmBooking()">Confirm Booking</button>
    `;
};

window.confirmBooking = async function () {

    const passengerCards = document.querySelectorAll("#form .card");

    let valid = true;
    let passengers = [];

    passengerCards.forEach(p => {

        const inputs = p.querySelectorAll("input");
        const selects = p.querySelectorAll("select");

        inputs.forEach(i => {
            if (!i.value) valid = false;
        });

        const passport = inputs[5].value;
        if (!/^[A-Z][0-9]{7}$/.test(passport)) valid = false;

        const passenger = {
            firstName: inputs[0].value,
            lastName: inputs[1].value,
            email: inputs[2].value,
            phoneCode: selects[0].value,
            phone: inputs[3].value,
            age: inputs[4].value,
            gender: selects[1].value,
            passport: inputs[5].value
        };

        passengers.push(passenger);
    });

    if (!valid) {
        alert("Fill all fields correctly");
        return;
    }

    const selectedClass = document.getElementById("classSelect").value;
    const count = passengers.length;
    const price = route.classes[selectedClass].price;
    const total = Math.round(price * count);

    const bookingData = {
        passengers,
        route: route.path.join(" → "),
        class: selectedClass.toUpperCase(),
        count,
        total
    };

    localStorage.setItem("latestBooking", JSON.stringify(bookingData));

    try {
        await supabase.from("bookings").insert([{
            route: bookingData.route,
            class: bookingData.class,
            passengers: JSON.stringify(passengers),
            total: bookingData.total
        }]);
    } catch (err) {
        console.log(err);
    }

    window.location.href = "confirmation.html";
};