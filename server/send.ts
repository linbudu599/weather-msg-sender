const tencentcloud = require("tencentcloud-sdk-nodejs");
import axios from "axios";
import dotenv from "dotenv";

import { log } from "./util";
import result from "./translate";

dotenv.config();

const { condition, advice, encourage } = result;
log("=== Processed Msg Content ===");
log(JSON.stringify(result));

// 导入对应产品模块的client models
const SmsClient = tencentcloud.sms.v20190711.Client;
const models = tencentcloud.sms.v20190711.Models;

const customCredential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

// 实例化一个认证对象，入参需要传入腾讯云账户密钥对secretId，secretKey
let cred = new customCredential(process.env.SECRET_ID, process.env.SECRET_KEY);

let httpProfile = new HttpProfile();

/* SDK默认使用POST方法。
 * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
httpProfile.reqMethod = "POST";

/* SDK有默认的超时时间，非必要请不要进行调整
 * 如有需要请在代码中查阅以获取最新的默认值 */
httpProfile.reqTimeout = 30;

httpProfile.endpoint = "sms.tencentcloudapi.com";

let clientProfile = new ClientProfile();
/* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
clientProfile.signMethod = "HmacSHA256";
clientProfile.httpProfile = httpProfile;

let client = new SmsClient(cred, "ap-guangzhou", clientProfile);

let req = new models.SendSmsRequest();

interface IParamsProps {
  PhoneNumberSet: string[];
  TemplateID: string;
  Sign: string;
  TemplateParamSet: string[];
  SmsSdkAppid: string;
}

// 这里的各项参数见官方文档
let params: IParamsProps = {
  PhoneNumberSet: [process.env.PHONE!],
  TemplateID: "754841",
  Sign: "林不渡",
  TemplateParamSet: [`${condition}`, `${advice}`, `${encourage}`],
  // SmsSdkAppid: process.env.APP_ID!
  SmsSdkAppid: "1400302703",
};

const jsonParams: string = JSON.stringify(params);

req.from_json_string(jsonParams);

interface ISendLog {
  (type: string, data: any): void;
}

log("=== Send Log ===");
const sendLog: ISendLog = (type, data) => {
  axios.post("http://log.linbudu.top/weather", {
    data: Object.assign(
      {},
      {
        type,
        response: data,
        content: { condition, advice, encourage },
      }
    ),
  });
};

log("=== Send Msg ===");
// FIXME: errMsg类型暂不确定
client.SendSms(req, (errMsg: any, response: any) => {
  if (errMsg) {
    log(errMsg, "red");
    sendLog("failure", errMsg);
    return;
  }
  log(JSON.stringify(response));
  sendLog("success", response);
});
