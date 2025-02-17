// ✅ Connect to AI Automation WebSocket Server
const ws = new WebSocket("ws://localhost:3000");

// ✅ UI Elements
const sendButton = document.getElementById("sendCommand");
const commandSelect = document.getElementById("command");
const logContainer = document.getElementById("log");

// ✅ Handle WebSocket Connection
ws.onopen = () => {
    console.log("📡 Connected to AI Automation Engine.");
};

// ✅ Handle Incoming Messages (Execution Logs)
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const logEntry = document.createElement("li");
    logEntry.textContent = `✅ ${data.command} executed successfully`;

    // Add success/error styling
    logEntry.classList.add(data.status === "success" ? "success" : "error");

    logContainer.appendChild(logEntry);
};

// ✅ Send Command to AI Automation System
sendButton.addEventListener("click", () => {
    const command = commandSelect.value;
    console.log(`🚀 Sending Command: ${command}`);
    ws.send(command);
});