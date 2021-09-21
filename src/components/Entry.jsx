export const Entry = ({ setRoute }) => {

  return (
    <>
      <button onClick={() => setRoute('top')}>クイズをする</button>
      <button onClick={() => setRoute('createAccount')}>アカウントを生成する</button>
    </>
  )
}