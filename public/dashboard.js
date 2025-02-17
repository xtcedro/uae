const ws = new WebSocket("ws://localhost:8080");
const sendButton = document.getElementById("sendCommand");
const commandSelect = document.getElementById("command");
const logContainer = document.getElementById("log");

ws.onopen = () => console.log("📡 Connected to AI Automation Engine.");

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const logEntry = document.createElement("li");
    logEntry.textContent = `✅ ${data.command} executed successfully`;
    logContainer.appendChild(logEntry);
};

sendButton.addEventListener("click", () => {
    const command = commandSelect.value;
    console.log(`🚀 Sending command: ${command}`);
    ws.send(command);
});