import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken, removeToken } from '@/utils'
class LoginStore {
  token = getToken() || ''
  constructor() {
    // 响应式
    makeAutoObservable(this)
  }
  getToken = async (mobile, code) => {
    const result = await http({ url: '/authorizations', method: 'Post', data: { mobile, code } })
    this.token = result.data.token
    // 本地存储
    setToken(this.token)
  }
  clearToken = () => {
    // 清除token
    this.token = ''
    removeToken()
  }
}
export default LoginStore
