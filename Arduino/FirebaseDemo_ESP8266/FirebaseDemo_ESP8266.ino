#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>  // Asegúrate de tener instalada la librería ArduinoJson

const char* ssid = "INFINITUM999E";
const char* password = "7M7Z2hCwP5";
const char* firebaseHost = "itemplore-default-rtdb.firebaseio.com";
const char* firebaseToken = "AIzaSyDnoXJKGMwIT7TrCbjd-7YqEggoxz0QmQo";  // Puede obtenerse desde la Consola de Firebase

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a la red Wi-Fi...");
  }
  Serial.println("Conectado a la red Wi-Fi");
}

void loop() {
  // Actualiza un registro específico en la base de datos
  int nuevoValor = 123;
  String ruta = "/temperature/-Nb0rU7jYebmAeeUIiqe/grados.json";

  WiFiClientSecure client;
  if (client.connect(firebaseHost, 443)) {
    DynamicJsonDocument jsonDoc(256);
    jsonDoc["dato"] = nuevoValor;

    String jsonPayload;
    serializeJson(jsonDoc, jsonPayload);

    client.print("PUT " + ruta + " HTTP/1.1\r\n");
    client.print("Host: " + String(firebaseHost) + "\r\n");
    client.print("Content-Type: application/json\r\n");
    client.print("Authorization: Bearer " + String(firebaseToken) + "\r\n");
    client.print("Content-Length: " + String(jsonPayload.length()) + "\r\n");
    client.print("\r\n");
    client.print(jsonPayload);
  }
  client.stop();

  Serial.print("Registro actualizado en la ruta ");
  Serial.print(ruta);
  Serial.print(" con el nuevo valor: ");
  Serial.println(nuevoValor);

  delay(5000); // Espera 5 segundos antes de realizar otra actualización
}
