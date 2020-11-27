import request from '@/utils/request'
import qs from 'qs'

export function login (data) {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

// 获取菜单列表和资源列表权限
export function getUserPermissions () {
  return request({
    method: 'GET',
    url: '/boss/permission/getUserPermissions'
  })
}

export function getInfo () {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

export function refreshToken (params) {
  return request({
    method: 'GET',
    url: '/front/user/refresh_token',
    params
  })
}

export function getUserPages (data) {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
