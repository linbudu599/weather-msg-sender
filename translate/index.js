const fs = require("fs");
const path = require("path");
const jsonRes = fs.readFileSync(
  path.join(__dirname, "../tmp/stat.json"),
  "utf-8"
);
const res = JSON.parse(jsonRes);
const { current_condition, weather } = res;

const current = current_condition[0];
const today_condition = weather[0];

// 中文天气情况
const current_desc = decodeURI(current.lang_zh[0].value);
// 英文天气情况，用于后续对应emoji
const weatherDesc = current.weatherDesc[0].value;

// 最低/高温，紫外线指数，昼长时间
const { mintempC, maxtempC, uvIndex, sunHour, hourly } = today_condition;

const hour_condition_collections = hourly.map(hour_info => {
  return Object.assign(
    {},
    {
      rain: hour_info.chanceofrain,
      sun: hour_info.chanceofsunshine,
      cloud: hour_info.cloudcover
    }
  );
});

// console.log(hour_condition_collections);

module.exports = {
  current_desc,
  weatherDesc,
  mintempC,
  maxtempC,
  uvIndex,
  sunHour
};
