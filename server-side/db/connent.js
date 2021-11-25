// 引入mongodb
const MongoClient = require('mongodb').MongoClient;

var dataconfig = {
    dataurl: "mongodb://127.0.0.1:27017",  // 服务器地址
    dataname: 'test'  // 数据库
}

const printResult = (err, dealdata, total, data, client) => {
    if (!err) {
        dealdata({
            code: '1',
            message: '操作成功',
            total,
            data
        });
    } else {
        dealdata({
            code: '0',
            message: err,
            total: 0,
            data: []
        });
    }
    client.close();
}

const DatabaseOperation = {
    /*
        @selectall 方法返回全部所有数据
        @dataname 表名称
        @paging 分页
        @dealdata 回调处理函数 格式function(result){};
    */
    selectall: function (dataname, paging, dealdata) {
        MongoClient.connect(dataconfig.dataurl, function (err, client) {
            if (!err) {
                console.log('Connect Success');
                const collection = client.db(dataconfig.dataname).collection(dataname);

                let total = 0;
                collection.countDocuments((err, num) => {
                    total = num;
                    if (paging.page === undefined) {
                        collection.find().toArray((err, data) => {
                            printResult(err, dealdata, total, data, client)
                        })
                    } else {
                        paging.limit = paging.limit != undefined ? paging.limit : 10;
                        collection.find({}, {
                            skip: (paging.page - 1) * paging.limit - 0,
                            limit: paging.limit - 0,
                        }).toArray((err, data) => {
                            printResult(err, dealdata, total, data, client)
                        })
                    }
                })
            } else {
                dealdata(err)
            }
        })
    },
    /*
        @selectone 查询符合条件的数据
        @dataname 表名称
        @selectlanguage 查询控制语句 格式{index:value,index,value};
        @dealdata 回调处理函数 格式function(result){};
    */
    select: function (dataname, selectlanguage, dealdata) {
        MongoClient.connect(dataconfig.dataurl, function (err, client) {
            if (!err) {
                console.log('Connect Success');
                const collection = client.db(dataconfig.dataname).collection(dataname);
                collection.find(selectlanguage).toArray(function (err, data) {
                    if (!err) {
                        dealdata(data);
                    }
                    client.close();
                });
            } else {
                dealdata(err)
            }
        })
    },
    /*
        @insert添加数据格式json格式
        @dataname 表名称
        @selectlanguage 查询控制语句
        @dealdata 回调函数处理函数有一个result参数
    */
    insert: function (dataname, insertlanguage, dealdata) {
        MongoClient.connect(dataconfig.dataurl, function (err, client) {
            if (!err) {
                console.log('Connect Success');
                const collection = client.db(dataconfig.dataname).collection(dataname);
                collection.insertMany(insertlanguage, function (err, data) {
                    if (!err) {
                        dealdata(data);
                    }
                    client.close();
                });
            } else {
                dealdata(err)
            }
        })
    },
    /*
        @update 修改数据的方法
        @updatelanguage 要修改数据的属性，json格式
        @updatecondition 要修改成什么，json格式
        @dataname 表名称
        @dealdata 回调函数处理函数有一个result参数
    */
    update: function (dataname, updatelanguage, updatecondition, dealdata) {
        MongoClient.connect(dataconfig.dataurl, function (err, client) {
            if (!err) {
                console.log('Connect Success');
                const collection = client.db(dataconfig.dataname).collection(dataname);
                collection.updateOne(updatelanguage, updatecondition, function (err, data) {
                    if (!err) {
                        dealdata(data);
                    }
                    client.close();
                });
            } else {
                dealdata(err)
            }
        })
    },
    /*
        @removeall 删除数据的方法
        @dataname 表名称
        @removelanguage 删除数据的条件
        @dealdata 回调函数处理函数有一个result参数
    */
    remove: function (dataname, removelanguage, dealdata) {
        MongoClient.connect(dataconfig.dataurl, function (err, client) {
            if (!err) {
                console.log('Connect Success');
                const collection = client.db(dataconfig.dataname).collection(dataname);
                collection.deleteOne(removelanguage, function (err, data) {
                    if (!err) {
                        dealdata(data);
                    }
                    client.close();
                });
            } else {
                dealdata(err)
            }
        })
    },
};

module.exports = DatabaseOperation;