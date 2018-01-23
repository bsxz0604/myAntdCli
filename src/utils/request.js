/* global window */
import axios from 'axios'
import * as config from './config'
import qs from 'qs'
import { message } from 'antd'

let timer = null;

async function checkStatus(response, method = 'GET', shouldClosMessage) {
  if (response.status == 200 ) {
    if (method.toUpperCase() !== 'GET' || shouldClosMessage) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        message.success('Operation is successful')
      }, 400)
    }
    return response;
  }
  const error = new Error(response.statusText);
  error.status = response.status;
  error.text = await response.text();
  error['content-type'] = response.headers.get('content-type');
  error.url = await response.url;
  error.response = response;
  throw error;
}

function checkDataStatus (data) {
  if (data.success === false) {
    if (timer) clearTimeout(timer)
    throw {
      status: 'fail',
      text: data.errorMsg
    }
  }
}

export default function request(url, options, shouldClosMessage) {
  const headers = options && options.headers || {}
  const METHOD = options && options.method || 'GET'
  return axios({
    url,
    method: METHOD,
    headers:{
      ...headers
    },
    ...options
  })
  .then((res) =>
    checkStatus(res, METHOD, shouldClosMessage)
  )
  .then(({ data }) => {
    checkDataStatus(data)
    return data
  })
  .catch(err => {
    const errorInfo = err.response
    return Promise.reject( errorInfo )
  });
}