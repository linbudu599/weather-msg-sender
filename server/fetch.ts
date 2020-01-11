import fs from "fs";
import axios from "axios";

interface IFetchProps {
  (app_key: string, city: string): any;
}

const city: string = "文昌";

const fetchData: IFetchProps = async (app_key, city) => {
  const res = await axios.get(
    `https://api.jisuapi.com/weather/query?appkey=${app_key}&city=${city}`
  );

  try {
    fs.unlinkSync("./stat.json");
    fs.appendFileSync("./stat.json", JSON.stringify(res.data));
  } catch (err) {
    console.log(err);
  }
};

fetchData(process.env.APP_KEY as string, encodeURI(city));
console.log("fetch successfully");
