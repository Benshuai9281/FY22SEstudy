document.getElementById("alert").addEventListener("click", function () {
  window.alert("警告 とにかく危険です！");
});

document.getElementById("confirm").addEventListener("click", function () {
  // 確認ウィンドウの結果を受け取ることができます
  const result = window.confirm("確認させて下さい！いいですね？");
  if (result) {
    console.log("ありがとうございます");
  } else {
    console.warn("何でですか？");
  }
});

document.getElementById("prompt").addEventListener("click", function () {
  // 入力ウィンドウの結果を受け取ることができます
  const result = window.prompt("好きな食べ物はなんですか？");
  console.log(result + "なんですね。それ僕も良く食べます");
});

document.getElementById("setInterval").addEventListener("click", function () {
  // setIntervalで呼び出すcallback
  function incrementWindow() {
    window.alert("消さないとどんどん増えますよ");
    console.log("消さないとどんどん増えますよ");
  }

  // 止めるためにidを取得
  const intervalId = window.setInterval(incrementWindow, 1000);

  // 10秒後にsetIntervalを止める
  window.setTimeout(() => {
    window.clearInterval(intervalId);
    console.log("もう増えません…");
  }, 10000);
});
