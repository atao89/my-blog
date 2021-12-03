// 在http.js中引入axios
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
import { Message } from 'element-ui'
// import store from '@/store';

axios.defaults.baseURL = process.env.VUE_APP_URL;

axios.defaults.timeout = 30000; // 设置请求超时

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // 设置请求头

// 请求拦截器 比如，有些请求是需要用户登录之后才能访问的
axios.interceptors.request.use(config => {
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    return config;
}, error => {
    return Promise.error(error);
})

/*
    token，一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地，然后用户每次在进入页面的
    时候（即在main.js中），会首先从本地存储中读取token，如果token存在说明用户已经登陆过，则更新vuex中的token状态。
    然后，在每次请求接口的时候，都会在请求的header中携带token，后台人员就可以根据你携带的token来判断你的登录是否
    过期，如果没有携带，则说明没有登录过。这时候或许有些小伙伴会有疑问了，就是每个请求都携带token，那么要是一个
    页面不需要用户登录就可以访问的怎么办呢？其实，你前端的请求可以携带token，但是后台可以选择不接收啊！
*/

// 响应拦截器
axios.interceptors.response.use(response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    if (response.status === 200) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response.data);
    }
}, error => {
    if (error.response.status) {
        switch (error.response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。                
            case 401:
                Message({
                    message: '未登录',
                    duration: 3000,
                    type: 'error'
                });
                // router.replace({
                //     path: '/login',
                //     query: {
                //         redirect: router.currentRoute.fullPath
                //     }
                // });
                break;

            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面                
            case 403:
                Message({
                    message: '登录过期，请重新登录',
                    duration: 3000,
                    type: 'error'
                });
                // // 清除token
                // localStorage.removeItem('token');
                // store.commit('loginSuccess', null);
                // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                // setTimeout(() => {
                //     router.replace({
                //         path: '/login',
                //         query: {
                //             redirect: router.currentRoute.fullPath
                //         }
                //     });
                // }, 1000);
                break;

            // 404请求不存在
            case 404:
                Message({
                    message: '网络请求不存在',
                    duration: 3000,
                    type: 'error'
                });
                break;
            // 其他错误，直接抛出错误提示
            default:
                Message({
                    message: error.response.data.message,
                    duration: 3000,
                    type: 'error'
                });
        }
        return Promise.reject(error.response);
    }
})


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}
