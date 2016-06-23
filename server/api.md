## Picocaine server api introduce

- There are some rules you need understand before developing.
    1. All of the results is a JSON str, and there must be have param named 'error', if the param's value is 0 (type integer), it means success, others mean unsuccess. If it success, you can find the data you want from the 'data' param, it is also a object or a array. else, these will be a param named 'msg' (type string) to answer you what happend.
    2. All of the data you'll send to server also must be a JSON str if it POST method API, and you should save it at a value witch name is 'data'. If you want send photo to server, you need two param, the one is you 'data', and the other is you photo(type file), the photo's param name is 'photo'.
    3. If you want to show a photo in HTML, you need a base url like http://localhost/getPhoto, and then, use the GET method to get photo with two params, the one named 'picurl', which from the result of API, and the other named 'quality', which is to set the quality you want to get, now support two kine value, 'small' and 'source'.

- The apis as follow

| Name | URL | Method|  Request Data | Response Data | Error Examples | Note |
| --- | --- | --- | --- | --- | --- | --- |
| Upload Photo to server | /uploadPhoto | POST | data:{"tags":["", ""], "passCode":"lovecfc"} photo:(a photo) | {"error":0,"data":{"picurl":"b1b77ec87e3f07d895f95c3166d69dac.png"}} | {"error":1002,"msg":"Photo already exists."}, {"error":1000 ,"msg":"Upload photo faild"} |
| Get photo | /getPhoto | GET | picurl:xx.jpg, quality:small | A pic | {"error":1003,"msg":"Photo not exists."} | The quality can be these: 'small', 'source' |
| Search Photo By Tag | /searchPhoto | POST | {"tag":"haha", "passCode":"lovecfc", "page":0, "pageSize":10} | {"error":0,"data":[{"picurl":"4d4afd7def03d8e0b67d5621f6f9b313.png","tags":["hahaha"]}]} | | The pageSize is lower than 100. The 'page' is to show the current page, start with 0. |
| Get hot tags | /getHotTags | POST | {"pageSize":100, "passCode":"lovecfc"} | {"error":0,"data":[{"tag":"Test"},{"tag":"Test1"},{"tag":"haha"},{"tag":"Test123"}]} | | The 'pageSize' is lower than 100. |
