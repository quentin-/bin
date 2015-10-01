# Bins

```bash
cp .env.default .env
docker-compose up
```

```bash
# make a http request to a bin
curl $(docker-machine ip default):8080/bins/abc?foo=bar

# fetch the requests
curl $(docker-machine ip default):8080/v1/bins/abc
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

```bash
# set the reponse of a bin
curl $(docker-machine ip default):8080/v1/bins/1234/reply \
  -X POST \
  -d '{"status":"404","body":{"foo":"bar"}}'
```

```bash
# make a http request to a bin
curl $(docker-machine ip default):8080/bins/abc?foo=bar
```

```bash
# received a 404 response
{"foo": "bar"}
```

# test

Too run the tests in docker you will need to set the DOCKER_MACHINE_IP in your .env file

```
npm run docker-test
```
