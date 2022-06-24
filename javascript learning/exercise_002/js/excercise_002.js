const dish1 = {
  main: "fish",
  sub: "rice",
  side: "miso-soup",
};

const dish2 = {
  main: "meat",
  sub: "rice",
  side: "miso-soup",
};

const dish3 = {
  main: "vegetable",
  sub: undefined,
  side: "miso-soup",
};

function generateTeisyoku(dish) {
  /*  この関数を完成させて下さい
        要件１ mainに"fish",subに"rice"を持つオブジェクトを引数に
        受け取ったとき「刺身定食」の文字列を返す
        要件２ mainに"meat",subに"rice"を持つオブジェクトを引数に
        受け取ったとき「焼肉定食」の文字列を返す
        要件３ mainまたはsubに食材がセットされていないオブジェクト
        を引数に受け取った場合にはコンソールに材料が不足している」のエラーメッセージを出し、
        返り値にはundefinedを返す。
    **/
  if (dish.main === "fish" && dish.sub === "rice") {
    console.log("刺身定食")
  } else if (dish.main === "meat" && dish.sub === "rice") {
    console.log ("焼肉定食")
  } else if (dish.main === undefined || dish.sub === undefined) {
    console.error ("材料が不足しています")
  }
}

generateTeisyoku(dish1);
generateTeisyoku(dish2);
generateTeisyoku(dish3);
