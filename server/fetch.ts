import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

import { log, CITY, STATS_PATH } from "./util";

interface IFetchFunc {
  (app_key: string, city: string): Promise<void>;
}

export const fetchData: IFetchFunc = async (app_key, city) => {
  log("=== Start Fetch Data ===");
  const res = await axios.get(
    `https://api.jisuapi.com/weather/query?appkey=${app_key}&city=${city}`
  );

  const exist = fs.existsSync(STATS_PATH);

  try {
    if (exist) {
      log("=== Delete Stas Past ===");
      fs.unlinkSync(STATS_PATH);
    }
    log("=== Create Stas Today ===");
    fs.writeFileSync(STATS_PATH, JSON.stringify(res.data));
  } catch (err) {
    // TODO: record by arti
    console.log(err);
  }
};

fetchData(process.env.APP_KEY as string, encodeURI(CITY));

log("=== Fetch Weather Info Successfully ===");
