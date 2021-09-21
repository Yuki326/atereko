import { useState, useEffect } from 'react'

const createRandomString = () => {
  let l = 8;
  let c = "abcdefghijklmnopqrstuvwxyz0123456789";

  let cl = c.length;
  let r = "";
  for(let i=0; i<l; i++){
    r += c[Math.floor(Math.random()*cl)];
  }

  return r
}


const createAccounts = (n) => {
  const mails = []

  for (let i=0; i<n; i++) {
    const account = `${createRandomString()}@${createRandomString()}.com`
    mails.push(account)
  }

  return mails 
}


export const CreateAccount = ({ setRoute }) => {
  const [count, setCount] = useState(0)
  const [accounts, setAccounts] = useState(null)

  const handleSetAccounts = () => {
    if (count <= 0) {
      alert('アカウントは追加できません。\n 0個以上のアカウントを追加してください')
      return
    }

    setAccounts(createAccounts(count))
    console.log('accounts', accounts)
  }

  useEffect(() => {
    const prevAccounts = localStorage.getItem('atereko')
    console.log('preview accounts', prevAccounts)

    // check initial render & is exsit previe accounts
    if (!accounts && prevAccounts && prevAccounts.length > 0) {
      console.log('exist preview accounts, set accounts to local state')
      setAccounts(JSON.parse(prevAccounts))
      return
    }

    if (accounts) {
      console.log('set accounts')
      localStorage.setItem('atereko', JSON.stringify(accounts))
    }
  }, [accounts])

  return (
    <>
      <div>生成する個数: {count}</div> 
      <div>
        <button onClick={() => setCount(prev => prev + 1)}>+</button>
        <button onClick={() => setCount(prev => prev - 1)}>-</button>
      </div>
      <button onClick={() => handleSetAccounts()}>アカウントを生成する</button>
      {accounts && accounts.map(ac => <div key={ac}>{ac}</div>)}
      {accounts && <button onClick={() => setRoute('entry')}>ホームに戻る</button>}
    </>
  )
}