import axios from 'axios'
import { Message } from 'element-ui'

const request = axios.create({})

request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) { // 请求响应成功
  // 自定义错误状态码，错误处理这里
  if (response.data.code === '000000' || response.data.state === 1) { // 业务中一定是成功的
    return response
  } else { // 参数错误
    Message.error(response.data.message || '错误')
    return Promise.reject(new Error(response.data.message || '错误'))
  }
  // return response
}, async function (error) { 
  if (error.response) { // 请求发出去收到响应，状态码超出2xx,比如400， 401（未认证,token无效，过期）， 403（禁止访问，没有权限）， 404（不能找到资源）， 500
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) { // token问题
      Message.error('token不可用')
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else {
    Message.error(`请求失败，${error.message}`)
  }
  return Promise.reject(error)
})

export default request
