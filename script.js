const form = document.getElementById("appointmentForm");
const dateInput = document.getElementById("date");
const message = document.getElementById("message");

function getToday() {
    const today = new Date();
    return today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");
}

dateInput.min = getToday();

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = Number(document.getElementById("age").value);
    const phone = document.getElementById("phone").value.trim();
    const department = document.getElementById("department").value;
    const doctor = document.getElementById("doctor").value;
    const date = dateInput.value;
    const time = document.getElementById("time").value;
    const reason = document.getElementById("reason").value.trim();
    const todayDate = getToday();

    if (!/^[0-9]{10}$/.test(phone)) {
        showError("Enter a valid 10-digit phone number.");
        return;
    }

    if (!Number.isInteger(age) || age < 1 || age > 120) {
        showError("Enter a valid age.");
        return;
    }

    if (!date || date < todayDate || !time || !reason) {
        showError("Please enter all details correctly.");
        return;
    }

    const selectedDay = new Date(date + "T00:00:00").getDay();
    let start = 8 * 60;
    let end = 20 * 60;

    if (selectedDay === 0) {
        start = 9 * 60;
        end = 13 * 60;
    }

    const parts = time.split(":");
    const selectedTime = Number(parts[0]) * 60 + Number(parts[1]);

    if (selectedTime < start || selectedTime >= end) {
        showError("Please select a time within hospital OPD hours.");
        return;
    }

    if (date === todayDate) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        if (selectedTime <= currentTime) {
            showError("Please select a future time.");
            return;
        }
    }

    message.style.color = "green";
    message.textContent =
        "Appointment Confirmed!\n" +
        "Patient: " + name + "\n" +
        "Age: " + age + "\n" +
        "Phone: " + phone + "\n" +
        "Doctor: " + doctor + "\n" +
        "Department: " + department + "\n" +
        "Date: " + date + "\n" +
        "Time: " + time + "\n" +
        "Reason: " + reason;

    form.reset();
    dateInput.min = getToday();
});

function showError(text) {
    message.style.color = "red";
    message.textContent = text;
}

const questions = document.querySelectorAll(".question");

questions.forEach(function(button) {
    button.addEventListener("click", function() {
        button.parentElement.classList.toggle("active");
    });
});
