# Niconico Now Tweet
##概要
Google Chromeで現在表示しているニコニコ動画の画面をそのままキャプチャーし、ツイッターに投稿します。モニタサイズのフルスクリーンや、極端に縮小した場合には対応しておりません。
## 使用する場合
このリポジトリをクローンし、manifest.jsonがある場所に、中身が以下であるようなkeys.jsを作成してください。
```js
function Keys() {}

Keys.consumer_key = "XXXXXXXXXXXXXXXXXXXXXXXXX";
Keys.consumer_secret = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
```
その後、Google Chromeの拡張機能から、デベロッパーモードのチェックを入れ、「パッケージ化されていない拡張機能を読み込む」ボタンでクローンしたディレクトリを指定してください。この拡張機能を有効にすると、`http://www.nicovideo.jp/watch/*`にアクセスしているときにURLの横にボタンが出現し、それを押すことで現在プレイヤーに表示されている画像を保存したりつぶやいたりすることができます。
## 参照したページ
* [What are extensions? - Google Chrome]
  (https://developer.chrome.com/extensions)
* [otiai10/kanColleWidget]
  (https://github.com/otiai10/kanColleWidget)
* [LDRでふぁぼるChrome拡張の内部動作 | monoの開発ブログ]
  (http://blog.monoweb.info/blog/2010/12/25/)
* [Canvas に描いた画像を png などの形式の Blob に変換する方法: Tender Surrender]
  (https://blog.agektmr.com/2013/09/canvas-png-blob.html)
