import chalk, { Color } from "chalk";
import path from "path";

export const encourageArr: string[] = [
  "我也在和阿茵一起努力迈向美好又可爱的未来",
  "以后想养只猫, 你负责撸猫, 我负责撸你",
  "背书背到自闭的时候就随便选一个美好瞬间闭眼回想吧~",
  "希望我能早点靠自己的努力让你当上米虫!",
  "以后看到沙发椅就会想到从沙发椅上摔下来和在沙发椅上亲亲",
  "最喜欢的动作之一是臊皮完你捶我然后上来抱我",
  "以后多给你做各种各样好吃的, 你爱吃的, 还有我爱吃的~(口味培养)",
  "想和你一起裹在厚实温暖的被窝里说悄悄话! 然后因为臊皮被你打",
];

export const log = (message: string, color: string = "green"): void =>
  console.log(chalk[color as typeof Color](message));

export const CITY: string = "深圳";

export const FETCH_FAILED_FLAG = Symbol("Fetch Failed");
