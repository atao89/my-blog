module.exports = {
    register: function (app, DatabaseOperation) {
        // test查询address集合，支持分页
        app.get('/api/user', (req, res) => {
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
    }
}