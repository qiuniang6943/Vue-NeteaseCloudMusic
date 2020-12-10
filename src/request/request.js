import axios from 'axios'
const request = axios.create({
    baseURL:'http://wangyinglong.cn:3000'
    // withCredentials: true
})
export default request