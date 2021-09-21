import { useState } from 'react'

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


const createAccount = (n) => {
  const accounts = []

  for (let i=0; i<n; i++) {
    const randomString = createRandomString()
    const account = `${randomString}@${randomString}.com`
    accounts.push(account)
  }

  console.log('accounts', accounts)
}

export const CreateAccount = () => {
  const [count, setCount] = useState(0)


  return (
    <>
      <div>生成する個数: {count}</div> 
      <div>
        <button onClick={() => setCount(prev => prev + 1)}>+</button>
        <button onClick={() => setCount(prev => prev - 1)}>-</button>
      </div>
      <button onClick={() => createAccount(count)}>アカウントを生成する</button>
    </>
  )
}