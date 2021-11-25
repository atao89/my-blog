const express = require("express");     //引入express
const app = express();                  //实例化一个app

//设置一个路由,访问服务器
app.get("/", (req, res) => {
    console.log(req.query)
    res.send("HELLO SEVER.JS!");
})

//设置一个端口号
const port = process.env.PORT || 5000;  //本地的服务器端口号一般是5000

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})