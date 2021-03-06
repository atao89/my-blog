/**   
 * api接口统一管理
 */
import { get, post } from './http'

// export const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);

// 获取导航菜单
export const getMenus = p => get('/menus', p);

// 获取作者信息
export const getAuthorInfo = p => get('/author/info', p);

// 获取文章
export const getArticle = p => get('/article', p);

// 获取banner图
export const getBanner = p => get('/banner', p);

// 获取文章详情
export const getDetail = p => get('/detail', p);

// 获取tag分类
export const getTags = p => get('/tag', p);

// 获取归档列表
export const getArchive = p => get('/archive', p);

// 获取链接列表
export const getLinks = p => get('/link', p);

// 获取模糊搜索数据
export const getSearchData = p => get('/search', p);

/*
    组件中使用
    import { apiAddress } from '@/request/api'
    export default {
        name: 'Address',
        created () {
            this.onLoad();
        },
        methods: {
            // 获取数据
            onLoad() {
                // 调用api接口，并且提供了两个参数
                apiAddress({
                    type: 0,
                    sort: 1
                }).then(res => {
                    // 获取数据成功后的其他操作
                    ......
                })
            }
        }
    }
*/