import { useState } from 'react'
import AppProvider from './context/appContext'

import { LoginForm } from './components/loginForm'
import Incidents from './components/Incidents/incidents'

function App() {
  const [loginOk, setLoginOk] = useState<boolean>(false);

  const handleClose = () => {
    setLoginOk(true)
  }

  return (
    <AppProvider>
      <div className=''>
        {/* {!loginOk && <div className='h-screen flex flex-col justify-center items-center'><LoginForm  handleClose={handleClose} /> </div>}
        {loginOk && <div className='h-screen flex flex-col justify-start items-center'><Incidents/></div>} */}
        <div className='h-screen flex flex-col justify-start items-center'><Incidents /></div>
      </div>
    </AppProvider>
  )

}

export default App
