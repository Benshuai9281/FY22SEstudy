#include <Arduino.h>

void setup() {
  // put your setup code here, to run once:
  M5.begin();
  M5.Lcd.setTextSize(3);
  M5.Lcd.println("Hello M5Stack!");
}

void loop() {
  // put your main code here, to run repeatedly:
}
