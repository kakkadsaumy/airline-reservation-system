window.confirmBooking = async function () {

    const passengers = document.querySelectorAll("#form .card");

    let valid = true;
    let names = [];

    passengers.forEach(p => {

        const inputs = p.querySelectorAll("input");

        inputs.forEach(i => {
            if (!i.value) valid = false;
        });

        const passport = inputs[5].value;
        if (!/^[A-Z][0-9]{7}$/.test(passport)) {
            valid = false;
            alert("Invalid passport format (Example: A1234567)");
        }

        names.push(inputs[0].value + " " + inputs[1].value);
    });

    if (!valid) {
        alert("Please fill all fields correctly");
        return;
    }

    const selectedClass = document.getElementById("classSelect").value;
    const count = passengers.length;

    const price = route.classes[selectedClass].price;
    const total = Math.round(price * count);

    const bookingData = {
        name: names[0],
        route: route.path.join(" → "),
        class: selectedClass.toUpperCase(),
        count,
        total
    };

    localStorage.setItem("latestBooking", JSON.stringify(bookingData));

    try {
        await supabase.from("bookings").insert([
            {
                name: bookingData.name,
                route: bookingData.route,
                class: bookingData.class,
                passengers: bookingData.count,
                total: bookingData.total
            }
        ]);
    } catch (err) {
        console.log("Supabase error:", err);
    }

    window.location.href = "confirmation.html";
};