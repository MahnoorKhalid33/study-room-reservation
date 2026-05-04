/* ================= GLOBAL DATA ================= */

// Placeholder image used for all room cards
const placeholderImage = "https://via.placeholder.com/160x120.png?text=Study+Room";

/* Array of study room objects (simulates database data) */
const rooms = [
    { name: "Study Room B09", floor: "3rd Floor", capacity: 2, board: true, plugs: true, accessible: true },
    { name: "Study Room B03", floor: "3rd Floor", capacity: 2, board: true, plugs: false, accessible: false },
    { name: "Study Room B17", floor: "3rd Floor", capacity: 4, board: false, plugs: true, accessible: true },
    { name: "Study Room JPL 2.01", floor: "2nd Floor", capacity: 4, board: true, plugs: true, accessible: false },
    { name: "Study Room JPL 3.12", floor: "3rd Floor", capacity: 6, board: true, plugs: true, accessible: true },
    { name: "Study Room JPL 4.08", floor: "4th Floor", capacity: 8, board: false, plugs: true, accessible: true },
    { name: "Group Room A12", floor: "1st Floor", capacity: 10, board: true, plugs: true, accessible: true },
    { name: "Quiet Room C22", floor: "2nd Floor", capacity: 3, board: false, plugs: false, accessible: true },
    { name: "Collaboration Room D05", floor: "4th Floor", capacity: 12, board: true, plugs: true, accessible: false }
];

/* Stores currently logged-in student */
let currentStudent = null;


/* ================= LOGIN FUNCTION ================= */

/* Handles login validation and switches UI from login page to main app */
function login() {
    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const error = document.getElementById("loginError");

    // Validate input fields
    if (name === "" || email === "") {
        error.textContent = "Please enter your name and email.";
        return;
    }

    // Save logged-in user
    currentStudent = { name, email };

    // Hide login page and show main application
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainApp").style.display = "flex";
}


/* ================= SEARCH FUNCTION ================= */

/* Filters rooms based on user input (capacity + features) */
function searchRooms() {

    // Get user inputs
    const capacityInput = document.getElementById("capacity").value;
    const capacity = capacityInput === "" ? 0 : parseInt(capacityInput);

    const board = document.getElementById("board").checked;
    const plugs = document.getElementById("plugs").checked;
    const accessible = document.getElementById("accessible").checked;

    const results = document.getElementById("results");
    const reservationBox = document.getElementById("reservationBox");

    // Clear previous reservation message
    reservationBox.innerHTML = "";

    // Filter rooms based on criteria
    const filtered = rooms.filter(room =>
        room.capacity >= capacity &&
        (!board || room.board) &&
        (!plugs || room.plugs) &&
        (!accessible || room.accessible)
    );

    // Handle no results case (error flow)
    if (filtered.length === 0) {
        results.innerHTML = `
            <div class="notice">
                <h3>No rooms available</h3>
                <p>Please try a different capacity, time, or feature selection.</p>
            </div>
        `;
        return;
    }

    // Generate room cards dynamically
    let output = "";

    filtered.forEach(room => {
        output += `
            <div class="card">
                <img src="${placeholderImage}" alt="Placeholder image of study room">

                <div>
                    <h3>${room.name}</h3>
                    <p>${room.floor}</p>
                    <p><strong>Capacity:</strong> ${room.capacity} seats</p>

                    <div class="tags">
                        ${room.board ? "<span>Whiteboard</span>" : ""}
                        ${room.plugs ? "<span>Power Available</span>" : ""}
                        ${room.accessible ? "<span>Accessible Space</span>" : ""}
                    </div>
                </div>

                <!-- Book button triggers reservation -->
                <button class="book-btn" onclick="reserveRoom('${room.name}')">BOOK NOW</button>
            </div>
        `;
    });

    // Display results
    results.innerHTML = output;
}


/* ================= RESERVATION FUNCTIONS ================= */

/* Displays confirmation message when a room is booked */
function reserveRoom(roomName) {
    const reservationBox = document.getElementById("reservationBox");

    reservationBox.innerHTML = `
        <div class="confirmation">
            <h3>Reservation Confirmed</h3>
            <p>${currentStudent.name}, you reserved <strong>${roomName}</strong>.</p>
            <button onclick="cancelReservation()">Cancel Reservation</button>
        </div>
    `;

    // Scroll to top so confirmation is visible
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Handles cancellation of reservation */
function cancelReservation() {
    document.getElementById("reservationBox").innerHTML = `
        <div class="notice">
            <h3>Reservation Cancelled</h3>
            <p>Your room reservation has been cancelled.</p>
        </div>
    `;
}


/* ================= ASSISTIVE FEATURES ================= */

/* Toggles larger font size for accessibility */
function toggleLargeText() {
    document.body.classList.toggle("large-text");
}

/* Toggles high contrast mode for better visibility */
function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
}


/* ================= LANGUAGE SUPPORT ================= */

/* Changes UI text based on selected language */
function changeLanguage() {
    const lang = document.getElementById("language").value;

    if (lang === "es") {
        document.getElementById("resultsTitle").innerText = "Salas Disponibles";
        document.querySelector("header h1").innerText = "Sistema de Reservación de Salas";
    } 
    else if (lang === "ur") {
        document.getElementById("resultsTitle").innerText = "دستیاب مطالعہ کمرے";
        document.querySelector("header h1").innerText = "مطالعہ کمرہ ریزرویشن سسٹم";
    } 
    else {
        document.getElementById("resultsTitle").innerText = "Available Study Rooms";
        document.querySelector("header h1").innerText = "UTSA Study Room Reservation";
    }
}


/* ================= INITIAL LOAD ================= */

/* Automatically display rooms when page loads */
window.onload = searchRooms;