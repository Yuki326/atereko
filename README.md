## ローカルの環境変数
``.envファイル``をルートディレクトリに作成し、以下のフォーマットでFirebaseの各APIキーをセットする。


```
REACT_APP_API_KEY="hoge"
REACT_APP_AUTH_DOMAIN="hoge"
REACT_APP_FDB_URL="hoge"
REACT_APP_PROJECT_ID="hoge"
REACT_APP_STORAGE_BUCKET="hoge"
REACT_APP_MESSAGE_SENDER_ID="hoge"
REACT_APP_APP_ID="hoge"
```

## 本番の環境変数

Github Action の Variable Substitution を使う
https://github.com/marketplace/actions/variable-substitution

Azure の Ymlファイルで Variable Substitution を参照する
https://docs.microsoft.com/ja-jp/azure/developer/github/github-variable-substitution
