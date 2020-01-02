const tencentcloud = require("tencentcloud-sdk-nodejs");
const fs = require("fs");
const path = require("path");
const result = require("./result");
// 不知道为啥npm和cnpm都装不上东西了，没法用dotenv，先这样hack一下
// const dotenv = require("dotenv");

const { condition, advice, talk } = result;

const secret = fs.readFileSync(path.join(__dirname, "/tmp-env.txt"), "utf8");

const ID = secret.split(",")[0].split("=")[1];
const KEY = secret.split(",")[1].split("=")[1];

// dotenv.config("./env");
// console.log(process.env);

// 导入对应产品模块的client models
const SmsClient = tencentcloud.sms.v20190711.Client;
const models = tencentcloud.sms.v20190711.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

// 实例化一个认证对象，入参需要传入腾讯云账户密钥对secretId，secretKey
let cred = new Credential(ID, KEY);

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

// 这里的各项参数见官方文档
let params = {
  PhoneNumberSet: ["+8617689609062"],
  TemplateID: "513049",
  Sign: "林不渡",
  TemplateParamSet: [`${condition}`, `${advice}`, `${talk}`],
  SmsSdkAppid: "1400302703"
};

const jsonParams = JSON.stringify(params);

req.from_json_string(jsonParams);

const recordLog = response => {
  const { RequestId, SendStatusSet } = response;
  const date = new Date().toLocaleString();

  let logText;
  logText = `本次请求状态：成功，时间: ${date}，请求id: ${RequestId}，状态: ${SendStatusSet[0].Code}，回报信息: ${SendStatusSet[0].Message}\r\n`;
  try {
    fs.appendFileSync("log.txt", logText, "utf-8");
  } catch (err) {
    throw new Error(err);
  }
};

client.SendSms(req, (errMsg, response) => {
  if (errMsg) {
    console.log(errMsg);
    return;
  }
  recordLog(response);
});
