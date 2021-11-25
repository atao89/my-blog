// 1.引入服务器（引入mongodb模块，并调用了MongoClient方法）
const mongodbClient = require("mongodb").MongoClient;

// 2.数据库的服务器地址
const url = "mongodb://localhost:27017";

/*
    3.连接数据库的服务器
        先进行一次测试，判断是否连接上了,（在刚开始引入服务器时，声明的变量出的mongodbClient调用connect放方法，
        第一个参数是服务器的url地址，第二个参数是一个回调函数，回调函数内有两个参数，一个是连接失败时返回的参数，
        另一个是成功之后返回的
*/
mongodbClient.connect(url, (err, client) => {
    if (!err) {
        console.log('连接成功');
        // 连接到该数据库服务器下的“class”数据库下的名字是“students”的表(集合)，获取到表，就可以对表进行操作
        const collection = client.db("class").collection("students");

        // //增
        // collection.insert({
        //     id: "002",
        //     name: "张三",
        //     age: 19
        // }, (err, data) => {
        //     client.close();
        // })

        // //删
        // collection.remove({
        //     name: "张三"
        // }, (err, data) => {
        //     client.close();
        // })

        // //改
        // collection.update({
        //     name: "Jim"
        // }, {
        //     $set: { age: 16 }
        // }, (err, data) => {
        //     client.close();
        // })

        // //查
        // collection.find().toArray((err, data) => {
        //     console.log('data：', data);
        //     client.close();
        // })
    } else {
        console.log('连接失败');
    }
})
