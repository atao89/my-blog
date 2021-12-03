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
    }
}