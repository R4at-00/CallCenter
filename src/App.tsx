import { useState } from 'react'
import AppProvider from './context/appContext'

import { LoginForm } from './components/loginForm'
// import { Aplicacion} from './components/aplicacion'
import Incidents from './components/Incidents/incidents'


function App() {
  const [loginOk, setLoginOK] = useState(false)

  const handleClose = () => {
    setLoginOK(true)
  }
  
  return (
  
      <AppProvider>
        <div>
          {/* {!loginOk && <div className='h-screen flex flex-col justify-center items-center'><LoginForm  handleClose={handleClose}/> </div>}
          {loginOk && <div className='h-screen flex flex-col justify-start items-center pt-10'><Incidents /></div>} */}
          <div className='h-screen flex flex-col justify-start items-center pt-10'><Incidents /></div>
        </div>
      </AppProvider>
  )
  
}

export default App
