import React, { useEffect, useRef } from 'react'
import { Toast } from 'primereact/toast'
import useStores from 'hooks/useStores'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { observer } from 'mobx-react-lite'

const ToastComponent: React.FC = () => {
  const toast = useRef<Toast>(null)
  const { toastStore } = useStores()

  useEffect(() => {
    if (toastStore.latestToast != null) {
      toast.current?.show(toastStore.latestToast)
    }
  }, [toastStore.latestToast])

  return (
    <>
      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  )
}

export default observer(ToastComponent)
