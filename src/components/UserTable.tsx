/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useRef, useState } from 'react'
import useStores from 'hooks/useStores'
import { observer } from 'mobx-react-lite'
import UserEditModal from './UserEditModal'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { type Location, type User } from 'types/types'
import { confirmDialog } from 'primereact/confirmdialog'
import { ContextMenu } from 'primereact/contextmenu'
import MenuBar from './Menubar'

const imageTemplate = (user: User): JSX.Element => {
  return <img src={user.picture} alt={'picture'} className="w-4rem shadow-2 border-round" />
}

const UserTable: React.FC = () => {
  const { userStore } = useStores()
  const [edittingUserId, setEdittingUserId] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [globalFilter, setGlobalFilter] = useState('')
  console.log('selectedUser', selectedUser)
  const onGlobalFilterChange = (e: any): void => {
    setGlobalFilter(e.target.value)
  }

  const contextMenu = useRef<ContextMenu>(null)
  const onPressEdit = useCallback((userId: string) => {
    setEdittingUserId(userId)
  }, [])

  const onEditDialogClose = useCallback(() => {
    setEdittingUserId(null)
  }, [])

  const menuModel = useMemo(() => [
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-search',
      command: (e: any) => {
        if (selectedUser != null) {
          onPressEdit(selectedUser.id)
        }
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-fw pi-times',
      command: () => {
        if (selectedUser != null) {
          confirmDialog({
            message: 'Are you sure you want to delete this user?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              userStore.removeUser(selectedUser.id)
            },
            reject: () => { }
          })
        }
      }
    }
  ], [selectedUser])
  return (
    <>
      <UserEditModal userId={edittingUserId} onEditDialogClose={onEditDialogClose} title={'Edit User'} onSubmit={(res) => {
        userStore.updateUser(res)
      }} />
      <ContextMenu model={menuModel} ref={contextMenu} onHide={() => { setSelectedUser(null) }} />
      <DataTable
        responsiveLayout='stack'
        value={userStore.users}
        onContextMenu={(e) => contextMenu?.current?.show(e.originalEvent)}
        contextMenuSelection={selectedUser ?? undefined}
        onContextMenuSelectionChange={(e) => { setSelectedUser(e.value as unknown as User) }}
        globalFilter={globalFilter}
        header={<MenuBar onGlobalFilterChange={onGlobalFilterChange}/>}
      >
        <Column field="picture.medium" header="Picture" body={imageTemplate}></Column>
        <Column field="firstName" header="First Name"></Column>
        <Column field="lastName" header="Last Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="location.country" header="Country"></Column>
        <Column field="location.city" header="City"></Column>
        <Column field="location.street" header="Street"></Column>
      </DataTable>
    </>
  )
}

export default observer(UserTable)
