import request from './request'
import * as config from './config'
import { color } from './theme'

export function toMusicalList(list) {
  if (list.length < 1) return []
  return list.map((x) =>{
    return toOPSMusical(x)
  })
}

export function toOPSMusical(musical) {
  if (!musical) return {};
  if (musical.hasOwnProperty('musical')) {
    return { ...musical , ...musical.musical, musical: null }
  }else if(musical.hasOwnProperty('data')){
    return { ...musical, ...musical.data, censorSource: musical.source, data: null }
  } else {
    return musical
  }
}

export { default as request } from './request'
export { color } from './theme'
import * as _ from './config'
export const config = _
