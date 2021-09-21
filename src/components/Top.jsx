import { useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'

const formatImgs = (imgs) => {
  if (!imgs) return []

  const formatedImgs = Object.keys(imgs).map(key => imgs[key])
  return formatedImgs
}

/*
ランダムにアカウントを選ぶ
そのアカウントでログインする
アカウントの画像取得
*/

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
  const [loginError, setLoginError] = useState(null)
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const [uid, setUid] = useState()
  const [imgs, setImgs] = useState(null)
  // console.log('accounts', accounts)

  const chooseAccount = () => {
    if (accounts.length <= 0) {
      alert('全てのアカウントが選ばれました')
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
      const userImgsRef = ref(db, `users/${uid}`);
      onValue(userImgsRef, (snapshot) => {
          const data = snapshot.val()
          setImgs(formatImgs(data))
        })
    }
  }, [uid])

  if (loginError) return <div>Login Error Happened.</div>


  return (
    <>
     <div>{`現在のアカウント: ${currentAccount ? currentAccount : "選択されていません"}`}</div>
     <button onClick={chooseAccount}>抽選</button>
     {!currentAccount ? null : isLoadingLogin ? <div>Now Login...</div> : <div>Login Success.</div>}
     {imgs && imgs.length > 0 ? imgs.map(ref => <div key={ref.url}><img alt="夏休み中の画像" src={ref.url} height="200" width="200" /></div>) : null}
    </>
  )

}