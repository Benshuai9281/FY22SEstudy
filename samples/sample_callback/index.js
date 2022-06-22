function hello(fullName) {
  console.log("Hello " + fullName + " !!");
}

console.log("2秒後にhello関数が実行されます");
// callback関数をセットする
// 2000ミリ秒後にhello関数が呼ばれる
window.setTimeout(hello, 2000, "Muraji Yoshihiro");

// ここで2秒待たずに
console.log("こっちのが早く実行されます");

// 2秒経過したらhello関数が実行されます。
