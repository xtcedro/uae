import { execSync } from "child_process";
import os from "os";

// Detect OS
const platform = os.platform(); // 'win32', 'linux', 'darwin'

// Approved system automation commands
const safeCommands = {
    "clear-cache": {
        linux: "sudo sync && sudo purge",
        darwin: "sudo sync && sudo purge",
        win32: "powershell.exe Clear-DnsClientCache"
    },
    "update-system": {
        linux: "sudo apt update && sudo apt upgrade -y",
        darwin: "softwareupdate -ia",
        win32: "powershell.exe Install-Module PSWindowsUpdate -Force"
    },
    "optimize-system": {
        linux: "sudo apt autoremove -y && sudo apt clean",
        darwin: "brew cleanup",
        win32: "powershell.exe Cleanmgr /sagerun:1"
    },
    "deploy-app": {
        linux: "git pull origin main && npm install && pm2 restart all",
        darwin: "git pull origin main && npm install && pm2 restart all",
        win32: "powershell.exe git pull origin main; npm install; pm2 restart all"
    },
    "restart-services": {
        linux: "sudo systemctl restart nginx",
        darwin: "sudo launchctl kickstart -k system/com.apple.webservices",
        win32: "powershell.exe Restart-Service W3SVC"
    }
};

// Execute a command based on OS type
export const executeCommand = (command) => {
    if (!safeCommands[command]) {
        console.log(`❌ Command "${command}" is not recognized.`);
        return { success: false, message: "Invalid command." };
    }

    const commandToRun = safeCommands[command][platform];

    if (!commandToRun) {
        console.log(`⚠️ Command "${command}" is not supported on ${platform}.`);
        return { success: false, message: "Command not supported on this OS." };
    }

    console.log(`🚀 Executing: ${commandToRun}`);

    try {
        const output = execSync(commandToRun, { stdio: "pipe" }).toString();
        console.log(`✅ Execution Result: ${output}`);
        return { success: true, message: output };
    } catch (error) {
        console.error(`❌ Error executing ${command}:`, error.message);
        return { success: false, message: error.message };
    }
};