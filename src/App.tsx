import { useState } from 'react'
import AppProvider from './context/appContext'

import { LoginForm } from './components/loginForm'
import { Aplicacion} from './components/aplicacion'


function App() {
  
  const [loginOk, setLoginOK] = useState(false)

  const handleLoginOk = () => {
    setLoginOK(true)
  }
  
  
  return(
  
      <AppProvider>
        <div className='h-screen flex flex-col justify-center items-center'>
          {!loginOk && <LoginForm  handleLoginOk={handleLoginOk}/> }
          {loginOk && <Aplicacion />}
        </div>

  
      </AppProvider>
  )
    

}

export default App
