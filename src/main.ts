import dotenv from "dotenv";

import { CITY, FETCH_FAILED_FLAG } from "./constants";
import pick from "lodash/pick";

import { fetchWeatherReport, composeMsgContent, sendMsg } from "./helper";

dotenv.config();

async function main() {
  const weatherReport = await fetchWeatherReport(process.env.APP_KEY!, CITY);

  const fetchSuccess = weatherReport.status === 0 && weatherReport.msg === "ok";

  const pickedWeatherReport = fetchSuccess
    ? pick(weatherReport.result, [
        "weather",
        "temphigh",
        "templow",
        "windpower",
      ])
    : FETCH_FAILED_FLAG;

  const msgContent = composeMsgContent(pickedWeatherReport);
  console.log("msgContent: ", msgContent);

  await sendMsg(msgContent);
}

main();
