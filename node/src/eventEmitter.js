const { EventEmitter } = require('events');

const emitter = new EventEmitter();

// 监听connect事件  注册回调函数
emitter.on('connect', (useName) => {
    console.log(useName);
});

emitter.emit('connect', 'hello world');
