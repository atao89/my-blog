module.exports = {
    register: function (app, DatabaseOperation) {
        // blog查询address集合，支持分页
        // app.get("/address", (req, res) => {
        //     console.log(req.query);
        //     let { tagName, page, limit } = req.query;
        //     DatabaseOperation.find("address", { tagName }, { page, limit }, function (err, result) {
        //         if (err) {
        //             res.send(err);
        //             return
        //         }
        //         res.send(result)
        //     })
        // })

        // 首页菜单
        app.get('/menus', (req, res) => {
            DatabaseOperation.find('menu', {}, function (err, result) {
                // console.log("find查询结果：", err, result);
                if (err) {
                    res.send(err);
                    return
                }
                res.send(result)
            })
        })

        // 作者信息
        app.get('/author/info', (req, res) => {
            DatabaseOperation.find('info', {}, function (err, result) {
                // console.log("find查询结果：", err, result);
                if (err) {
                    res.send(err);
                    return
                }
                res.send(result)
            })
        })

        // 获取文章
        app.get('/article', (req, res) => {
            let { classify, page, limit } = req.query;
            let json = classify ? { classify } : {};
            DatabaseOperation.find('article', json, { page, limit }, function (err, result) {
                // console.log("find查询结果：", err, result);
                if (err) {
                    res.send(err);
                    return
                }
                res.send(result)
            })
        })

        // 获取banner图
        app.get('/banner', (req, res) => {
            DatabaseOperation.find('banner', {}, function (err, result) {
                // console.log("find查询结果：", err, result);
                if (err) {
                    res.send(err);
                    return
                }
                res.send(result)
            })
        })

        // 获取文章详情
        app.get('/detail', (req, res) => {
            let { id } = req.query;
            DatabaseOperation.find('article', { id }, function (err, result) {
                // console.log("find查询结果：", err, result);
                if (err) {
                    res.send(err);
                    return
                }
                res.send(result)
            })
        })

        // 获取tag分类
        app.get('/tag', (req, res) => {
            DatabaseOperation.find('tag', {}, function (err, result) {
                // console.log("find查询结果：", err, result);
                if (err) {
                    res.send(err);
                    return
                }
                res.send(result)
            })
        })

        // 获取归档数据（从文章表里去，此接口只返回指定字段）
        app.get('/archive', (req, res) => {
            let json = {};
            if (req.query.json) {
                json = req.query.json
            }

            let fields = {};
            if (req.query != {}) {
                for (var i in req.query) {
                    // console.log(i, req.query[i])
                    fields[i] = req.query[i] * 1
                }
            }

            DatabaseOperation.findSpecified('article', json, fields, function (err, result) {
                // console.log("find查询结果：", err, result);
                if (err) {
                    res.send(err);
                    return
                }
                const _data = result.data.length && result.data.map(item => {
                    return {
                        id: item.id,
                        public: item.public,
                        year: item.public.slice(0, 4),
                        title: item.title
                    }
                })
                result.data = _data;
                res.send(result)
            })
        })
    }
}