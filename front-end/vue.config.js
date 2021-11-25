/*
    process.env.NODE_ENV==='development' (开发环境)
    process.env.NODE_ENV==='production'  (生产环境)
*/
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
const vConsolePlugin = require('vconsole-webpack-plugin')

module.exports = {
    /*
        项目部署的基础路径:
        默认假设你的应用将会部署在域名的根部,如果你的应用部署在一个子路径下，你需要指定子路径。比如将你的应用部署在:
        https://www.foobar.com/my-app/, 那么将这个值改为 '/my-app/'

    */
    publicPath: '/', // vue-cli3.3+新版本使用,  baseUrl: '/',vue-cli3.3以下版本使用
    outputDir: `dist-${process.env.NODE_ENV}`, // 构建好的文件输出到哪里
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度  映射文件 打包时使用
    lintOnSave: false, // 保存时使用eslint-loader检查,值为true|false|'error',设为‘error’时检查出错误会编译失败
    pages: {
        index: {
            entry: 'src/main.js', // page 的入口
            template: 'public/index.html', // 模板来源
            filename: 'index.html', // 在 dist/index.html 的输出
            // 使用 title 选项时template中的title标签需要是<title><%= htmlWebpackPlugin.options.title %></title>
            title: '管理后台系统',
            cdn: {
                js: [
                    'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
                    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
                    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
                    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
                    'https://cdn.bootcss.com/element-ui/2.13.0/index.js',
                ],
                css: [
                    'https://cdn.bootcss.com/element-ui/2.13.0/theme-chalk/index.css'
                ]
            }
        }
    },

    // 调整内部的webpack配置：see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        // 删除懒加载模块的 prefetch preload，降低带宽压力(使用在移动端)
        config.plugins.delete('prefetch').delete('preload')

        // 压缩图片
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                // { bypassOnDebug: true },
                mozjpeg: { progressive: true, quality: 65 }, // Compress JPEG images
                optipng: { enabled: false }, // Compress PNG images
                pngquant: { quality: [0.65, 0.9], speed: 4 }, // Compress PNG images
                gifsicle: { interlaced: false }, // Compress SVG images
            })
            .end()

        config.resolve.alias
            .set('@', path.join(__dirname, './src'))
            .set('@views', path.join(__dirname, './src/views'))
            .set('@components', path.join(__dirname, './src/components'))
            .set('@utils', path.join(__dirname, './src/utils'))

        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },

    configureWebpack: config => {
        // 开发时也使用cdn是为了方便和版本统一 当然也可以本地时用node_modules，发布用cdn，忽略打包的第三方库
        config.externals = {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'element-ui': 'ELEMENT'
        }

        // 生产and测试环境
        let pluginsPro = [
            new CompressionPlugin({ // 文件开启Gzip，也可以通过服务端(如：nginx)
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'), // 匹配文件名
                threshold: 10240, // 对10K以上的数据进行压缩
                minRatio: 0.8,
                deleteOriginalAssets: false // 是否删除源文件
            })
        ];
        // 开发环境
        let pluginsDev = [
            new vConsolePlugin({
                filter: [], // 需要过滤的入口文件
                enable: false // 是否显示移动端调试工具VConsole
                // enable: process.env.NODE_ENV !== 'production'
            }),
        ];
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                // 压缩代码,去掉console 可以略微降低文件大小
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_debugger: true,
                            drop_console: true,  // 生产环境自动删除console
                        },
                        warnings: false,
                    },
                    sourceMap: false,
                    parallel: true // 使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
                })
            )
            // 为生产环境修改配置...
            config.plugins = [...config.plugins, ...pluginsPro];
        } else {
            // 为开发环境修改配置...
            config.plugins = [...config.plugins, ...pluginsDev];
        }

        // 拆包,分割代码,公共代码抽离 重复用到的包，在不同组件里面，要是超过40k或者设定的值就分离出来 用到时再加载
        config.optimization = {
            splitChunks: {
                cacheGroups: {  // 缓存组，可以定义多个
                    vendors: { //创建一个 自定义的vendor的chunk
                        name: `chunk-vendors`,
                        test: /[\\/]node_modules[\\/]/, // 匹配node_modules
                        priority: -10, // 理解为缓存的级别
                        chunks: 'initial'
                    },
                    common: {
                        name: `chunk-common`,
                        minChunks: 2,  // 分割之前必须共享模块的最小chunk数
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true // 是否复用存在的块
                    },
                    newsdk: {
                        name: 'new-sdk-config',
                        test: /new-sdk/,  // src 项目下的文件夹，对该文件夹
                        minChunks: 1,
                        minSize: 0,
                        chunks: 'async',
                        priority: 60,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    },

    // CSS 相关选项
    css: {
        /*
            将组件内部的css提取到一个单独的css文件（只用在生产环境），
            也可以是传递给 extract-text-webpack-plugin 的选项对象
            是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        */
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps? css样式映射，false将提高构建速度
        // css预设器配置项
        loaderOptions: {
            css: {}, // 这里的选项会传递给 css-loader
            // postcss: {} // 这里的选项会传递给 postcss-loader
            // sass: {
            //     data: '' //`@import "@/assets/scss/mixin.scss";`
            // }
        },
        requireModuleExtension: false // 启用 CSS modules for all css / pre-processor files.
    },

    // 是否为 Babel或TypeScript使用thread-loader。该选项在系统的CPU有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require('os').cpus().length > 1,

    // PWA 插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // webpack-dev-server 相关配置
    devServer: {
        host: '0.0.0.0', // 允许外部ip访问
        /*
            App running at:
            host: "0.0.0.0" =>
            - Local:   http://localhost:8080/
            - Network: http://192.168.1.102:8080/

            host: "127.0.0.1"=>
            App running at:
            - Local:   http://127.0.0.1:8080/
            - Network: http://127.0.0.1:8080/
        */
        port: 4000, // 端口号
        https: false, // true 配置之后可使用生成 https://localhost:8080/
        hotOnly: false,// 热更新（webpack已实现了，这里false即可）
        open: true, // 启动完自动打开浏览器
        overlay: { // 让浏览器 overlay 同时显示警告和错误,错误、警告在页面弹出
            warnings: false,
            errors: true
        },
        proxy: {
            // 告诉node, 我接口只要是’/api’开头的才用代理
            // 对http://localhost:5000/api/users 的请求会将请求代理到 http://localhost:5001/api/users
            "/api": {
                target: process.env.VUE_APP_URL, // 代理地址，这里设置的地址会代替axios中设置的baseURL
                ws: true, // 是否使用websockit
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                // pathRewrite的作用是因为正确的接口路径是没有/api的，所以需要用'^/api': '/'，表示请求接口时去掉api
                // pathRewrite: { '^/api': '' }  // 重写之后url为 http://192.168.1.16:8085/xxxx
            }
        },
        // before: app => {},
    },

    // 第三方插件配置
    pluginOptions: {
        // 'style-resources-loader': { // https://github.com/yenshih/style-resources-loader
        //     preProcessor: 'scss', // 声明类型
        //     'patterns': [
        //         path.resolve(__dirname, './src/assets/scss/_common.scss'),
        //     ],
        //     injector: 'append'
        // }
    }

};