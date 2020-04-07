function getCurrentTime() {
    const time = new Date();

    return time.toLocaleString();
}

exports.getCurrentTime = getCurrentTime;

//  和上面的是一个意思
// module.exports.getCurrentTime = getCurrentTime;
