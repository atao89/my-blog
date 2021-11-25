var router = require('./router');

// 设置一个端口号
const port = process.env.PORT || 5000;

router.start(port);