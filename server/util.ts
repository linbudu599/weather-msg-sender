import chalk, { Color } from "chalk";
import path from "path";

export const log = (message: string, color: string = "green"): void =>
  console.log(chalk[color as typeof Color](message));

export const CITY: string = "文昌";
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
  "我也在和阿茵一起努力迈向美好又可爱的未来",
  "以后想养只猫, 你负责撸猫, 我负责撸你",
  "背书背到自闭的时候就随便选一个美好瞬间闭眼回想吧~",
  "希望我能早点靠自己的努力让你当上米虫!",
  "以后看到沙发椅就会想到从沙发椅上摔下来和在沙发椅上亲亲",
  "最喜欢的动作之一是臊皮完你捶我然后上来抱我",
  "要不要提前想想下学期我们要去哪儿玩~ 广东? 成都? 你说了算",
  "林老师现在在这里吃的每一顿外卖都是和你一起吃过的(除了炸鸡)",
  "希望未来能真的如我所想, 比如你毕业就来一起搞装修",
  "以后多给你做各种各样好吃的, 你爱吃的, 还有我爱吃的~(口味培养)",
  "考完研我一定要好好好好的陪你, 到时候24小时待命~",
  "想和你一起裹在厚实温暖的被窝里说悄悄话! 然后因为臊皮被你打",
  "努力就要有奖励, 比如考完研把林老师奖励给你",
  "考完研的任务: 头发 长胖 变长 本饲养员信心满满",
];

// TODO: 建议
export const getAdvice = (condition: string): string => {
  let advice: string;

  if (condition.includes("晴")) {
    advice = "晴天适合在走廊上背背书~";
  } else if (condition.includes("雨")) {
    advice = "雨天适合在教室里安心做题";
  } else if (condition.includes("云")) {
    advice = "多云适合干啥? 想我吧";
  } else {
    advice = "今天适合多吃点!";
  }

  return advice;
};
