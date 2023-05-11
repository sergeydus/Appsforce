
import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { type Result, type User } from 'types/types'
import type RootStore from './rootStore'
type id = string
export default class UserStore {
  constructor (rootStore: RootStore) {
    makeAutoObservable(this)
    this._users = new Map()
    this.rootStore = rootStore
  }

  private readonly rootStore: RootStore
  private _users: Map<id, User>
  public get users (): User[] {
    return Array.from(this._users.values())
  }

  public set users (value: User[]) {
    const userMap = new Map<id, User>()
    value.forEach(usr => {
      userMap.set(usr.id, usr)
    })
    this._users = userMap
  }

  public getUsers = async (): Promise<void> => {
    const res = await axios.get<Result>('https://randomuser.me/api/?results=10')
    this.users = res.data.results.filter((usr) => usr.id.value != null).map(usr => ({
      firstName: usr.name.first,
      lastName: usr.name.last,
      email: usr.email,
      location: {
        city: usr.location.city,
        country: usr.location.country,
        street: `${usr.location.street.name ?? ''} ${usr.location.street.number ?? ''}`.trim()
      },
      id: usr.id.value as string,
      picture: usr.picture.medium
    })) as User[]
  }

  public getUserById = (userId: string | undefined | null): User | undefined => {
    if (userId != null) {
      return this._users.get(userId)
    }
    return undefined
  }

  removeUser = (userId: string): void => {
    this._users.delete(userId)
    this.rootStore.toastStore.latestToast = { severity: 'info', summary: 'Deleted', detail: `you have deleted User: ${userId}`, life: 3000 }
  }

  updateUser = ({ firstName, email, country, city, street, id }:
  {
    id: string
    firstName: string
    email: string
    country: string
    city: string
    street: string
  }): void => {
    const user = this._users.get(id)
    if (user != null) {
      user.email = email
      user.firstName = firstName
      user.location.country = country
      user.location.city = city
      user.location.street = street
    }
    this.rootStore.toastStore.latestToast = { severity: 'info', summary: 'Updated', detail: 'User succesfully updated', life: 3000 }
  }

  createUser = (user: User): void => {
    this._users.set(user.id, user)
  }

  generateEmptyUser = (): User => {
    return ({
      email: '',
      firstName: '',
      id: Math.floor(Math.random() * 10000).toString(),
      lastName: '',
      location: {
        city: '',
        country: '',
        street: ''
      },
      picture: ''
    })
  }
}
