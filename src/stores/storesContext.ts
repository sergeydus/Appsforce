import React from 'react'
import RootStore from './rootStore'
const rootStore = new RootStore()
// TODO: add more stores in RootStore class, then add to context below
const storesContext = React.createContext({
  userStore: rootStore.userStore,
  toastStore: rootStore.toastStore
})

export default storesContext
