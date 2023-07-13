import {makeAutoObservable, runInAction} from 'mobx'
import { http } from '@/utils/http.js'

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  geruserinfo = async () => {
    const result = await http.get('/user/profile')
    runInAction(()=>{
      this.userInfo = result.data
    })

  }
}

export default UserStore
