import { useEffect, useState } from 'react'

export const Entry = ({ setRoute }) => {
  const [accounts, setAccounts] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const prevAccounts = JSON.parse(localStorage.getItem('atereko')) 

    if (prevAccounts) {
      setAccounts(prevAccounts)
    }

  }, [])

  useEffect(() => {
    if (accounts) {
      console.log('set')
      localStorage.setItem('atereko', JSON.stringify(accounts))
    }
  }, [accounts])

  const selectAccount = () => {
    const randomId = Math.floor(Math.random() * accounts.length)
    setSelected(accounts[randomId])
    if(accounts.length <= 0) {
      return
    }
    const nextAccounts = accounts.filter((ac, i) => i !== randomId)
    console.log('next accounts', nextAccounts)
    accounts.splice(randomId, 1)
    
    if(nextAccounts.length === 0) {
      console.log('clear')
      localStorage.clear()
      setAccounts(null)
      return
    }
    setAccounts(nextAccounts)
  }

  return (
    <>
      <button onClick={() => setRoute('top')}>クイズをする</button>
      {!accounts && <button onClick={() => setRoute('createAccount')}>アカウントを生成する</button>}
      {accounts && 
       <> 
        <div>登録されているアカウント</div>
        {accounts.map(ac => <div key={ac}>{ac}</div>)}
        {accounts.length > 0 && <button onClick={selectAccount}>ゲームに使うアカウントを選ぶ</button>}
        {selected && 
          <div>
            <div>このアカウントがだれか当てましょう</div>
            {selected}
          </div>
        }
       </>
      }
    </>
  )
}