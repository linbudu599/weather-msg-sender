import chalk, { Color } from "chalk";
import path from "path";

export const log = (message: string, color: string = "green"): void =>
  console.log(chalk[color as typeof Color](message));

export const CITY: string = "南昌";
export const STATS_PATH = path.join(__dirname, "../stats.json");

export interface IStatProps {
  status: number;
  msg: string;
  result: IResult;
}

export interface IResult {
  weather: string; // 晴
  temphigh: string; // 20
  templow: string; // 12
  windpower: string; // 3级
  windowdirect: string; // 南风
  week: string; // 星期日
}

export interface IMsgProps {
  condition: string;
  advice: string;
  encourage: string;
}

// TODO: 鼓励
export const encourageArr: string[] = [
  "小林也在向有你的未来努力",
  "小林也在好好学习",
  "小林也好想你",
  "小林不知道说啥了嗷",
  "小林也在认真写代码",
];

// TODO: 建议
export const getAdvice = (condition: string): string => {
  let advice: string;

  if (condition.includes("晴")) {
    advice = "吊床躺躺，背背单词";
  } else if (condition.includes("雨")) {
    advice = "床上瘫瘫，睡睡懒觉";
  } else if (condition.includes("云")) {
    advice = "出门走走，见见老友";
  } else {
    advice = "挠头";
  }

  return advice;
};
