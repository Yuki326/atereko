import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*仮のレイアウト*/}
        <div class = "container">
          <div class = "header">
            <div class = "navbar">
              <div class = "logo">
                ロゴ
              </div>
              <div class = "grobal-nav">
                <ul>
                  <li class = "search"><a href = "#">検索窓</a></li>
                  <li class = "login"><a href ="#">ログイン</a></li>
                  <li class = "prof"><a href = "#">プロフィール</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class = "main">
            <div class = "contents">
              <p>contents<img src={logo} className="App-logo" alt="logo" /></p>
            </div>
            <div class = "sidebar">
              <h2>最新の動画</h2>
              {/*データベースから持ってくる*/}
              <div class = "section">
                <div class = "img">サムネ</div>
                <div class = "desc">説明</div>
              </div>
              <div class = "section">
                <div class = "img">サムネ</div>
                <div class = "desc">説明</div>
              </div>
            </div>
          </div>
          <div class = "footer">footer</div>
        </div>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>テスト</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
