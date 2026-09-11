@echo off
echo Starting Event Dashboard...

:: Start Backend
start "Backend - Event Dashboard" cmd /k "cd /d C:\Users\risha\.gemini\antigravity\scratch\event-dashboard\backend && node server.js"

:: Wait 2 seconds then start Frontend
timeout /t 2 /nobreak >nul
start "Frontend - Event Dashboard" cmd /k "cd /d C:\Users\risha\.gemini\antigravity\scratch\event-dashboard\frontend && npm start"

echo Done! Browser will open in a few seconds...
