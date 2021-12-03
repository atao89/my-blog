import { getMenus } from "@/request/api";

export default {
    namespaced: true,
    // 状态
    state: {
        navList: [],
    },
    // 使用store.commit来调用
    mutations: {
        getNavList(state, data) {
            state.navList = data
        }
    },
    // 使用用store.dispatch来调用
    actions: {
        getNavList({ commit }) {
            return new Promise((resolve, reject) => {
                getMenus().then(res => {
                    if (res.code == '1') {
                        commit('getNavList', res.data);
                        resolve()
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}