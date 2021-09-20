import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const initialFormValue = {
  mail: "",
  password: ""
}

export const Login = () => {
  const [formValue, setFormValue] = useState(initialFormValue)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const handleSubmit = async () => {
    const auth = getAuth()
    const { mail, password } = formValue 

    try {
      setIsLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, mail, password)
      console.log('login success', userCredential)
      // setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      setError(error)
      console.log('login error', error)

    }

  }

  const handleChangeValue = event => {
    const { name, value } = event.target

    setFormValue(prevValues => ({
      ...prevValues,
      [name]: value
    }))
    
  }

  if (isLoading) return <div>Now Loading...</div>
  if (error) return <div>Error Happened.</div>

  return (
    <>
      <label>
        Mail:
        <input
          type="text" 
          name="mail" 
          value={formValue.mail}
          onChange={handleChangeValue}
        />
      </label>
      <label>
        Password:
        <input 
          type="text" 
          name="password" 
          value={formValue.password}
          onChange={handleChangeValue}
        />
      </label>
      <button onClick={handleSubmit}>ログインする</button>
    </>
  )
}