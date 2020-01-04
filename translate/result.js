const test = require("./index");
console.log(test);

// TODO: 在这里将结果转化为中文

const {
  current_desc,
  weatherDesc,
  mintempC,
  maxtempC,
  uvIndex,
  sunHour
} = test;

exports.condition = `${current_desc},${mintempC}~${maxtempC}`;
exports.advice = " 出门走走 见见老友";
exports.talk = "小林也在向有你的未来努力";
