export default function arrayToHttpString(key,array) {
  if( !key || !array || !array.length ){
    return null
  }
  let result = ''
  array.forEach((item) =>{
    result = result +`${key}=${item.toString()}&`
  }, this)
  return result
}