const ageInput = document.getElementById("age");

// inputタグの中身を参照しコンソールに出力する関数
function printAge() {
  const age = ageInput.value;
  console.log("設定されている年齢は" + age + "才です");
}

// inputタグの中身が変化したら発火するイベントを付与
ageInput.addEventListener("change", printAge);
