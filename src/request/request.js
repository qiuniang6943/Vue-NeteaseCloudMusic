import axios from 'axios'
// axios.defaults.withCredentials = true
const request = axios.create({
    baseURL:'http://wangyinglong.cn:3000',
    // baseURL:'http://localhost:3000',
    // instance.defaults.withCredentials = true,
    // withCredentials: true
})
// request.defaults.withCredentials = true
export default request