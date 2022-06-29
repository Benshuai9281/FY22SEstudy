#ifndef _DISPLAY_H_
#define _DISPLAY_H_

// 画面サイズ定義用のヘッダ
#define DISPLAY_WIDTH  320  // 画面の横幅
#define DISPLAY_HEIGHT 240  // 画面の縦幅


#define TFTW            320     // screen width
#define TFTH            240     // screen height
#define TFTW2           160     // half screen width
#define TFTH2           120     // half screen height
// game constant
#define SPEED            10
#define GRAVITY         7.0
#define JUMP_FORCE     1.15
#define SKIP_TICKS     20.0     // 1000 / 50fps
#define MAX_FRAMESKIP     5
// floor size
#define FLOORH           30     // floor height (from bottom of the screen)
// grass size
#define GRASSH            4     // grass height (inside floor, starts at floor y)  
// background
const unsigned int BCKGRDCOL = M5.Lcd.color565(138,235,244);
// floor
const unsigned int FLOORCOL = M5.Lcd.color565(246,240,163);
// grass (col2 is the stripe color)
const unsigned int GRASSCOL  = M5.Lcd.color565(141,225,87);
const unsigned int GRASSCOL2 = M5.Lcd.color565(156,239,88);

// ---------------
// draw pixel
// ---------------
// faster drawPixel method by inlining calls and using setAddrWindow and pushColor
// using macro to force inlining

void dispaly()
{
  // ===============
  // prepare game variables
  // draw floor
  // ===============
  // instead of calculating the distance of the floor from the screen height each time store it in a variable
  unsigned char GAMEH = TFTH - FLOORH;
  // draw the floor once, we will not overwrite on this area in-game
  // black line
  M5.Lcd.drawFastHLine(0, GAMEH, TFTW, TFT_BLACK);
  // grass and stripe
  M5.Lcd.fillRect(0, GAMEH+1, TFTW2, GRASSH, GRASSCOL);
  M5.Lcd.fillRect(TFTW2, GAMEH+1, TFTW2, GRASSH, GRASSCOL2);
  // black line
  M5.Lcd.drawFastHLine(0, GAMEH+GRASSH, TFTW, TFT_BLACK);
  // mud
  M5.Lcd.fillRect(0, GAMEH+GRASSH+1, TFTW, FLOORH-GRASSH, FLOORCOL);
}
#endif
