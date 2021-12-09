import { getMenus } from "@/request/api";

export default {
    namespaced: true,
    // 状态
    state: {
        navList: [],
        keyword: sessionStorage.getItem('KEYWORD') || '',
    },
    // 使用store.commit来调用
    mutations: {
        getNavList(state, data) {
            state.navList = data
        },
        changeKeyword(state, data) {
            state.keyword = data
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
        changeKeyword({ commit }, data) {
            sessionStorage.setItem('KEYWORD', data);
            commit('changeKeyword', data);
        }
    }
}