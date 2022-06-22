const btn = document.getElementById ("btn")
function change() {
  document.getElementById ("text").innerText = "DOM API理解しそう"
}

btn.addEventListener ("click", change)
