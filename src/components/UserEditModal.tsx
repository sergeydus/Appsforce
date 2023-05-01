import React from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from './Input'
import useStores from 'hooks/useStores'
import styled from 'styled-components'
import Space from './Space'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const FormFooter = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: row;
  gap: 8px;
`

interface SubmitResult {
  firstName: string
  email: string
  country: string
  city: string
  street: string
  id: string
}

interface UserEditModalProps {
  userId: string | null
  onEditDialogClose: () => void
  onSubmit: (res: SubmitResult) => void
  title: string
}

const UserEditModal: React.FC<UserEditModalProps> = ({ userId, onEditDialogClose, onSubmit, title }) => {
  const { userStore } = useStores()
  const user = userStore.getUserById(userId)
  const isOpen = user != null
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName ?? '',
      email: user?.email ?? '',
      country: user?.location.country ?? '',
      city: user?.location.city ?? '',
      street: user?.location.street ?? ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, 'Must contain 3 or more characters')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      country: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      street: Yup.string().required('Required')
    }),
    onSubmit: values => {
      if (user != null) {
        onSubmit({ ...values, id: user.id })
      }
      onEditDialogClose()
    }
  })

  return (
    <Dialog header={title} visible={isOpen} style={{ width: '50vw' }} onHide={onEditDialogClose}>
      <StyledForm onSubmit={formik.handleSubmit} className='flex flex-column'>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          label='First Name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          error={formik.errors.firstName}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label='Email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Input
          id="city"
          name="city"
          type="city"
          label='city'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Input
          id="country"
          name="country"
          type="country"
          label='country'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
          error={formik.errors.country}
        />
        <Input
          id="street"
          name="street"
          type="street"
          label='Street'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.street}
          error={formik.errors.street}
        />
        <Space height={8}/>
        <FormFooter>
          <Button label="Discard" icon="pi pi-times" onClick={onEditDialogClose} className="p-button-text" />
          <Button type='submit' label="Save" icon="pi pi-check" disabled={!formik.isValid} autoFocus />
        </FormFooter>
      </StyledForm>
    </Dialog>
  )
}
export default observer(UserEditModal)
