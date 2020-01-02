# weather-msg-sender💌

> 一个借助 GitHub Actions 来定时发送天气预报短信的小玩意 ☁⛅⛈🌤🌥🌦🌧🌨🌩🌀🌂🌫🌬

## 实现

- **GitHub Actions** 的自动化运行
- [wttr.in](https://wttr.in/)，提供天气信息

  > 为啥不用成熟的 API？比如彩云天h气啥的？因为收费还是申请 API Key 有点麻烦，而且这个网站也能提供 json 格式，例如
  >
  > ```bash
  > curl wttr.in/NanChang?format=j1
  > ```

- 腾讯云 提供短信服务

## 流程

- GitHub Actions 会在预设好的时间定时触发，跑一遍 flow
- 调用脚本获取信息，写入json文件
- 提取信息，转化为文本，添加emoji
- 使用腾讯云的短信 SDK 来发送到指定的手机号
- 将发送情况保存到日志

## 进度

- 配置action脚本
- 提取信息及与词库、emoji建立映射
- ~~配置bash脚本~~
- ~~日志保存~~
- ~~等待腾讯云审核短信签名及模板~~
