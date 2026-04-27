function formatName(name) {
    return name
        .toLowerCase()
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

const data = JSON.parse(localStorage.getItem("latestBooking"));

const container = document.getElementById("ticket");

const bookingId = "VITM" + Math.floor(Math.random() * 1000000);

if (data) {

    let passengersHTML = "";

    data.passengers.forEach((p, i) => {
        passengersHTML += `
            <div class="passenger-block">
                <p><strong>${i + 1}. ${formatName(p.firstName + " " + p.lastName)}</strong></p>
                <p>Passport: ${p.passport}</p>
                <p>Age: ${p.age} | ${p.gender}</p>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="ticket" id="ticketContent">

            <div class="ticket-header">
                <h2>VIT-M Airlines</h2>
                <span>${bookingId}</span>
            </div>

            <div class="ticket-route">
                <h3>${data.route}</h3>
            </div>

            <div class="ticket-details">
                <p><strong>Class:</strong> ${data.class}</p>
                <p><strong>Passengers:</strong> ${data.count}</p>
                <p><strong>Total:</strong> $${data.total}</p>
            </div>

            <div class="ticket-passengers">
                ${passengersHTML}
            </div>

            <div class="ticket-footer">
                STATUS: CONFIRMED
            </div>

        </div>
    `;
}

window.downloadTicket = async function () {

    const { jsPDF } = window.jspdf;
    const ticket = document.getElementById("ticketContent");

    const canvas = await html2canvas(ticket);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 120);
    pdf.save("VITM-Ticket.pdf");
};