@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Starting Berrehail Oswalt website...
echo.
echo Running:  http://localhost:8080
echo Close this window to stop the server.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause