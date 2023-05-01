import React from 'react'
import './index.css'
// theme
import 'primereact/resources/themes/lara-light-indigo/theme.css'
// core
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import Home from './pages/Home'
import ToastComponent from 'components/ToastComponent'

const App: React.FC = () => {
  return (
    <>
      <ToastComponent />
      <Home />
    </>
  )
}

export default App
