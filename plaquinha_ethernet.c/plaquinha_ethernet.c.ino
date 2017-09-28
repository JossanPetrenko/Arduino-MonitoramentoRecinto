
#include <stdio.h>
#include <SPI.h>
#include <Ethernet.h>

//responsaveis pela conexao com a internet
byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(10, 1, 1, 1);

//dados para conectar ao servidor
EthernetClient client;
char api[] = "10.1.1.2";
char endpoint[] = "/update-arduino";
int applicationPort = 8000;

//dados de sensor...
int sensorPin = A10;
int ledPin = 5;

//dados configuracao
unsigned long lastConnectionTime = 0;
const unsigned long postingInterval = 3L * 1000L;

//dados variaveis... auxiliares
String responseText = "";
bool receivingData = false;
bool ledAuto = false;



//ciclo de vida do arduino...
void setup()
{
  //pin setup
  pinMode(ledPin, OUTPUT);

  // start serial port:
  Serial.begin(9600);
  while (!Serial)
  {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // give the ethernet module time to boot up:
  delay(1000);
  // start the Ethernet connection using a fixed IP address and DNS server:
  //Ethernet.begin(mac, ip, myDns);
  Ethernet.begin(mac, ip);
  // print the Ethernet board/shield's IP address:
  Serial.print("My IP address: ");
  Serial.println(Ethernet.localIP());
}

void loop()
{
  updateLedAuto();

  readResponse();

  if (millis() - lastConnectionTime > postingInterval)
  {
    doHttpRequest();
  }
}

//fim do ciclo de vida do arduino...

// metodos de HTTP

//le a resposta, e encaminha para os comandos
void readResponse()
{

  if (client.available())
  {

    //pega o proximo char da resposta
    char c = client.read();

    //aqui acumula os chars para formar um comando
    if (receivingData)
    {
      //aqui identifica o final de um comando
      if (c == ';')
      {
        executeCommand(responseText);
        responseText = "";
      }
      else
      {
        responseText = responseText + c;
      }
    }

    //aqui identifica que comecou o corpo da resposta
    if (c == '|')
      receivingData = true;
  }
  else
  {
    if (receivingData)
    {
      if (responseText != "")
      {
        executeCommand(responseText);
      }
      receivingData = false;
      responseText = "";
    }
  }
}

//realiza uma requisicao HTTP enviando dados dos sensores
void doHttpRequest()
{
  //garante que a ultima conexao se fechou
  client.stop();
  receivingData = false;

  //tenta conectar
  if (client.connect(api, applicationPort))
  {
    Serial.println("enviando HTTP post...");

    //resolve os dados de sensor
    String data = sendSensorsData();

    //envia a requisicao
    sendHTTPHeaders(data);
    client.println();
    client.println(data);

    lastConnectionTime = millis();
  }
  else
  {
    // nao conectou
    Serial.println("connection failed");
  }
}

void sendHTTPHeaders(String data)
{

  client.print("POST ");
  client.print(endpoint);
  client.println(" HTTP/1.1");

  client.print("Host: ");
  client.println(api);
  client.print("Content-Length: ");
  client.println(data.length());
  client.println("Content-Type: application/x-www-form-urlencoded;charset=UTF-8");
  client.println("User-Agent: Arduino/1.0");
  client.println("Connection: close");
}

String sendSensorsData()
{
  //aqui coletar e enviar os dados de sensor

  String data = "";
  int lightSendorData = analogRead(sensorPin);

  data = data + "light=";
  data = data + lightSendorData;

  Serial.println(lightSendorData);

  return data;
}

// fim dos metodos de HTTP



// metodos de comando

void updateLedAuto(){
  if(!ledAuto) return;

  int sensorLight = analogRead(sensorPin);

  if(sensorLight > 600){
    digitalWrite(ledPin, HIGH);
  }else{
    digitalWrite(ledPin, LOW);
  }
}

void executeCommand(String command)
{
  Serial.println(command);
  if (command == "turn-led-on")
  {
    digitalWrite(ledPin, HIGH);
    ledAuto = false;
  }
  else if (command == "turn-led-off")
  {
    digitalWrite(ledPin, LOW);
    ledAuto = false;
  }
  else if (command = "turn-led-auto"){
    ledAuto = true;    
  }
}

//fim dos metodos de comando