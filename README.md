
# ElecticMonitor
## Introduction
This is a project to monitor electric system via mobile phone and build with Vue.js and Express.js, function include client login, logout, limit user to login single account, Jwt token, RESTAPI.  
# Project setup
## FrontEnd
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### serve with dist
```
serve -s dist
```
=======
## Docker ( frontend )
```
docker build -t my-app .
docker run -d -p 8080:80 my-app
```
=======

## BackEnd
1. run redis-server(docker)
2. run linsql(docker)
3. run npm start under server folder

### use bash to change SA password
```
docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd \
    -S localhost -U SA -P "YourStrong!Password" \
    -Q 'ALTER LOGIN SA WITH PASSWORD="<NewStrong!PassWord>"
```
### connect to sql
```
docker exec -it sql "bash"
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "<YourStrong!Password>"
```
### install node process manager
```
npm i pm2 -g
```
tutorial : https://larrylu.blog/nodejs-pm2-cluster-455ffbd7671

## pm2 to start server
cd into server directory and type
```
pm2 start dist
```
## pm2 to start client
cd into client directory and type
```
pm2 start client.js
```
