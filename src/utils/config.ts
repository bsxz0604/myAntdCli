
export const JSONHeaders = {
  'Content-Type': 'application/json'
}
export const FormHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
export const UploadHeaders = {
  'Content-Type': 'multipart/form-data'
}
export const dateFormat = 'YYYY/MM/DD'
export const timeFormatZ = 'YYYY.MM.DD 00:00:00'
export const timeFormat = 'HH:mm'
export const format = 'YYYY/MM/DD HH:mm'
export const asterisk = (text: any, type: any, num = 3) => {
  if (!text) {
    return
  }

  if (type === 'phone') {
    const lastIndex = Math.floor(text.length / 2)
    return text.substr(0, lastIndex) + new Array(num + 1).join('*') + text.substr(lastIndex + num)
  } else if (type === 'email') {
    const index = text.indexOf('@')
    return text.substr(0, 3) + text.substring(3, index).replace(/./g, '*') + text.substr(index)
  }

  return ''
}
export const PAGE_SIZE: number = 50
