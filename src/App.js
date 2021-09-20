import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'

import { Top } from './components/Top'
import { Login } from './components/Login'
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
console.log('config', firebaseConfig)

initializeApp(firebaseConfig)

const formatImgs = (imgs) => {
  const formatedImgs = Object.keys(imgs).map(key => imgs[key])
  return formatedImgs
}

const App = () => {
  const auth = getAuth()
  const db = getDatabase()

  const [isLogin, setIsLogin] = useState(1)
  const [user, setUser] = useState()
  const [userImgs, setUserImgs] = useState()

  const requireLogin = () => {
    return onAuthStateChanged(auth, (fbUser) => {
      if (fbUser != null) {
        console.log('authenticated');

        setIsLogin(true)
        setUser(fbUser);
        const userImgsRef = ref(db, `users/${fbUser.uid}`);
        onValue(userImgsRef, (snapshot) => {
          const data = snapshot.val()
          setUserImgs(formatImgs(data))
        })

      } else {
        setIsLogin(false)
        console.log('need authenticate!');
      }
    });
  }
  
  useEffect(() => {
    // https://firebase.google.com/docs/reference/android/com/google/firebase/auth/FirebaseAuth.AuthStateListener
    console.log('Check Auth');
    const unsubscribe = requireLogin()

    return unsubscribe
    // eslint-disable-next-line 
  }, []);

  if (isLogin === 1) return <div>ログイン情報を確認中...</div>
  if (!isLogin) return <Login /> 
  if (!user) return <div>user not found.</div>

  return (
    <Top user={user} userImgs={userImgs} />
  );
}

export default App;
