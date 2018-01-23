import request from '../utils/request'
export async function userInfo () {
  return request(`/rest/auth/user/me`, {
    method: 'get',
  })
}
