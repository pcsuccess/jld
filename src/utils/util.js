// 获取token
export const getToken = (page, cb) => {
  let token = window.localStorage.getItem(page + '-token')
  if (token) {
    cb(token)
  } else {
    cb()
  }
}
// 获取p、c
export const getPAndC = (cb) => {
  let pandc = window.localStorage.getItem('pandc')
  if (pandc) {
    pandc = JSON.parse(pandc)
    cb(pandc)
  } else {
    cb()
  }
}
