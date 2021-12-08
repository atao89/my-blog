// 引入mongodb
const MongoClient = require('mongodb').MongoClient;

// 引入MongoDB ObjectID模块
// const ObjectID = MongoDB.ObjectID;

// let _id = new ObjectID("5bcae50ed1f2c2f5e4e1a76a");  // 通过id查询

const dataconfig = {
    dataurl: "mongodb://127.0.0.1:27017",  // 服务器地址
    dataname: 'blog'  // 数据库
}

const MongoConnect = function (callBack) {
    MongoClient.connect(dataconfig.dataurl, function (err, client) {
        if (!err) {
            console.log('Connect Success');
            const db = client.db(dataconfig.dataname);
            callBack(db, function () {
                client.close()
            })
        } else {
            throw new Error(err);
        }
    })
}

const DatabaseOperation = {
    /*
        @insert添加多条数据格式json格式
        @collectionName 集合名称
        @selectlanguage 查询控制语句
        @callBack 回调函数处理函数有一个result参数
    */
    insert: function (collectionName, json, callBack) {
        MongoConnect(function (db, cb) {
            db.collection(collectionName).insertMany(json, function (err, result) {
                if (err) {
                    callBack({
                        code: '0',
                        message: err,
                        total: 0,
                        data: []
                    })
                } else {
                    callBack(null, {
                        code: '1',
                        message: '操作成功',
                        total: collectionCount,
                        data: result
                    })
                }
                cb()
            });
        })
    },


    /*
        @removeall 删除一条数据的方法
        @collectionName 集合名称
        @removelanguage 删除数据的条件
        @callBack 回调函数处理函数有一个result参数
    */
    remove: function (collectionName, removelanguage, callBack) {
        MongoConnect(function (db, cb) {
            db.collection(collectionName).deleteOne(removelanguage, function (err, data) {
                if (err) {
                    callBack({
                        code: '0',
                        message: err,
                        total: 0,
                        data: []
                    })
                } else {
                    callBack(null, {
                        code: '1',
                        message: '操作成功',
                        total: collectionCount,
                        data: result
                    })
                }
                cb()
            });
        })
    },


    /*
        @update 修改一条数据的方法
        @updatelanguage 要修改数据的属性，json格式
        @updatecondition 要修改成什么，json格式
        @collectionName 集合名称
        @callBack 回调函数处理函数有一个result参数
    */
    update: function (collectionName, updatelanguage, updatecondition, callBack) {
        MongoConnect(function (db, cb) {
            db.collection(collectionName).updateOne(updatelanguage, updatecondition, function (err, data) {
                if (err) {
                    callBack({
                        code: '0',
                        message: err,
                        total: 0,
                        data: []
                    })
                } else {
                    callBack(null, {
                        code: '1',
                        message: '操作成功',
                        total: collectionCount,
                        data: result
                    })
                }
                cb()
            });
        })
    },

    /*
        @find 查询数据
        @collectionName 集合名称
        @C、D 分页 如果传入的参数长度是3，则C为回调函数，如果传入的参数长度是4,则C为分页参数、D为回调函数
        @callBack 回调处理函数 格式function(result){};
    */
    find: function (collectionName, json, C, D) {
        if (arguments.length == 3) {
            var page = 0;
            var limit = 0;
            var callBack = C;
        } else if (arguments.length == 4) {
            var page = C.page || 0;
            var limit = C.limit || 0;
            var callBack = D;
        } else {
            throw new Error("find参数必须是三个或四个");
        }

        MongoConnect(function (db, cb) {
            let collectionCount = 0;
            db.collection(collectionName).count((err, num) => {
                if (!err) {
                    collectionCount = num;
                }
            })

            db.collection(collectionName).find(json, {
                skip: (page - 1) * limit - 0,
                limit: limit - 0,
            }).toArray((err, result) => {
                if (err) {
                    callBack({
                        code: '0',
                        message: err,
                        total: 0,
                        data: []
                    })
                } else {
                    let resCount = result.length;
                    let total = page == 1 && resCount < limit ? resCount : collectionCount

                    callBack(null, {
                        code: '1',
                        message: '操作成功',
                        total,
                        data: result
                    })
                }
                cb()
            })
        })
    },

    /*
        @findSpecified 查询并返回指定字段
    */
    findSpecified: function (collectionName, json, fields, callBack) {
        MongoConnect(function (db, cb) {
            // console.log(json, fields);
            db.collection(collectionName).find(json, fields).toArray((err, result) => {
                if (err) {
                    callBack({
                        code: '0',
                        message: err,
                        total: 0,
                        data: []
                    })
                } else {
                    callBack(null, {
                        code: '1',
                        message: '操作成功',
                        total: result.length,
                        data: result
                    })
                }
                cb()
            })
        })
    },

    /*
        @findFuzzy 模糊查找
    */
    findFuzzy: function (collectionName, keyword, C, D) {
        if (arguments.length == 3) {
            var page = 0;
            var limit = 0;
            var callBack = C;
        } else if (arguments.length == 4) {
            var page = C.page || 0;
            var limit = C.limit || 0;
            var callBack = D;
        } else {
            throw new Error("find参数必须是三个或四个");
        }

        MongoConnect(function (db, cb) {
            let collectionCount = 0;
            db.collection(collectionName).count((err, num) => {
                if (!err) {
                    collectionCount = num;
                }
            })

            var str = ".*" + keyword + ".*$"
            var reg = new RegExp(str)
            db.collection(collectionName).find({ "title": { $regex: reg, $options: 'i' } }, {
                skip: (page - 1) * limit - 0,
                limit: limit - 0,
            }).toArray((err, result) => {
                if (err) {
                    callBack({
                        code: '0',
                        message: err,
                        total: 0,
                        data: []
                    })
                } else {
                    let resCount = result.length;
                    let total = page == 1 && resCount < limit ? resCount : collectionCount

                    callBack(null, {
                        code: '1',
                        message: '操作成功',
                        total,
                        data: result
                    })
                }
                cb()
            })
        })
    },
};

module.exports = DatabaseOperation;