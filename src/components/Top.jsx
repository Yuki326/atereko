import { useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'

export const Top = ({ user, userImgs }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  console.log('userImgs', userImgs)
  console.log('user', user)

  const handleClick = async () => {
    const auth = getAuth()
  
    try {
      setIsLoading(true)
      await signOut(auth)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error)
       
    }
  }

  if (isLoading) return <div>Now Loading...</div>
  if (error) return <div>Error Happened.</div>

  return (
    <>
      <div>this is top page</div>
      <button onClick={handleClick}>ログアウトする</button>
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