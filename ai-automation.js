import { createServer } from "http";
import express from "express";
import { WebSocketServer } from "ws";
import { executeCommand } from "./src/automation/executor.mjs";

// ✅ Initialize Express Server for Web Dashboard
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS for dashboard)
app.use(express.static("public"));

// Start HTTP Server
const server = createServer(app);
server.listen(port, () => {
    console.log(`🚀 AI Automation Dashboard running at http://localhost:${port}`);
});

// ✅ Start WebSocket Server for AI Automation
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("📡 AI WebSocket Connected.");

    ws.on("message", (message) => {
        const command = message.toString();
        console.log(`🔹 AI Triggered Command: ${command}`);

        // Execute AI automation command
        const result = executeCommand(command);

        // Send execution result back to the client
        ws.send(JSON.stringify({ status: result.success ? "success" : "error", command, result: result.message }));
    });
});

console.log("✅ AI Automation System is fully operational!");