import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'

const formatImgs = (imgs) => {
  const formatedImgs = Object.keys(imgs).map(key => imgs[key])
  return formatedImgs
}

export const Top = ({ setRoute }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  
  const auth = getAuth()
  const db = getDatabase()
  const [isLoadingCertification, setIsLoadingCertification] = useState(true)
  const [userImgs, setUserImgs] = useState()

  const handleClick = async () => {
  
    try {
      setIsLoading(true)
      await signOut(auth)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error)
       
    }
  }

  const handleGoCreateAccount = () => {
    console.log('click')
    setRoute('createAccount')
  }

  const requireLogin = () => {
    return onAuthStateChanged(auth, (fbUser) => {
      if (fbUser != null) {
        console.log('authenticated');

        setIsLoadingCertification(false)
        const userImgsRef = ref(db, `users/${fbUser.uid}`);
        onValue(userImgsRef, (snapshot) => {
          const data = snapshot.val()
          setUserImgs(formatImgs(data))
        })
        setRoute('top')

      } else {
        setIsLoadingCertification(false)
        setRoute('login')
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

  if (isLoadingCertification) return <div>ログイン情報を確認中...</div>


  if (isLoading) return <div>Now Loading...</div>
  if (error) return <div>Error Happened.</div>

  return (
    <>
      <div>this is top page</div>
      <button onClick={handleClick}>ログアウトする</button>
      <button onClick={handleGoCreateAccount}>ゲームで使うアカウントを作る</button>
      {userImgs ?
        userImgs.map(ref => (
          <div key={ref.url}><img alt="夏休み中の画像" src={ref.url} height="200" width="200" /></div>
        ))
        :
        <div>Imgs Loading...</div>
      }
    </>
  )
}