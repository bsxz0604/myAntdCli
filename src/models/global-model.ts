import { userInfo } from '../services/user'
import { EffectsCommandMap } from 'dva'
import { StateProps } from './global-model-interface'

export default {
  namespace: 'gobalModel',
  state: {
    quality: [],
    regions: [],
    userInfo: {},
    isThree: false,
  } as StateProps,
  subscriptions: {
    setup({ dispatch }: any) {
      dispatch({
        type: 'init'
      })
    },
  },
  effects: {
    *init(_: any, { put }: EffectsCommandMap) {
      yield put({ type: 'fetchUserInfo' })
    },
    *fetchUserInfo(_: any, { call, put }: EffectsCommandMap) {
      const { result } = yield call(userInfo)
      yield put({ type: 'save', payload: {
        userInfo: result
      }})
    },
  },
  reducers: {
    save(state: StateProps, { payload }: any) {
      return { ...state, ...payload }
    },
  },
}
