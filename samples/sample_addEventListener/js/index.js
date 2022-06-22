// idにhello-btnが付与されている要素ノードを取得
const helloButton = document.getElementById("hello-btn");

// callback関数の定義
function hello() {
  console.log("Hello DOM API !!");
}

// eventのclickタイプとcallback関数をセットする
helloButton.addEventListener("click", hello);
