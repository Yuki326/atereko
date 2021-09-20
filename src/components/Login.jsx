import { useState } from 'react'

const initialFormValue = {
  mail: "",
  password: ""
}

export const Login = () => {
  const [formValue, setFormValue] = useState(initialFormValue)

  const handleSubmit = () => {
    console.log('formValue', formValue)
  }

  const handleChangeValue = event => {
    const { name, value } = event.target

    setFormValue(prevValues => ({
      ...prevValues,
      [name]: value
    }))
    
  }

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