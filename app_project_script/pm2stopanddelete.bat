@echo off
set HOMEDRIVE=C:
set HOMEPATH=\Users\%USERNAME%
set path=C:\Users\%USERNAME%\AppData\Roaming\npm;%path%
set PM2_HOME=C:\etc\.pm2

pm2 stop all && pm2 delete all