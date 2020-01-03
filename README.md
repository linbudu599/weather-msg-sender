# weather-msg-sender💌

> 一个借助 GitHub Actions 来定时发送天气预报短信的小玩意 ☁⛅⛈🌤🌥🌦🌧🌨🌩🌀🌂🌫🌬

## 实现

- **GitHub Actions** 的自动化运行
- [**wttr.in**](https://wttr.in/)，提供天气信息

  > ~~为啥不用成熟的 API？比如彩云天 h 气啥的？因为收费还是申请 API Key 有点麻烦，而且这个网站也能提供 json 格式，例如~~
  > 后续估计会换成彩云天气 API 的...，在写 translate 的时候才发现这个网站的数据不好整理...
  >
  > ```bash
  > curl wttr.in/NanChang?format=j1
  > ```

- **腾讯云** 提供短信服务

## 流程

- GitHub Actions 会在预设好的时间定时触发，跑一遍 flow，[查看 Workflow 文件](./.github/workflows/action.yml)
- 调用脚本获取信息，写入 json 文件，如 [stat.json](tmp/stat.json)
- 提取信息，转化为文本，添加 emoji
- 使用腾讯云的短信 SDK 来发送到指定的手机号，[SDK 使用范例](server/send.js)
- 将发送情况保存到日志（这里需要向自己的服务器发一个 POST 请求，把日志保存在服务器上）

## 待完成工作

- 配置 action 脚本
- 提取信息及与词库、emoji 建立映射
- 记录日志到服务器

## 说明

- 腾讯云短信接口使用

  > 这里默认你已经完成了从注册到购买资源包的操作（**腾讯云个人用户首次开通会赠送 100 条短信，最低购买数量为 1 千条，50 元**）。
  >
  > 推荐直接使用腾讯云 SDK(for node.js)，请查看[SDK 使用范例](server/send.js)或[官方 GitHub 仓库](https://github.com/TencentCloud/tencentcloud-sdk-nodejs)
  >
  > 但仍建议了解相关实现，[腾讯云文档中心-短信 API](https://cloud.tencent.com/document/product/382/3776)
  >
  > (Tips: 你可以在 [Api-Explorer](https://console.cloud.tencent.com/api/explorer?Product=sms&Version=2019-07-11&Action=SendSms&SignVersion=) 中迅速熟悉整个流程)

- 腾讯云密钥对
  > 你需要将 `SECRET_ID` 与 `SECRET_KEY` 保存在 **.env** 文件中
