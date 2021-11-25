/**
 * Set storage
 *
 * @param name
 * @param content
 * @param maxAge
 */
 export const ls = {
    setStore: (name, content, maxAge = null) => {
        if (!global.window || !name) {
            return;
        }

        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }

        let storage = global.window.localStorage

        storage.setItem(name, content)
        if (maxAge && !isNaN(parseInt(maxAge))) {
            let timeout = parseInt(new Date().getTime() / 1000)
            storage.setItem(`${name}_expire`, timeout + maxAge)
        }
    },
    getStore: name => {
        if (!global.window || !name) {
            return;
        }

        let content = window.localStorage.getItem(name)
        let _expire = window.localStorage.getItem(`${name}_expire`)

        if (_expire) {
            let now = parseInt(new Date().getTime() / 1000)
            if (now > _expire) {
                return; s
            }
        }

        try {
            return JSON.parse(content)
        } catch (e) {
            return content
        }
    },
    clearStore: name => {
        if (!global.window || !name) {
            return;
        }

        window.localStorage.removeItem(name)
        window.localStorage.removeItem(`${name}_expire`)
    },
    clearAll: () => {
        if (!global.window) {
            return;
        }

        window.localStorage.clear()
    }
}


export const ss = {
    setItem(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value))
            return true
        } catch (error) {
            return false
        }
    },
    getItem(key) {
        try {
            return JSON.parse(sessionStorage.getItem(key))
        } catch (error) {
            return ''
        }
    }
}