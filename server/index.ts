import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

import * as tencentcloud from "tencentcloud-sdk-nodejs";

import {
  CITY,
  log,
  IMsgProps,
  encourageArr,
  getAdvice,
  STATS_PATH,
  IStatProps,
} from "./util";
import { IParamsProps } from "./type";

dotenv.config();

main();

async function main() {
  await fetchData(process.env.APP_KEY!, encodeURI(CITY));
  log("=== Fetch Weather Info Successfully ===");

  const result = composeMsgContent();
  const { condition, advice, encourage } = result;

  log("=== Msg Content Ready ===");

  await sendMsg(condition, advice, encourage);
}

async function fetchData(app_key: string, city: string) {
  log("=== Start Fetch Data ===");
  const res = await axios.get(
    `https://api.jisuapi.com/weather/query?appkey=${app_key}&city=${city}`
  );

  console.log("res: ", res);

  const exist = fs.existsSync(STATS_PATH);

  try {
    if (exist) {
      log("=== Delete Stas Past ===");
      fs.unlinkSync(STATS_PATH);
    }
    log("=== Create Stas Today ===");
    fs.writeFileSync(STATS_PATH, JSON.stringify(res.data));
  } catch (err) {
    console.error(err);
  }
}

async function sendMsg(condition: string, advice: string, encourage: string) {
  const SmsClient = tencentcloud.sms.v20190711.Client;

  let client = new SmsClient({
    credential: {
      secretId: process.env.SECRET_ID,
      secretKey: process.env.SECRET_KEY,
    },
    region: "ap-guangzhou",
    profile: {
      language: "zh-CN",
    },
  });

  client.SendSms(
    {
      PhoneNumberSet: [process.env.PHONE!],
      TemplateID: "843130",
      Sign: "林不渡",
      TemplateParamSet: [`${condition}`, `${advice}`, `${encourage}`],
      SmsSdkAppid: "1400302703",
    },
    (errMsg: any, response: any) => {
      if (errMsg) {
        log(errMsg, "red");
        return;
      }
      log(JSON.stringify(response));
    }
  );
}

function composeMsgContent() {
  const stat: string = fs.readFileSync(STATS_PATH, "utf-8");
  const { result }: IStatProps = JSON.parse(stat);
  log("=== Extract Weather Conditions Successfully");
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

  return msgParams;
}
