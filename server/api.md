## Picocaine server api introduce

- There are some rules you need understand before developing.
    1. All of the results is a JSON str, and there must be have param named 'error', if the param's value is 0 (type integer), it mean success, others are unsuccess. If it success, you can find the data you want from the 'data' param, it is a object. else, these will be a param named 'msg' (type string) to answer you what happend.
    2. All of the data you'll send to server also must be a JSON str if it POST method API, and you should save it at a value witch name is 'data'. If you want send photo to server, you need two param, the one is you 'data', and the other is you photo(type file), the photo's param name is 'photo'.

- The apis as follow

| Name | URL | Method|  Request Data | Response Data | Error Examples | Note |
| --- | --- | --- | --- | --- | --- | --- |
| Upload Photo to server | /uploadPhoto | POST | data:{"tags":["", ""]} photo:(a photo) | {"error":0,"data":{"picurl":"b1b77ec87e3f07d895f95c3166d69dac.png"}} | {"error":1002,"msg":"Photo already exists."}, {"error":1000 ,"msg":"Upload photo faild"} |
| Get photo | /getPhoto | GET | picurl:xx.jpg, quality:small | A pic | {"error":1003,"msg":"Photo not exists."} | The quality can be these: 'small', 'source' |
