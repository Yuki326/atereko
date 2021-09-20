import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'

import { Top } from './components/Top'
import { Login } from './components/Login'
import { configs } from './config.json'
import './App.css';

initializeApp(configs)

const formatImgs = (imgs) => {
  const formatedImgs = Object.keys(imgs).map(key => imgs[key])
  return formatedImgs
}

const App = () => {
  const auth = getAuth()
  const db = getDatabase()

  const [isLogin, setIsLogin] = useState(null)
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
  }, []);

  if (!isLogin) return <Login /> 
  if (!user) return <div>user not found.</div>

  return (
    <Top user={user} userImgs={userImgs} />
  );
}

export default App;
