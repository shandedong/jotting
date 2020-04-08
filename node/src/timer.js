const printProgramInfo = require('./myModule/info');

const { getCurrentTime } = require('./myModule/datetime');

const waitTime = Number(process.argv[3]) || 1000;
const message = process.argv[5] || 'hello world';

setTimeout(() => {
  console.log(message);
}, waitTime * 1000);

printProgramInfo();
console.log('当前时间', getCurrentTime());
