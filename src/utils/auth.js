import Cookies from 'js-cookie'

const TokenKey = 'tokenHead'

export function getToken() {
  console.log("Cookie获取：[tokenHead: "+Cookies.get(TokenKey)+"]")
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log("Cookies设置：[tokenHead: "+token+"]")
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  console.log("Cookie获取：[tokenHead]")
  return Cookies.remove(TokenKey)
}
