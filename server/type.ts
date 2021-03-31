export type FetchFunc = (app_key: string, city: string) => Promise<void>;

export interface IParamsProps {
  PhoneNumberSet: string[];
  TemplateID: string;
  Sign: string;
  TemplateParamSet: string[];
  SmsSdkAppid: string;
}
