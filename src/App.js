import { initializeApp } from 'firebase/app'
import { useState } from 'react'

import { Entry } from './components/Entry'
import { Top } from './components/Top'
import { CreateMockAccount } from './components/CreateMockAccount'
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
  const [accounts, setAccounts] = useState(null)
  let routePage = null


  switch (route) {
    case 'entry':
      routePage = <Entry setAccounts={setAccounts} setRoute={setRoute} />
      break
    case 'top':
      routePage = <Top acts={accounts} setRoute={setRoute} />
      break
    case 'createMockAccount':
      routePage = <CreateMockAccount />
      break
    default:
      return <div>Loading...</div>
  }

  return routePage

}

export default App;
