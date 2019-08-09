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
        }, ... list
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
                    "token": "TOKEN",
                    "auth": "AUTH",
                    "us_use": "USE_STATE"
                }...
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
    data : {
        "status": "OK",
        "data": {
            "valid_token": "67a4d0a0-b54b-11e9-a1f4-3dc4beb456e0",
            "auth": "2"
        }
    }   
}
```