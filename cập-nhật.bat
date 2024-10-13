@echo off
echo Updating...
cd DebtManagement
dir
git pull
mvn clean install
pause