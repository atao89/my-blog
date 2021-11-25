/**   
 * api接口统一管理
 */
import { get, post } from './http'

export const getMenus = p => get('/menus', p);
export const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);

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