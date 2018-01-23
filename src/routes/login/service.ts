import { request, config } from '../../utils/index'
import { stringify } from 'qs'

export function login (params: any) {
  return request(`/rest/login`, {
    method: 'post',
    headers: config.FormHeaders,
    data: stringify(params)
  })
}

export function logout () {
  return request(`/rest/logout`, {
    method: 'post',
  })
}
