@echo off
rem Axiom Wars - installer for Windows.
rem Goes to your user folder (C:\Users\you), downloads the latest version,
rem installs it in C:\Users\you\AxiomWars (replacing the previous one) and
rem starts the game. No administrator rights needed, no PowerShell needed.
rem Run it again to update. The game's settings and saved games live outside
rem that folder and are kept.
setlocal
set "BASE=%AXIOMWARS_BASE%"
if "%BASE%"=="" set "BASE=https://github.com/cesar-rgon/axiom-wars/releases/latest/download"
set "ASSET=AxiomWars-Windows-x64.zip"

cd /d "%USERPROFILE%" || goto :fail
rem The temporary folder sits next to the final one so the last step is a rename on the same drive.
set "TMPD=%USERPROFILE%\AxiomWars-new-%RANDOM%%RANDOM%"
mkdir "%TMPD%" || goto :fail

echo Downloading the latest Axiom Wars (%ASSET%)...
rem curl.exe and tar.exe come with Windows 10/11; what they download is not marked
rem as "from the Internet", so SmartScreen has nothing to warn about.
curl.exe -fL --progress-bar -o "%TMPD%\%ASSET%" "%BASE%/%ASSET%" || goto :fail

echo Unpacking...
tar.exe -xf "%TMPD%\%ASSET%" -C "%TMPD%" || goto :fail
if not exist "%TMPD%\AxiomWars\AxiomWars.exe" (
  echo The download does not contain AxiomWars\AxiomWars.exe.
  goto :fail
)

if exist "%USERPROFILE%\AxiomWars" rmdir /s /q "%USERPROFILE%\AxiomWars"
move "%TMPD%\AxiomWars" "%USERPROFILE%\AxiomWars" >nul || goto :fail
rmdir /s /q "%TMPD%"
echo Installed in %USERPROFILE%\AxiomWars

if defined AXIOMWARS_NO_RUN exit /b 0
echo Starting the game...
start "" /d "%USERPROFILE%\AxiomWars" "%USERPROFILE%\AxiomWars\AxiomWars.exe"
exit /b 0

:fail
echo.
echo The installation failed.
if exist "%TMPD%" rmdir /s /q "%TMPD%"
pause
exit /b 1
