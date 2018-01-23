// import { login, logout } from './service'
import * as routerRedux from 'react-router-redux'

export default {
  namespace: 'login',
  state: {
    userInfo: '',
  },
  effects: {
    *loginAction({ _ }: any, { put }: any) {
      // const data = yield call(login, payload)
      const islogin = true
      if (islogin) {
        // yield put( { type: 'loginSuccess', payload: data.result })
        yield put(routerRedux.push('/dashboard'))
      }
    },
    *logoutAction( _: any, { put }: any) {
      // const data = yield call(logout)
      const islogout = true
      if (islogout) {
        yield put(routerRedux.push('/login'))
      }
    },
  },
  reducers: {
    loginSuccess( state: any, { payload }: any ) {
      return {
        ...state,
        userInfo: payload,
      }
    },
  },
}
