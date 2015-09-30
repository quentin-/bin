# httpcreel

```bash
docker-compose up
```

```bash
curl $(docker-machine ip default):8080/creels/abc?foo=bar
curl $(docker-machine ip default):8080/v1/creels/abc
```

```json
{  
   "uid":"abc",
   "requests":[  
      {  
         "url":"/creels/abc?foo=bar",
         "body":{  

         },
         "query":{  
            "foo":"bar"
         },
         "headers":{  
            "host":"192.168.99.100:8080",
            "user-agent":"curl/7.43.0",
            "accept":"*/*"
         },
         "method":"GET",
         "created_at":"2015-09-30T06:44:30.072Z",
         "ip":"::ffff:192.168.99.1"
      }
   ]
}
```
