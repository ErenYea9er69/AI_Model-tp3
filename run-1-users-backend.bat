@echo off
set "JAVA_HOME=C:\Users\bmh\.antigravity\extensions\redhat.java-1.54.0-win32-x64\jre\21.0.10-win32-x86_64"
set "PATH=%JAVA_HOME%\bin;%PATH%"
echo Starting Users Authentication Microservice (Port 8081)...
cd users-microservice
..\.maven\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
