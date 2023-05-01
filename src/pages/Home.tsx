import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useStores from 'hooks/useStores'
import { ProgressSpinner } from 'primereact/progressspinner'
import UserTable from 'components/UserTable'

const Page = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`

const StyledSpinner = styled(ProgressSpinner)`
  margin: auto;
`

const Home: React.FC = () => {
  const { userStore } = useStores()
  const [isFetchingUsers, setIsFetchingUsers] = useState(true)
  const isLoading = isFetchingUsers

  useEffect(() => {
    userStore.getUsers().finally(() => {
      setIsFetchingUsers(false)
    })
  }, [])

  if (isLoading) {
    return (
      <Page>
        <StyledSpinner />
      </Page>
    )
  }
  return (
    <Page>
      <UserTable/>
    </Page>
  )
}

export default Home
