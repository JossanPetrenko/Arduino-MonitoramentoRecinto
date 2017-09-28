#if ARDUINO > 18
#include <SPI.h> // needed for Arduino versions later than 0018
#endif
#include <Ethernet.h>
 

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
byte ip[] = { 192, 168, 1, 177 };
byte server[] = { 64, 233, 187, 99 };

EthernetClient client;

void setup() {
  // put your setup code here, to run once:
    Ethernet.begin(mac, ip); // start ethernet using the mac and IP address
    Serial.begin(9600); // start the serial library:
    delay(1000); // give the ethernet hardware a second to initialize
    Serial.println("connecting...");
    if (client.connect(server, 80)) {
    Serial.println("connected");
    client.println("GET /search?q=arduino HTTP/1.0"); // the HTTP request
    client.println();
    } else {
    Serial.println("connection failed");
    }

}

void loop()
{
    if (client.available()) {
    char c = client.read();
    Serial.print(c); // echo all data received to the Serial Monitor
    }
    if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
    for(;;)
    ;
    }
}
