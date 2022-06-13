import { makeAutoObservable } from 'mobx'
import { http } from '@/utils/http.js'
class Channelstore {
  constructor() {
    makeAutoObservable(this)
  }
  channelList = []
  loadChannelList = async () => {
    const result = await http.get('/channels')
    this.channelList = result.data.channels
  }
}

export default Channelstore
