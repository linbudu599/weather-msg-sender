# weather-msg-sender💌

![GitHub license](https://img.shields.io/github/license/linbudu599/weather-msg-sender)
![Commits](https://badgen.net/github/commits/linbudu599/weather-msg-sender)
![workflow status](https://github.com/linbudu599/weather-msg-sender/workflows/Auto%20Sender%20Workflow/badge.svg)
![dependencies](https://badgen.net/david/dep/linbudu599/weather-msg-sender)

> 一个借助 GitHub Actions 来定时发送天气预报短信的小玩意 ☁⛅⛈🌤🌥🌦🌧🌨🌩🌀🌂🌫🌬

## 实现

- **GitHub Actions** 定时运行（北京时间 6 点）
- **[急速数据](https://www.jisuapi.com/api/weather/)**，提供天气预报 API 接口
- **腾讯云** 提供短信服务

## 流程

- GitHub Actions 会在预设好的时间定时触发，跑一遍 flow，[查看 Workflow 文件](./.github/workflows/action.yml)
- 调用脚本获取信息，写入 json 文件，查看[fetch.ts](server/fetch.ts)
- 提取信息，转化为文本，~~添加 emoji~~（部分手机 emoji 乱码）
- 使用腾讯云的短信 SDK 来发送到指定的手机号，[SDK 使用范例](server/send.js)

## 说明

- 腾讯云短信接口使用

  > 这里默认你已经完成了从注册到购买资源包的操作（**腾讯云个人用户首次开通会赠送 100 条短信，最低购买数量为 1 千条，50 元**）。
  >
  > 推荐直接使用腾讯云 SDK(for node.js)，请查看[SDK 使用范例](server/send.js)或[官方 GitHub 仓库](https://github.com/TencentCloud/tencentcloud-sdk-nodejs)
  >
  > 但仍建议了解相关实现，[腾讯云文档中心-短信 API](https://cloud.tencent.com/document/product/382/3776)
  >
  > (Tips: 你可以在 [Api-Explorer](https://console.cloud.tencent.com/api/explorer?Product=sms&Version=2019-07-11&Action=SendSms&SignVersion=) 中迅速熟悉整个流程)

- GitHub Actions & Node 环境变量  
  请阅读 [注入 secrets 中的环境变量](docs/env_inject.md) 来获取更多信息