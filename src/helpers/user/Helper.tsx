export const getUser = () => {
    const token = localStorage.getItem('token') !== null;
    const value = token ? true : false
    return value
}
