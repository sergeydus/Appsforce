import ToastStore from './toastStore'
import UserStore from './userStore'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class RootStore {
  userStore: UserStore
  toastStore: ToastStore
  constructor () {
    this.userStore = new UserStore(this)
    this.toastStore = new ToastStore(this)
  }
}
