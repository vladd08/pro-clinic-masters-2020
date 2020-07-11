#include <rdm630.h>

unsigned long int previous = 0;
int redLed = 7;
int greenLed = 8;

rdm630 rfid(3, 0);  //TX-pin of RDM630 connected to Arduino pin 3

void setup() {
  pinMode(redLed,OUTPUT);
  pinMode(greenLed,OUTPUT);
  Serial.begin(9600);
  rfid.begin();
  while(!Serial){
    ;
  }
}

void loop() {
  byte data[6];
  byte length;

  if(Serial.available()) {
    char c = (char)Serial.read();
    if(c == 'C') {
      digitalWrite(greenLed,HIGH);
    } else if(c == 'D') {
      digitalWrite(greenLed,LOW);
    }
  }
   
  if(rfid.available()){
       rfid.getData(data,length);
       digitalWrite(redLed, HIGH);
       unsigned long result = 
         ((unsigned long int)data[1]<<24) + 
         ((unsigned long int)data[2]<<16) + 
         ((unsigned long int)data[3]<<8) + 
         data[4];    
       Serial.print(result);
       digitalWrite(redLed, LOW);
    }
}
