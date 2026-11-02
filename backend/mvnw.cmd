@REM ----------------------------------------------------------------------------
@REM Maven Wrapper Script for Windows
@REM ----------------------------------------------------------------------------
@echo off
set ERROR_CODE=0

@setlocal
set "DIRNAME=%~dp0"
if "%DIRNAME%" == "" set "DIRNAME=."
set "MAVEN_CMD=%DIRNAME%\.tools\apache-maven-3.9.6\bin\mvn.cmd"

if not exist "%MAVEN_CMD%" (
  echo Error: Maven executable not found at %MAVEN_CMD%
  exit /b 1
)

"%MAVEN_CMD%" %*
if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
exit /B %ERROR_CODE%
