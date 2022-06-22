/**
 * じゃんけんゲームを作ってみよう
 * htmlはテンプレートとして用意していますがゼロから書いて頂いてもOKです！
 * imgファイルにじゃんけん用の画像を用意したので利用したい方は使ってもらってOKです！
 */
const cpur = document.getElementById("cpuroulette");
const playerr = document.getElementById("roulette");
const massage = document.getElementById("message-box");
const massage2 = document.getElementById("message-box2");
const btnrock = document.getElementById ("rock");
const btnscissors = document.getElementById ("scissors");
const btnpaper = document.getElementById ("paper");
const btnretry = document.getElementById ("retry");
var count = 0;
var win = 0;
var winrate = 0;

function start(p_janken_r) {
  
  let janken = ['グー','チョキ','パー',];//"janken"のリストを作成します。
  let janken_r = Math.floor(Math.random() * 3);//Math.random() で乱数を作ります

  if (janken_r === 0) {
    cpur.src = "img/rock.png"
  }else if (janken_r === 1) {
    cpur.src = "img/scissors.png"
  }else if (janken_r === 2){
    cpur.src = "img/paper.png"
  }

  if(!localStorage.getItem('count')) {
    count = 1;
    localStorage.setItem('count',count)
  } else {
    count =  parseInt(localStorage.getItem('count')) + 1;
    localStorage.setItem('count',count)
  }

  let p_janken = ['グー','チョキ','パー'];//"プレイヤーのjanken"のリストを作成します。
  //勝ち負けの判定機プログラムです
  if (janken_r === p_janken_r) {
      Result_end = "あいこです";
      count =  parseInt(localStorage.getItem('count')) - 1;
      localStorage.setItem('count',count)
  } else if(p_janken_r === 0 && janken_r === 1) {
      Result_end = "あなたの【勝ち】";
      btnrock.disabled = true;
      btnpaper.disabled = true;
      btnscissors.disabled = true;
      btnretry.disabled = false;
      if(!localStorage.getItem('win')) {
        win = 1;
        localStorage.setItem('win',win)
      } else {
        win = parseInt(localStorage.getItem('win')) + 1;
        localStorage.setItem('win',win)
      }
  }else if(p_janken_r === 1 && janken_r === 2) {
      Result_end = "あなたの【勝ち】";
      btnrock.disabled = true;
      btnpaper.disabled = true;
      btnscissors.disabled = true;
      btnretry.disabled = false;
      if(!localStorage.getItem('win')) {
        win = 1;
        localStorage.setItem('win',win)
      } else {
        win = parseInt(localStorage.getItem('win')) + 1;
        localStorage.setItem('win',win)
      }
  }else if(p_janken_r === 2 && janken_r === 0) {
      Result_end = "あなたの【勝ち】";
      btnrock.disabled = true;
      btnpaper.disabled = true;
      btnscissors.disabled = true;
      btnretry.disabled = false;
      if(!localStorage.getItem('win')) {
        win = 1;
        localStorage.setItem('win',win)
      } else {
        win = parseInt(localStorage.getItem('win')) + 1;
        localStorage.setItem('win',win)
      }
  }else {
      Result_end = "あなたの【負け】";
      btnrock.disabled = true;
      btnpaper.disabled = true;
      btnscissors.disabled = true;
      btnretry.disabled = false;
  }
  massage.innerHTML = janken[janken_r] + "V.S." + p_janken[p_janken_r] + " " + Result_end ;
  massage2.innerHTML = "じゃんけん回数；" + count + " 勝利回数；" + win;
  var day = new Date();
  localStorage.setItem('year',day.getFullYear() + '年');
  localStorage.setItem('month',(day.getMonth()+1) + '月');
  localStorage.setItem('date',day.getDate() + '日');
  localStorage.setItem('time',day.getHours() + '時' + day.getMinutes() + '分' + day.getSeconds() + '秒');
  localStorage.setItem('game',janken[janken_r] + "V.S." + p_janken[p_janken_r] + " " + Result_end);
}

function play0() {
  playerr.src = "img/rock.png"
  start(0)
}

function play1() {
  playerr.src = "img/scissors.png"
  start(1)

}

function play2() {
  playerr.src = "img/paper.png"
  start(2)
}

function retry() {
  cpur.src = "img/cpu.gif"
  playerr.src = "img/junbi.png"
  massage.innerHTML = "じゃんけーん…"
  btnrock.disabled = false;
  btnpaper.disabled = false;
  btnscissors.disabled = false;
  btnretry.disabled = true;
}

btnretry.disabled = true;
btnrock.addEventListener ("click", play0)
btnscissors.addEventListener ("click", play1)
btnpaper.addEventListener ("click", play2)
btnretry.addEventListener ("click", retry)

function displayDate() {
  var year = localStorage.getItem('year');
  var month = localStorage.getItem('month');
  var date = localStorage.getItem('date');
  var time = localStorage.getItem('time');
  var game = localStorage.getItem('game');

if(game == "undefined") {
  alert('ゲームの記録がない、ゲームをスタートしてください');
  }
  else if (year){
    var message = 'あなたは' + year + month + date + time + 'にじゃんけんゲームをしました。その結果は' + game ;
    alert(message);
  }
  else {
  alert('ゲームをスタートしてください');
  }
}

function storageClear() {
  localStorage.removeItem('year');
  localStorage.removeItem('month');
  localStorage.removeItem('date');
  localStorage.removeItem('time');
  localStorage.removeItem('count');
  localStorage.removeItem('win');
  localStorage.removeItem('game');
  win = 0;
  count = 0;
  massage2.innerHTML = "スタート！";
  retry()
}
