const result = require("./index");
console.log(result);

// TODO: 在这里将结果转化为中文

const {
  current_desc,
  weatherDesc,
  mintempC,
  maxtempC,
  uvIndex,
  sunHour
} = result;

exports.condition = `${current_desc},${mintempC}~${maxtempC}`;
exports.advice = " 开！开！心！心！";
exports.talk = "小林也在向有你的未来努力~";
