import { useState } from 'react'
import './createMockAccount.css'

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
    <div className="back">
      <div className="box">
        <h1>作成するアカウント数の設定</h1>
        <h1 className="count">{`${count}`}</h1>
        <button className="setting-button"onClick={() => setCount(prev => prev + 1)}><span className="icon">+</span></button>
        <button className="setting-button"onClick={() => setCount(prev =>  prev ? prev - 1:0)}><span className="icon">-</span></button>
        <div>
          <button className="submit-button"onClick={() => handleCreateAccounts()}>アカウントを生成する</button>
        </div>
        <div class="box28">
          <div　className="list-desc">アカウント一覧</div>
            <div className="list">
            {accounts && accounts.map(ac => <div key={ac}>{ac}</div>)}
            </div>
          </div>
      </div>
    </div>
  )
}