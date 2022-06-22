/**
 * ここを完成させよう
 * tableタグの使い方をわからなければ調べてみよう　https://developer.mozilla.org/ja/docs/Web/HTML/Element/table
 */
const btn = document.getElementById ("append")
function change() {
  const newtable = document.createElement("tr")
  const namae = document.getElementById("name")
  const age = document.getElementById("age")
  let changetext = "<td>" + namae.value + "</td>" + "<td>" + age.value + "</td>"
  console.log(changetext)
  newtable.innerHTML = changetext
  document.getElementById("content").appendChild(newtable)
}

btn.addEventListener ("click", change)


