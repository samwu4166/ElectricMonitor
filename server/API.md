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
        {
            "tagname": "A1",
            "site": "N1",
            "rs_v": "380",
            "st_v": "380",
            "tr_v": "380",
            "r_a": "808",
            "s_a": "980",
            "t_a": "944",
            "kwh": "964",
            "pf": "196",
            "kw": "213",
            "is_on": "1",
            "datetime": "DATE_TIME"
        },
        ...
    ]
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