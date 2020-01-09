import fs from "fs";

interface IStatProps {
  status: number;
  msg: string;
  result: IResult;
}

interface IResult {
  weather: string;
  temphigh: string;
  templow: string;
  windpower: string;
}

const stat: string = fs.readFileSync("./stat.json", "utf-8");
const stat_obj: IStatProps = JSON.parse(stat);

const result: IResult = stat_obj.result;

const { weather, temphigh, templow, windpower } = result;

const info = {
  weather,
  temphigh,
  templow,
  windpower
};
console.log("extract weather conditions successfully");

export default info;
