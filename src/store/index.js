import React from 'react'
import LoginStore from './login.Store.js'
import UserStore from './user.Store'
import Channelstore from './channel.store.js'
class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new Channelstore()
  }
}
const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }
