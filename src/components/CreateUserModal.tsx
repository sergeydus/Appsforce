import React, { useEffect } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { observer } from 'mobx-react-lite'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from './Input'
import styled from 'styled-components'
import Space from './Space'
import useStores from 'hooks/useStores'
import { FileUpload } from 'primereact/fileupload'

const StyledDialog = styled(Dialog)`
  width: 50vw;
  @media screen and (max-width: 960px) {
    width: 100vw
  }
`

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

interface UserEditModalProps {
  onEditDialogClose: () => void
  title: string
  isOpen: boolean
}

const CreateUserModal: React.FC<UserEditModalProps> = ({ onEditDialogClose, title, isOpen }) => {
  const { userStore } = useStores()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      picture: '',
      email: '',
      country: '',
      city: '',
      street: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, 'Must contain 3 or more characters')
        .required('Required'),
      lastName: Yup.string()
        .min(3, 'Must contain 3 or more characters')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      country: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      street: Yup.string().required('Required')
      // picture: Yup.string().required('Required')
    }),
    onSubmit: values => {
      const { city, country, email, firstName, lastName, picture, street } = values
      userStore.createUser({
        email,
        firstName,
        lastName,
        location: {
          city,
          country,
          street
        },
        picture,
        id: Math.floor(Math.random() * 10000).toString()
      })
      onEditDialogClose()
    }
  })

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm()
    }
  }, [isOpen])

  return (
    <StyledDialog header={title} visible={isOpen} onHide={onEditDialogClose}>
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
          touched={formik.touched.firstName}
        />
        <Input
          id="lastName"
          name="lastName"
          type="text"
          label='Last Name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
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
          touched={formik.touched.email}
        />
        <label htmlFor='picture'>Picture</label>
        <FileUpload
          id="picture"
          name="picture"
          accept='image/*'
          mode='basic'
          onSelect={(e) => {
            formik.setFieldValue('picture', URL.createObjectURL(e.files[0]), false).catch((er) => { console.error(er) })
          }}
        />
        <Input
          id="city"
          name="city"
          type="city"
          label='City'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
          error={formik.errors.city}
          touched={formik.touched.city}
        />
        <Input
          id="country"
          name="country"
          type="country"
          label='Country'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
          error={formik.errors.country}
          touched={formik.touched.country}
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
          touched={formik.touched.street}
        />
        <Space height={8} />
        <FormFooter>
          <Button label="Discard" icon="pi pi-times" onClick={onEditDialogClose} className="p-button-text" />
          <Button type='submit' label="Save" icon="pi pi-check" disabled={!formik.isValid} autoFocus />
        </FormFooter>
      </StyledForm>
    </StyledDialog>
  )
}
export default observer(CreateUserModal)
