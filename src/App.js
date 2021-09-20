import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [timer, setTimer] = useState(180)
  const isFirsetRender = useRef(false)

  useEffect(()=>{
    if(!isFirsetRender.current) return;

    setInterval(()=>{
      setTimer(timer - 1)
    }, 1000)
    isFirsetRender.current = true
  })

  return (
    <div className="App">
      <header className="App-header">
        {/*仮のレイアウト*/}
        <div className = "container">
          <div className = "header">
            <div className = "navbar">
              <div className = "logo">
                <a href="#">アテレコ</a>
              </div>
              <div className = "other">
                <div className = "sign_up"><a href="#">新規</a></div>
                <div className = "sign_in"><a href="#">ログイン</a></div>
              </div>
            </div>
          </div>
            <div className = "contents">
              <div className = "picture1"><img src="kogura.jpg"/></div>
              <div className = "picture2">画像</div>
              <div className = "picture3">画像</div>
              <div className = "picture4">画像</div>
            </div>
            <div className = "contents">
              <div className = "picture1">画像</div>
              <div className = "picture2">画像</div>
              <div className = "picture3">画像</div>
              <div className = "picture4">画像</div>
            </div>
            <div className = "buttons">
              <div className = "upload">アップロード</div>
              <div className = "game">ゲーム開始</div>
              <div className = "vote">投票</div>
            </div>
          </div>
          <div  className = "footer">残り{timer}秒</div>
          <button onClick={()=>alert(test)}>てすと</button>
         
    </header>
</div>
  );
}

export default App;
