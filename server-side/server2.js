// 引入 express
const express = require('express');

// 创建服务器
const app = express();

// 设置一个端口号
const port = process.env.PORT || 5000;  //本地的服务器端口号一般是5000

// const DatabaseOperation = require('./db/connent');

var home = require('./router/home')


// ---测试用例---
// 查询全部
// DatabaseOperation.selectall('address', { page: 1, limit: 5 }, function (result) {
//     console.log("selectall查询结果：", result);
// })

// // 查询单个
// DatabaseOperation.select('address', {
//     "addressid": "2"
// }, function (result) {
//     console.log("select查询结果：", result);
// })

// 插入数据
// DatabaseOperation.insert('address', [{
//     "insert": "Hello",
//     "addressid": "1"
// }], function (result) {
//     console.log('inserts插入结果：', result);
// })

// // 更新
// DatabaseOperation.update('address', {
//     "insert": "Hello"
// }, {
//     $set: {
//         "insert": "mongo"
//     }
// }, function (result) {
//     console.log('update更新结果：', result);
// })

// // 删除
// DatabaseOperation.remove('address', {
//     "insert": "World"
// }, function (result) {
//     console.log('removeall删除结果：', result);
// })


// // 路由
// app.get('/api/user', (req, res) => {
//     let { page, limit } = req.query;
//     DatabaseOperation.selectall('user', { page, limit }, function (result) {
//         // console.log("selectall查询结果：", result);
//         res.send({
//             data: result
//         })
//     })
// })

home.register(app);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})







