module.exports = {
    register: function (app, DatabaseOperation) {
        // test查询address集合，支持分页
        app.get('/address', (req, res) => {
            let { page, limit } = req.query;
            DatabaseOperation.selectall('address', { page, limit }, function (result) {
                // console.log("selectall查询结果：", result);
                res.send({
                    data: result
                })
            })
        })

        // 首页菜单
        app.get('/menus', (req, res) => {
            DatabaseOperation.selectall('menu', {}, function (result) {
                res.send({
                    data: result
                })
            })
        })

        // 作者信息
        app.get('/author/info', (req, res) => {
            DatabaseOperation.selectall('info', {}, function (result) {
                res.send({
                    data: result
                })
            })
        })

        // 获取文章
        app.get('/article', (req, res) => {
            let { page, limit, classify } = req.query;
            // let reqParams = classify != undefined ? { page, limit, classify: '' } : { page, limit }
            DatabaseOperation.selectall('article', { page, limit, classify }, function (result) {
                // console.log("selectall查询结果：", result);
                res.send({
                    data: result
                })
            })
        })

        // 获取banner图
        app.get('/banner', (req, res) => {
            DatabaseOperation.selectall('banner', {}, function (result) {
                // console.log("selectall查询结果：", result);
                res.send({
                    data: result
                })
            })
        })

        // 获取文章详情
        app.get('/detail', (req, res) => {
            let { id } = req.query;
            DatabaseOperation.select('article', { id }, function (result) {
                // console.log("selectall查询结果：", result);
                res.send({
                    data: result
                })
            })
        })

        // 获取tag分类
        app.get('/tag', (req, res) => {
            DatabaseOperation.selectall('tag', {}, function (result) {
                // console.log("selectall查询结果：", result);
                res.send({
                    data: result
                })
            })
        })
    }
}