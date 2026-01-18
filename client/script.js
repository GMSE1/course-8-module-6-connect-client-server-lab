// Base URL for the Flask API
const BASE_URL = "http://127.0.0.1:5000";

// Function to fetch and display all events
function fetchEvents() {
    fetch(`${BASE_URL}/events`)
        .then(response => response.json())
        .then(events => {
            displayEvents(events);
        })
        .catch(error => {
            console.error("Error fetching events:", error);
        });
}

// Function to display events in the DOM
function displayEvents(events) {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = ""; // Clear existing content
    
    events.forEach(event => {
        const li = document.createElement("li");
        li.textContent = `${event.id}: ${event.title}`;
        eventList.appendChild(li);
    });
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    
    const titleInput = document.getElementById("title");
    const title = titleInput.value.trim();
    
    if (!title) {
        alert("Please enter an event title");
        return;
    }
    
    // POST request to create new event
    fetch(`${BASE_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to create event");
            }
            return response.json();
        })
        .then(newEvent => {
            console.log("Event created:", newEvent);
            titleInput.value = ""; // Clear the input
            fetchEvents(); // Refresh the event list
        })
        .catch(error => {
            console.error("Error creating event:", error);
            alert("Error creating event. Please try again.");
        });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display events on page load
    fetchEvents();
    
    // Add event listener to form
    const form = document.querySelector("form");
    form.addEventListener("submit", handleFormSubmit);
});
