const request = require("request");

request(
  {
    url: "http://wttr.in/NanChang?format=j1", //请求路径
    method: "GET", //请求方式，默认为get
    headers: {
      //设置请求头
      "content-type": "application/json"
    }
  },
  function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }
);
