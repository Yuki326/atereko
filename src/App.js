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
  const buttonAlert = () => {
    const style = document.createElement('style')
    
    style.innerHTML = `
      .picture1 img {
        height: 0;
	      padding: 0;
	      overflow: hidden;
        flex:1;
        margin:105px;
        align-items:center;
      }
    `
    document.body.appendChild(style)
  }
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
              <div className = "picture1" ><img src="kogura.jpg"/></div>
              <div className = "picture2"><img src="logo.png"/></div>
              <div className = "picture3"><img src="logo192.png"/></div>
              <div className = "picture4"><img src="kogura.jpg"/></div>
            </div>
            <div className = "contents">
              <div className = "picture1"><img src="kogura.jpg"/></div>
              <div className = "picture2"><img src="kogura.jpg"/></div>
              <div className = "picture3"><img src="kogura.jpg"/></div>
              <div className = "picture4"><img src="kogura.jpg"/></div>
            </div>
            <div className = "buttons">
              <div className = "upload">アップロード</div>
              <button onClick={buttonAlert} className = "game">ゲーム開始</button>
              <div className = "vote">投票</div>
            </div>
          </div>
          <div  className = "footer">残り{timer}秒</div>
         
    </header>
</div>
  );
}

export default App;
