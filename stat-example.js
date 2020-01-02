const data = {
  current_condition: [
    {
      // 体感温度
      FeelsLikeC: "26",
      // 中文天气情况
      lang_zh: [
        {
          value: "\u5c40\u90e8\u591a\u4e91"
        }
      ],
      // 风速，转化为级别表示法
      windspeedMiles: "14"
    }
  ],

  weather: [
    {
      astronomy: [
        {
          // 月亮盈缺
          moon_phase: "First Quarter",
          moonrise: "12:08 PM",
          // 日出日落
          sunrise: "07:12 AM",
          sunset: "06:10 PM"
        }
      ],
      date: "2020-01-02",
      hourly: [
        {
          // 降雨概率，抽出八个时段报告的降雨概率进行比较，下同
          chanceofrain: "43",
          // 闪电概率
          chanceofthunder: "0",
          // 大风概率
          chanceofwindy: "0",
          cloudcover: "85",
          humidity: "86"
        }
      ],
      maxtempC: "23",
      mintempC: "15",
      sunHour: "8.5",
      uvIndex: "1"
    }
  ]
};
