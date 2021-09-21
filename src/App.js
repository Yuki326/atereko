import { initializeApp } from 'firebase/app'
import { useState } from 'react'

import { Entry } from './components/Entry'
import { Top } from './components/Top'
import { Login } from './components/Login'
import { CreateAccount } from './components/CreateAccount'
import { 
  apiKey, 
  authDomain, 
  fdbUrl, 
  projectId, 
  storageBucket, 
  messageSenderId, 
  appId 
} from './config.json'
import './App.css'

const firebaseConfig = {
  "apiKey": process.env.REACT_APP_API_KEY || apiKey,
  "authDomain": process.env.REACT_APP_AUTH_DOMAIN || authDomain,
  "databaseURL": process.env.REACT_APP_FDB_URL || fdbUrl,
  "projectId": process.env.REACT_APP_PROJECT_ID || projectId,
  "storageBucket": process.env.REACT_APP_STORAGE_BUCKET || storageBucket,
  "messagingSenderId": process.env.REACT_APP_MESSAGE_SENDER_ID || messageSenderId,
  "appId": process.env.REACT_APP_APP_ID || appId 
};

initializeApp(firebaseConfig)


const App = () => {
  const [route, setRoute] = useState('entry')
  let routePage = null


  switch (route) {
    case 'entry':
      routePage = <Entry setRoute={setRoute} />
      break
    case 'top':
      routePage = <Top setRoute={setRoute} />
      break
    case 'login':
      routePage = <Login setRoute={setRoute} />
      break
    case 'createAccount':
      routePage = <CreateAccount />
      break
    default:
      return <div>Loading...</div>
  }

  return routePage

}

export default App;
