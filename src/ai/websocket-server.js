import { WebSocketServer } from "ws";
import { executeCommand } from "../automation/executor.js";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("📡 Web Dashboard Connected.");

    ws.on("message", (message) => {
        const command = message.toString();
        console.log(`🔹 Web Triggered Automation: ${command}`);

        // Execute the command and send response
        const result = executeCommand(command);
        ws.send(JSON.stringify({ status: result.success ? "success" : "error", command, result: result.message }));
    });
});

console.log("🚀 WebSocket Server for AI Automation is running...");