/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

export const Entry = ({ setRoute, setAccounts }) => {
  
  useEffect(() => {
    const prevAccounts = JSON.parse(localStorage.getItem('atereko')) 

    console.log('prevAcconts', prevAccounts)
    if (prevAccounts) {
      console.log('go top')
      setAccounts(prevAccounts)
      setRoute('top')
      return
    }

    console.log('go create')
    setRoute('createMockAccount')
  }, [])

  return <div>Now Loading...</div>
}