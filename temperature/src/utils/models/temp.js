import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDnoXJKGMwIT7TrCbjd-7YqEggoxz0QmQo",
    authDomain: "itemplore.firebaseapp.com",
    databaseURL: "https://itemplore-default-rtdb.firebaseio.com",
    projectId: "itemplore",
    storageBucket: "itemplore.appspot.com",
    messagingSenderId: "914627712794",
    appId: "1:914627712794:web:d655c8ad6fec057e6b7ea3"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const TemperatureUpdater = () => {
    useEffect(() => {
      const temperatureRef = ref(database, 'temperature/-Nb0rU7jYebmAeeUIiqe'); // Cambiar por la referencia correcta
  
      const updateRandomTemperature = () => {
        const newTemperature = Math.floor(Math.random() * (40 - 10 + 1)) + 10; // Generar temperatura aleatoria
  
        update(temperatureRef, {
          value: newTemperature,
          timestamp: database.ServerValue.TIMESTAMP,
        });
      };
  
      const intervalId = setInterval(updateRandomTemperature, 7000); // Actualizar cada 7 segundos
  
      return () => {
        clearInterval(intervalId);
      };
    }, []);
  
    return <div>Actualizando temperatura automáticamente...</div>;
  };
  
  export default TemperatureUpdater;