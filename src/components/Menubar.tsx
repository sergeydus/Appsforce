import React, { useState } from 'react'
import { Menubar } from 'primereact/menubar'
import { observer } from 'mobx-react-lite'
import Input from './Input'
import CreateUserModal from './CreateUserModal'

interface MenuBarProps {
  onGlobalFilterChange: (e: any) => void
}

const MenuBar: React.FC<MenuBarProps> = ({ onGlobalFilterChange }) => {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false)
  const items = [
    {
      label: 'File',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'New User',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            setIsCreateUserModalOpen(true)
          }
        }
      ]
    }
  ]

  const end = <Input placeholder="Search" type="text" className="w-full" onChange={onGlobalFilterChange} />
  const onEditDialogClose = (): void => {
    setIsCreateUserModalOpen(false)
  }
  return (
    <>
      <CreateUserModal isOpen={isCreateUserModalOpen} title='Create User' onEditDialogClose={onEditDialogClose} />
      <Menubar model={items} end={end} />
    </>
  )
}

export default observer(MenuBar)
