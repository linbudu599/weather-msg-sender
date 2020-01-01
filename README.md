# weather-msg-sender💌

> 一个借助 GitHub Actions 来定时发送天气预报短信的小玩意 ☁⛅⛈🌤🌥🌦🌧🌨🌩🌀🌂🌫🌬

## 实现

- **GitHub Actions** 的自动化运行
- [wttr.in](https://wttr.in/)，提供命令行下的天气信息

  > 为啥不用成熟的 API？比如彩云天气啥的？因为收费还是申请 API Key 有点麻烦，而且这个网站也能提供 json 格式，例如
  >
  > ```bash
  > curl wttr.in/NanChang?format=j1
  > ```

- 腾讯云 提供短信服务

GitHub Actions 会在预设好的时间定时触发，跑一遍 flow（主要就是调用脚本获取信息），，然后用腾讯云的短信 SDK 来发送到指定的手机号（只准备写死在 **setting-secrets** 里）

## 进度

- 等待腾讯云审核短信签名及模板
