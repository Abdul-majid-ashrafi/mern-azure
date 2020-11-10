export const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const removeStorage = (key) => {
    return localStorage.removeItem(key);
}