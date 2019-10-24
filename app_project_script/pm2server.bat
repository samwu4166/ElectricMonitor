@echo off
set HOMEDRIVE=C:
set HOMEPATH=\Users\%USERNAME%
set path=C:\Users\%USERNAME%\AppData\Roaming\npm;%path%
set PM2_HOME=C:\etc\.pm2

cd C:\Users\ChengJu\Desktop\app_project
cd server
npm run build && pm2 start dist

echo Finish starting the API server