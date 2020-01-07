const final = require("./index");
console.log(final);

const {
  current_desc,
  weatherDesc,
  mintempC,
  maxtempC,
  uvIndex,
  sunHour
} = final;

exports.condition = `${current_desc},${mintempC}~${maxtempC}`;
exports.advice = " 开！开！心！心！";
exports.talk = "小林也在向有你的未来努力~";
