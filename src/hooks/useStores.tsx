import React from 'react'
import storesContext from 'stores/storesContext'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStores = () => React.useContext(storesContext)

export default useStores
