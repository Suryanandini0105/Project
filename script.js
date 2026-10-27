
const vehicleSelect = document.getElementById("vehicleSelect");
const daysInput = document.getElementById("days");
const totalPrice = document.getElementById("totalPrice");
const bookingForm = document.getElementById("bookingForm");
const bookingResult = document.getElementById("bookingResult");

function bookVehicle(vehicleName, pricePerDay) {
    vehicleSelect.value = String(pricePerDay);
    updateTotal();

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}

function updateTotal() {
    const pricePerDay = Number(vehicleSelect.value);
    const days = Number(daysInput.value);

    if (
        pricePerDay <= 0 ||
        !Number.isInteger(days) ||
        days < 1 ||
        days > 30
    ) {
        totalPrice.textContent = "₹0";
        return;
    }

    const total = pricePerDay * days;
    totalPrice.textContent = "₹" + total.toLocaleString("en-IN");
}

vehicleSelect.addEventListener("change", updateTotal);
daysInput.addEventListener("input", updateTotal);

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const pricePerDay = Number(vehicleSelect.value);
    const days = Number(daysInput.value);

    if (
        !name ||
        !/^[0-9]{10}$/.test(phone) ||
        pricePerDay <= 0 ||
        !Number.isInteger(days) ||
        days < 1 ||
        days > 30
    ) {
        bookingResult.textContent =
            "Please check all your details and try again.";
        return;
    }

    const total = pricePerDay * days;
    const vehicleName =
        vehicleSelect.options[vehicleSelect.selectedIndex].text
            .split(" - ")[0];

    bookingResult.innerHTML = `
        <h3>Booking Confirmed!</h3>
        <p><strong>Customer:</strong> ${escapeHTML(name)}</p>
        <p><strong>Phone:</strong> ${escapeHTML(phone)}</p>
        <p><strong>Vehicle:</strong> ${escapeHTML(vehicleName)}</p>
        <p><strong>Rental Days:</strong> ${days}</p>
        <p><strong>Total Price:</strong> ₹${total.toLocaleString("en-IN")}</p>
        <p><em>This is a demo confirmation, not a real reservation.</em></p>
    `;

    bookingResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

function escapeHTML(text) {
    return text.replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

updateTotal();
