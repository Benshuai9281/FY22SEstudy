#ifndef _CHARACTER_H_
#define _CHARACTER_H_
#define IMAGE_WIDTH 128 // 画像の幅
#define IMAGE_HEIGHT 128 // 画像の高さ
#define DISPLAY_WIDTH  320  // 画面の横幅
#define DISPLAY_HEIGHT 240  // 画面の縦幅
#define SPEED 10

void setCharacter(short y0, short x0, int type)
{
  short i, j;
  short x, y;
  if (type == 1) {
  for ( j = 0; j < IMAGE_HEIGHT; j++ )
  {
    for ( i = 0; i < IMAGE_WIDTH; i++ )
    {
      if (0x0000 != chara1 [j][i])
    {
      x = x0 + i;
      y = y0 + j;
      if (y < 0) 
      {
        y += DISPLAY_HEIGHT;
      }
    M5.Lcd.drawPixel(x,y,chara1[j][i]);
    }
    }
  }
  }
  else
  {
    for ( j = 0; j < IMAGE_HEIGHT; j++ )
  {
    for ( i = 0; i < IMAGE_WIDTH; i++ )
    {
      if (0x0000 != chara2 [j][i])
    {
      x = x0 + i;
      y = y0 + j;
      if (y < 0) 
      {
        y += DISPLAY_HEIGHT;
      }
    M5.Lcd.drawPixel(x,y,chara2[j][i]);
    }
    }
  }
  }
}

#endif
