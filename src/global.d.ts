declare module 'dva' {

  import {
    Reducer,
    Action,
    ReducersMapObject,
    Dispatch,
    MiddlewareAPI,
    StoreEnhancer
  } from 'redux'

  export interface ReducerEnhancer {
    (reducer: Reducer<any>): void
  }
  
  export interface EffectsCommandMap {
    put: <A extends Action>(action: A) => any
    call: Function
    select: Function
    take: Function
    cancel: Function
    [key: string]: any
  }

  export type Effect = (action: Action, effects: EffectsCommandMap) => void

  export type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle'

  export type EffectWithType = [Effect, { type : EffectType }]

  export interface SubscriptionAPI {
    history: History
    dispatch: Dispatch<any>
  }

  export type Subscription = (api: SubscriptionAPI, done: Function) => void
  
  export interface EffectsMapObject {
    [key: string]: Effect | EffectWithType
  }

  export type ReducersMapObjectWithEnhancer = [ReducersMapObject, ReducerEnhancer]
  
  export interface SubscriptionsMapObject {
    [key: string]: Subscription
  }
  export interface Model {
    namespace: string,
    state?: any,
    reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer,
    effects?: EffectsMapObject,
    subscriptions?: SubscriptionsMapObject
  }
  export function connect(
    mapStateToProps?: Function,
    mapDispatchToProps?: Function,
    mergeProps?: Function,
    options?: Object
  ): Function
}

declare module 'dva/dynamic' {
  const dynamic: (resolve: (value?: PromiseLike<any>) => any) => any
  export default dynamic
}
