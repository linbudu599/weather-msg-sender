import fs from "fs";
import {
  log,
  IMsgProps,
  encourageArr,
  getAdvice,
  STATS_PATH,
  IStatProps,
} from "./util";

const stat: string = fs.readFileSync(STATS_PATH, "utf-8");
const { result }: IStatProps = JSON.parse(stat);

log("extract weather conditions successfully");

const { weather, temphigh, templow, windpower } = result;
const condition: string = `${weather}, ${templow}℃ ~ ${temphigh}℃, ${windpower}风`;

const advice = getAdvice(condition);

const random_idx: number = Math.floor(Math.random() * 14);
const encourage = encourageArr[random_idx];

const msgParams: IMsgProps = {
  condition,
  advice,
  encourage,
};

console.log(msgParams);

log("=== Msg Content Ready ===");

export default msgParams;
