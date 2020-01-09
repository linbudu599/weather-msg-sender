import info from "./index";
const { weather, temphigh, templow, windpower } = info;

const condition: string = `${weather},${templow}~${temphigh},${windpower}风`;

// TODO:更复杂的转化逻辑
let advice: string;

if (condition.includes("晴")) {
  advice = "吊床躺躺，背背单词";
} else if (condition.includes("雨")) {
  advice = "床上瘫瘫，睡睡懒觉";
} else if (condition.includes("云")) {
  advice = "出门走走，见见老友";
} else {
  advice = "挠头";
}

const talk_arr: string[] = [
  "小林也在向有你的未来努力",
  "小林也在好好学习",
  "小林也好想你",
  "小林不知道说啥了嗷",
  "小林也在认真写代码"
];
const random_idx: number = Math.floor(Math.random() * 5);

const talk = talk_arr[random_idx];

interface IMsgProps {
  condition: string;
  advice: string;
  talk: string;
}

const msgParams: IMsgProps = {
  condition,
  advice,
  talk
};
console.log("msg ready");

export default msgParams;
