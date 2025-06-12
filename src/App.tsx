import { useContext, useState } from 'react'
import AppProvider, { AppContext } from './context/appContext'

import { LoginForm } from './components/loginForm'
// import { Aplicacion} from './components/aplicacion'
import Incidents from './components/Incidents/incidents'
import ReplyIncident from './components/Incidents/replyIncident'
import type { AppContextType, incidencia } from './@types/app'


function App() {
  const [loginOk, setLoginOK] = useState(false)

  const handleClose = () => {
    setLoginOK(true)
  }

  return (
    <AppProvider>
      <div className=''>
        {/* {!loginOk && <div className='h-screen flex flex-col justify-center items-center'><LoginForm handleClose={handleClose} /> </div>}
        {loginOk && <div className='h-screen flex flex-col justify-start items-center'><Incidents /></div>} */}
        <div className='h-screen flex flex-col justify-start items-center'><Incidents /></div>
      </div>
    </AppProvider>
  )

}

export default App
