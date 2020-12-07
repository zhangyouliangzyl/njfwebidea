// module.exports = {
//     devServer: {
//         // assetsSubDirectory: 'static',
//         // assetsPublicPath: '/',

//         publicPath: '/', //配置根目录，上传访问目的的时候用到，比如www.sina.com/china/,这个/china/就是要额外配置的，写成publicPath:'/china/'
//         outputDir: 'dist', //构建输出目录
//         assetsDir: "assets", //静态资源目录（js,css,image）
//         lintOnSave: false, //是否开启eslint检测,false不开启，有效值：true || false
//         productionSourceMap: false, //生成环境下面开启sourceMap支持断点调试

//         proxyTable: { //axios跨域处理
//             '/api': { //此处并非和url一致
//                 target: 'https://app.njf2016.com:8888/njf',
//                 changeOrigin: true, //允许跨域
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// }

module.exports = {

    // assetsDir: 'static',
    parallel: false,
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'dist', //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: false, //是否自动弹出浏览器页面
        host: "localhost", //表示启动的时候使用的域名，默认可以不写，则是使用localhost和本机IP
        port: '8081', // 设置端口号
        https: false, //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/api': {
                target: 'https://app.njf2016.com/njf', //API服务器的地址
                ws: true, //代理websockets
                changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
                pathRewrite: {
                    // '^/api5'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api5' 转接为 http://localhost:8081/api/
                    '^/api5': '/api',
                    //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': '',
                }
            }
        },
    }
}