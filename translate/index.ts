const fs = require("fs");
const path = require("path");
const jsonStat = fs.readFileSync(
  path.join(__dirname, "../tmp/stat.json"),
  "utf-8"
);
// 等待彩云天气API审核通过后所有转化逻辑都要重构
// 到时候这部分再完整用类型规定(真的不是我瞎用any)
interface IStatProps {
  current_condition: ICurrentConditionProps[];
  weather: IWeatherProps[];
}

interface ICurrentConditionProps {
  lang_zh: { value: string }[];
  weatherDesc: { value: string }[];
}

interface IWeatherProps {
  astronomy: any;
  date: string;
  hourly: IHourProps[];
  mintempC: string;
  maxtempC: string;
  uvIndex: string;
  sunHour: string;
}

interface IHourProps {
  chanceofrain: string;
  chanceofsunshine: string;
  cloudcover: string;
}

interface ITodayProps {
  mintempC: string;
  maxtempC: string;
  uvIndex: string;
  sunHour: string;
  hourly: IHourProps[];
}

if (!jsonStat.startsWith("{")) {
  throw new Error("害，这网站又崩了...");
}
const stat: IStatProps = JSON.parse(jsonStat);

const { current_condition, weather } = stat;

const current = current_condition[0];
const today_condition = weather[0];

// 中文天气情况
const current_desc: string = decodeURI(current.lang_zh[0].value);
// 英文天气情况，用于后续对应emoji
const weatherDesc: string = current.weatherDesc[0].value;

// 最低/高温，紫外线指数，昼长时间
const { mintempC, maxtempC, uvIndex, sunHour, hourly } = today_condition;

const hour_condition_collections = hourly.map((hour_info: IHourProps) => {
  return Object.assign(
    {},
    {
      rain: hour_info.chanceofrain,
      sun: hour_info.chanceofsunshine,
      cloud: hour_info.cloudcover
    }
  );
});

export interface IExportProps {
  current_desc: string;
  weatherDesc: string;
  mintempC: string;
  maxtempC: string;
  uvIndex: string;
  sunHour: string;
}

const exportInfo: IExportProps = {
  current_desc,
  weatherDesc,
  mintempC,
  maxtempC,
  uvIndex,
  sunHour
};

module.exports = exportInfo;
