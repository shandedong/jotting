const printProgramInfo = require('./myModule/info');

const { getCurrentTime } = require('./myModule/datetime');

setTimeout(() => {
  console.log('Hello World!');
}, 3000);

printProgramInfo();

console.log('当前时间', getCurrentTime());
