export type FetchFunc = (app_key: string, city: string) => Promise<void>;

export interface IParamsProps {
  PhoneNumberSet: string[];
  TemplateID: string;
  Sign: string;
  TemplateParamSet: string[];
  SmsSdkAppid: string;
}
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
}

export interface IMsgProps {
  condition: string;
  caring: string;
  encourage: string;
}
