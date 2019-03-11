import axios from 'axios'
import Qs from 'qs'
import Vue from 'vue'

export const createInstance = (baseURL) => {
  let instance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    paramsSerializer (params) {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        allowDots: true
      })
    }
  })
  return instance
}

export const procApiCb = (res, cb, errorCb) => {
  if (res.status === 200) {
    if (cb) {
      cb(res.data)
    }
  } else {
    if (errorCb) {
      errorCb(res.statusText, res.status, res.data)
    } else {
      console.error(res.data)
    }
  }
}

export const procApiError = (err, errorCb) => {
  if (errorCb) {
    errorCb(err['message'])
  } else {
    console.error(err)
  }
}

export const procApi = (api, cb, errorCb, requestType = 'get', params = {}) => {
  if (requestType === 'get') {
    Vue.prototype.$http[requestType](api, {
      params: params
    }).then(res =>
      procApiCb(res, cb, errorCb)
    ).catch(err =>
      procApiError(err, errorCb)
    )
  } else if (requestType === 'post') {
    Vue.prototype.$http[requestType](api,
      params
    ).then(res =>
      procApiCb(res, cb, errorCb)
    ).catch(err =>
      procApiError(err, errorCb)
    )
  }
}
