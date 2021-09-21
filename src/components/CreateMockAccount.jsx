import { useState } from 'react'

const mockAccounts = [
  "test@test.com", 
  "kappa@kappa.com", 
  "hoge@hoge.com", 
  "huga@huga.com", 
  "piyo@piyo.com"
]

export const CreateMockAccount = () => {
  const [count, setCount] = useState(0)
  const [accounts, setAccounts] = useState(null)

  const handleCreateAccounts = () => {
    if (count > 5 || count <= 0) { 
      alert('アカウントを追加できません')
      return
    }

    // const sliceOffset = 5 - count
    const addAccounts = mockAccounts.slice(5 - count)
    console.log('addAccounts', addAccounts)
    setAccounts(addAccounts)
    localStorage.setItem('atereko', JSON.stringify(addAccounts))
  }

  return (
    <div>
      this is create mock account page
      <div>{`アカウント数: ${count}`}</div>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
      <button onClick={() => setCount(prev =>   prev - 1)}>-</button>
      <div>
        <button onClick={() => handleCreateAccounts()}>アカウントを生成する</button>
      </div>
      {accounts && accounts.map(ac => <div key={ac}>{ac}</div>)}
    </div>
  )
}