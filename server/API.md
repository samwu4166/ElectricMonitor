# API documemt

base_url : '/api/v1'

## point
### get realtime point
```javascript
{
    method : "GET",
    header : {
        "authorization" : "your jwt token"
    },
    url : '/point',
    data : [
        "status": "OK",
        "msg": {
            "tagname": "All",
            "data": []
        }
}
```
### get specify tagname point
```javascript
{
    method : "GET",
    header : {
        "authorization" : "your jwt token"
    },
    url : '/point/:tagname',
    data : {
        "status": "OK",
        "msg": {
            "tagname": "All",
            "data":[]
    }
}
```
## token
### get token list
```javascript
{
    method : "GET",
    url : "/token",
    header : {
        "authorization" : "your jwt token"
    },
    data : {
        "status": "OK",
        "data": {
            "valid_token": [
                {
                    "token": "ACCOUNT_TOKEN",
                    "auth": "AUTH",
                    "us_use": "USE_STATE"
                },
                ...
            ]
        }
    }   
}
```
### post a token
```javascript
{
    method : "POST",
    url : "/token",
    header : {
        "authorization" : "your jwt token"
    },
    payload : {
        "id" : 'AUTH_ID'
    },
    data : {
        "status": "OK",
        "data": {
            "valid_token": "VALID ACCOUNT_TOKEN",
            "auth": "AUTH"
        }
    }   
}
```
### extends a jwt token
```javascript
{
    method : "POST",
    url : "/token/extends",
    header : {
        "authorization" : "your jwt token"
    },
    data : {
        "status": "OK",
        "data": {
             "message": "STATUS",
             "permission": "AUTH",
             "token":"NEW_TOKEN"
        }
    }   
}
```
## user
### get clients
```javascript
{
    method : "GET",
    url : "user",
    header : {
        "authorization" : "your jwt token"
    },
    payload : {
        "token" : "VALID_TOKEN",
    },
    data : {
        {
            "uuid": "UID",
            "account": "ACCOUNT",
            "password": "PASSWORD",
            "token": "ACCOUNT_TOKEN"
        },
        ...
    }   
}
```
### get specify clients
```javascript
{
    method : "GET",
    url : "user/:id",
    header : {
        "authorization" : "your jwt token"
    },
    payload : {
        "token" : "VALID_TOKEN",
    },
    data : {
        {
            "uuid": "UID",
            "account": "ACCOUNT",
            "password": "PASSWORD",
            "token": "ACCOUNT_TOKEN"
        },
    }   
}
```
## login auth
### register
```javascript
{
    method : "POST",
    url : "/auth/register",
    payload : {
        "token" : "VALID_TOKEN",
        "account" : "ACCOUNT",
        "password" : "PASSWORD(example:larrycp3vul3)"
    },
    data : {
        "status": "OK",
        "data": {
            "status": "STATUS",
            "data": {
                "message": "MESSAGE"
            }
        }
    }   
}
```
### login
```javascript
{
    method : "POST",
    url : "/auth/login",
    payload : {
        "account" : "ACCOUNT",
        "password" : "PASSWORD(example:larrycp3vul3)"
    },
    data : {
        "status": "OK",
        "data": {
            "message": "STATUS",
            "permission": "AUTH",
            "token": "VALID_JWT_TOKEN"
        }
    }   
}
```
### logout
```javascript
{
    method : "POST",
    url : "/logout",
    header : {
        "authorization" : "your jwt token"
    },
    data : {
        "status": "OK",
        "data": {
            "message": "STATUS",
        }
    }   
}
```