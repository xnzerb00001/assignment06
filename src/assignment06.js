// 常量配置
const DRAW = {
  TOTAL: 7                 // 总共抽取7个号码 (6 regular + 1 special)
};

const TIME = {
  INTERVAL: 1000,          // 每次抽奖间隔1秒
  FINAL_DELAY: 7500        // 最终结果显示延迟7.5秒
};

// 随机数生成函数
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 创建数字池函数
function createNumberPool(size) {
  return [...Array(size).keys()].map(x => x + 1);
}

// 初始化数字池
const pool = createNumberPool(49);

console.log("完整数字池:");
console.log(pool);

const drawnNumbers = [];
let count = 0;

console.log("六合彩开奖结果:");

// 设置抽奖定时器
const interval = setInterval(() => {
  if (count < DRAW.TOTAL) {
    const randomIndex = randomIntFromInterval(0, pool.length - 1);
    const drawnNumber = pool[randomIndex];
    
    if (count < DRAW.TOTAL-1) {
      console.log(`号码 ${count+1}: ${drawnNumber}`);
    } else {
      console.log(`特别号码: ${drawnNumber}`);
    }
    
    pool.splice(randomIndex, 1);
    drawnNumbers.push(drawnNumber);
    console.log("已抽号码:", [...drawnNumbers].sort((a, b) => a - b));
    count++;
  } else {
    clearInterval(interval);
  }
}, TIME.INTERVAL);

// 设置结果显示定时器
setTimeout(() => {
  console.log("\n最终结果:");
  console.log("中奖号码:", drawnNumbers.slice(0, 6).sort((a, b) => a - b));
  console.log("特别号码:", drawnNumbers[6]);
  console.log("\n剩余号码池:", pool.length, "个号码");
  console.log(pool.sort((a, b) => a - b));
}, TIME.FINAL_DELAY);