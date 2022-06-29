// 全体外枠用main.cpp
#include <M5Core2.h>
#include <Display.h>
#include <Image.h>
#include <Image_r.h>
#include <Character.h>
#include <MoveCharacter.h>

#include <EEPROM.h>

//----- グローバル変数
short   x0_chara = 0;   // キャラクターの現在の左上位置x
short   y0_chara = 0;   // キャラクターの現在の左上位置y
int   status = -1;

// ----- 関数：初期化

void setup() 
{
    M5.begin(); // ハードウェア系の初期化
    status = 0;
    M5.Lcd.setTextSize(3);
    short i,j;
    short x,y;
    y0_chara = 100;
    x0_chara =100;
    dispaly();
    setCharacter(y0_chara,x0_chara,1);
    // ここに記載する
}

// ----- 関数：処理の中身
void loop()
{
    M5.update(); // M5関数系の初期化
    short i,j;
    short x,y;
    if (M5.BtnA.wasPressed()) {
    status = moveToLRT(&x0_chara,&y0_chara,1);
    }
    if (M5.BtnB.wasPressed()) {
    if (status == 0) {
      status = moveToLRT(&x0_chara,&y0_chara,2);
    }
    else{
      status = moveToLRT(&x0_chara,&y0_chara,4);
    }
    }
    if (M5.BtnC.wasPressed()) {
    status = moveToLRT(&x0_chara,&y0_chara,3);
    }
    // ここに記載する
    if (status < 0)
    {
      M5.Lcd.clear();
      M5.Lcd.setCursor(0,0);
      M5.Lcd.print("ERROR!");
    }
    delay(50);  // 外部操作の安定化用
}

