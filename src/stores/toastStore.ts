
import { makeAutoObservable } from 'mobx'
import { type ToastMessage } from 'primereact/toast'
import type RootStore from './rootStore'

export default class ToastStore {
  constructor (rootStore: RootStore) {
    makeAutoObservable(this)
    this._latestToast = null
    this.rootStore = rootStore
  }

  private readonly rootStore: RootStore
  private _latestToast: ToastMessage | null
  public get latestToast (): ToastMessage | null {
    return this._latestToast
  }

  public set latestToast (toast: ToastMessage | null) {
    this._latestToast = toast
  }
}
