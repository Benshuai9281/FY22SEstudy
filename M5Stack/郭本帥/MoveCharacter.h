#ifndef _MOVECHARACTER_H_
#define _MOVECHARACTER_H_
#define IMAGE_WIDTH 128 // 画像の幅
#define IMAGE_HEIGHT 128 // 画像の高さ
#define DISPLAY_WIDTH  320  // 画面の横幅
#define DISPLAY_HEIGHT 240  // 画面の縦幅
#define SPEED 10

int moveToLRT (short *x0, short *y0, int dir)
{
  if (dir == 1) 
  {
    M5.Lcd.clear();
    dispaly();
    if (*x0 > SPEED) {
      *x0 -= SPEED;
    }
    setCharacter(*y0,*x0,2);
    return 1;
  }
  else if (dir == 2)
  {
    M5.Lcd.clear();
    dispaly();
    if (*y0 <= -DISPLAY_HEIGHT)
    {
      *y0 += DISPLAY_HEIGHT;
    }
    *y0 -= SPEED;
    setCharacter(*y0,*x0,1);
    return 0;
  }
  else if (dir == 3)
  {
    M5.Lcd.clear();
    dispaly();
    if (*x0 < DISPLAY_WIDTH-IMAGE_WIDTH-SPEED) {
      *x0 += SPEED;
    }
    setCharacter(*y0,*x0,1);
    return 0;
  }
  else if (dir == 4)
  {
    M5.Lcd.clear();
    dispaly();
    if (*y0 <= -DISPLAY_HEIGHT)
    {
      *y0 += DISPLAY_HEIGHT;
    }
    *y0 -= SPEED;
    setCharacter(*y0,*x0,2);
    return 1;
  }
  else 
  {
    return -1;
  }
}

#endif
