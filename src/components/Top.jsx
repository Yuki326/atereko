/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'

const formatImgs = (imgs) => {
  if (!imgs) return []

  const formatedImgs = Object.keys(imgs).map(key => imgs[key])
  return formatedImgs
}

const createPassword = (account) => {
  const words = account.split('@') 
  console.log(`${words[0]}${words[0]}`)
  return `${words[0]}${words[0]}`
}

export const Top = ({ acts, setRoute }) => {
  const auth = getAuth()
  const db = getDatabase()

  const [accounts, setAccounts] = useState(acts)
  const [currentAccount, setCurrentAccount] = useState()
  const [uid, setUid] = useState()
  const [imgs, setImgs] = useState(null)

  const [hintImgs, setHintImgs] = useState(null)
  const [hintCount, setHintCount] = useState(1)
  const [isHintFull, setIsHintFull] = useState(false)

  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const [isLoadingGetImgs, setIsLoadingGetImgs] = useState(false)
  // const [getImgsError, setGetImgsError] = useState()
  // console.log('accounts', accounts)

  const handleHint = () => {
    if (imgs) {
      const nextHintCount = hintCount + 1
      if (nextHintCount === imgs.length) {
        setIsHintFull(true)
      }
      setHintCount(prev => prev + 1)
    }
  }
  
  const handleShowAll = () => {
    setHintImgs(imgs)
    setIsHintFull(true)
  }

  const clearHint = () => {
    setIsHintFull(false)
    setHintCount(1)
    setHintImgs(imgs.slice(0, hintCount))
  }

  const chooseAccount = () => {
    if (accounts.length <= 0) {
      alert('全てのアカウントが選ばれました')
      localStorage.clear()
      setRoute('entry')
      return
    }
    const randomId = Math.floor(Math.random() * accounts.length)
    setCurrentAccount(accounts[randomId])

    const nextAccounts = accounts.filter((_, i) => i !== randomId)
    setAccounts(nextAccounts)
  }

  const login = async () => {
    try {
      setIsLoadingLogin(true)
      const userCredential = await signInWithEmailAndPassword(auth, currentAccount, createPassword(currentAccount))
      setUid(userCredential.user.uid)
      setIsLoadingLogin(false)

    } catch (error) {
      console.log('loginError', error)
      setIsLoadingLogin(false)
      setLoginError(error)
    }
  }

  useEffect(() => {
    console.log('current account', currentAccount)
    if (currentAccount) {
      // firebaseでログインする
      login()
    }
  }, [currentAccount])

  useEffect(() => {
    if (uid) {
      setIsLoadingGetImgs(true)
      const userImgsRef = ref(db, `users/${uid}`);
      onValue(userImgsRef, (snapshot) => {
          const data = snapshot.val()
          setImgs(formatImgs(data))
      })
      setIsLoadingGetImgs(false)
    }
  }, [uid])

  useEffect(() => {
    if (imgs) {
      console.log('change imgs', imgs)
      setIsHintFull(false)
      setHintCount(1)
      setHintImgs(imgs.slice(0, hintCount))
    }
  }, [imgs])

  useEffect(() => {
   if (imgs) {
     console.log('change hint', imgs)
     setHintImgs(imgs.slice(0, hintCount))
   }

  }, [hintCount])

  if (loginError) return <div>Login Error Happened.</div>
  if (isLoadingGetImgs) return <div>Now Get Images...</div>
  if (isLoadingLogin) return <div>Now Login...</div>

  return (
    <>
     <div>{`現在のアカウント: ${currentAccount ? currentAccount : "選択されていません"}`}</div>
     <button onClick={chooseAccount}>抽選</button>
     {/* {isLoadingLogin ? <div>Now Login...</div> : isLoadingGetImgs ? <div>Now Get Images...</div> : null} */}
     {hintImgs && hintImgs.length > 0 ? hintImgs.map(ref => <div key={ref.url}><img alt="夏休み中の画像" src={ref.url} height="200" width="200" /></div>) : null}
     {!isHintFull && <button onClick={handleHint}>ヒント</button>}
     {!isHintFull && <button onClick={handleShowAll}>すべて</button>}
     {isHintFull && <button onClick={clearHint}>クリア</button>}
    </>
  )

}