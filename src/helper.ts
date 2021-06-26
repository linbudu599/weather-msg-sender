import fs from "fs-extra";
import axios from "axios";
import dotenv from "dotenv";
import * as tencentcloud from "tencentcloud-sdk-nodejs";
import chalk, { Color } from "chalk";

import pick from "lodash/pick";

import { IParamsProps, IStatProps, IMsgProps, IResult } from "../src/type";
import { encourageArr, CITY, FETCH_FAILED_FLAG } from "./constants";

export const log = (message: string, color: string = "green"): void =>
  console.log(chalk[color as typeof Color](message));

export async function fetchWeatherReport(
  appKey: string,
  city: string
): Promise<IStatProps> {
  console.log("appKey: ", appKey);
  log("=== Start Fetch Data ===");
  const res = await axios.get(
    `https://api.jisuapi.com/weather/query?appkey=${appKey}&city=${encodeURIComponent(
      city
    )}`
  );

  return res.data;
}

export function composeMsgContent(
  weatherInfo:
    | Pick<IResult, "weather" | "temphigh" | "templow" | "windpower">
    | symbol
): IMsgProps {
  if (typeof weatherInfo === "symbol") {
    const failedMsgParams: IMsgProps = {
      condition: "UNKNOWN",
      caring: "UNKNOWN",
      encourage: "UNKNOWN",
    };

    return failedMsgParams;
  }

  const { weather, temphigh, templow, windpower } = weatherInfo;
  const condition: string = `${weather}, ${templow}℃ ~ ${temphigh}℃, ${windpower}风`;

  const caring = generateCaring(condition);

  const random_idx: number = Math.floor(Math.random() * encourageArr.length);
  const encourage = encourageArr[random_idx];

  const msgParams: IMsgProps = {
    condition,
    caring,
    encourage,
  };

  return msgParams;
}

const generateCaring = (condition: string): string => {
  let caring: string;

  if (condition.includes("晴")) {
    caring = "晴天适合在走廊上背背书~";
  } else if (condition.includes("雨")) {
    caring = "雨天适合在教室里安心做题";
  } else if (condition.includes("云")) {
    caring = "多云适合干啥? 想我吧";
  } else {
    caring = "今天适合多吃点!";
  }

  return caring;
};

export async function sendMsg(content: IMsgProps) {
  const { condition, caring, encourage } = content;
  const SmsClient = tencentcloud.sms.v20190711.Client;

  let client = new SmsClient({
    credential: {
      secretId: process.env.SECRET_ID!,
      secretKey: process.env.SECRET_KEY!,
    },
    region: "ap-guangzhou",
    profile: {
      language: "zh-CN",
    },
  });

  const phone = process.env.USE_SELF!
    ? [process.env.SELF_PHONE!]
    : [process.env.SELF_PHONE!];

  console.log("phone: ", phone);

  client.SendSms(
    {
      PhoneNumberSet: phone,
      TemplateID: process.env.TEMPLATE_ID!,
      Sign: "林不渡",
      TemplateParamSet: [`${condition}`, `${caring}`, `${encourage}`],
      SmsSdkAppid: "1400302703",
    },
    (errMsg: any, response: any) => {
      if (errMsg) {
        // log(errMsg, "red");
        return;
      }
      // log(JSON.stringify(response));
    }
  );
}
