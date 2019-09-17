
# app_project
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
docker build . -t my-app
docker run -d -p 8080:80 my-app
```
=======

## BackEnd
1. run redis-server(docker)
2. run linsql(docker)
3. run npm start under server folder
