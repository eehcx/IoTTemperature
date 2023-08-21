import React, { useEffect, useState, useRef  } from 'react';
import anime from 'animejs';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue  } from 'firebase/database';
import '../styles/temp.css'
import Time from '../components/Time';

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
const db = getDatabase(app);

export default function Temp() {

    const [temperature, setTemperature] = useState(null);
    const [humedad, setHumedad] = useState(null);

    const [uid, setUid] = useState('-Nb0rU7jYebmAeeUIiqe');
    function capitalizeFirstLetter(str) { return str.charAt(0).toUpperCase() + str.slice(1); } 

    let estadoTiempo = "";

    useEffect(() => {
    const temperatureRef = ref(db, 'temperature/' + uid);

    const unsubscribe = onValue(temperatureRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const temperatureWithDecimals = parseFloat(data.grados).toFixed(1);
        setTemperature(temperatureWithDecimals);
        setHumedad(data.humedad);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [uid]);

  // Obtener la fecha actual
  const currentDate = new Date();
  const currentDayName = capitalizeFirstLetter(currentDate.toLocaleDateString('es-MX', { weekday: 'short' }));

  const dayName = capitalizeFirstLetter(currentDate.toLocaleDateString('es-MX', { weekday: 'long' }));
  const formattedDate = currentDate.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

    if (temperature >= 30 && temperature < 40){
      estadoTiempo = "soleado";
    } else if (temperature < 20 && temperature >= 10){
      estadoTiempo = "Temperatura baja";
    } else if (temperature >= 40 && temperature <60){
      estadoTiempo = "Extremadamente caluroso";
    }else if (temperature <10){
      estadoTiempo = "Extremadamente frío"
    } else if (temperature >=60){
      estadoTiempo = "Te estás quemando"
    }

    return(
        <>
          <div className="container">
            <div className="weather-side">
              <div className="weather-gradient">
                <div className="date-container">
                  <h2 className="date-dayname">{dayName}</h2>
                  <span className="date-day">{formattedDate}</span>
                  <i className="location-icon" data-feather="map-pin"></i>
                  <span className="location">Villahermosa, MX</span>
                </div>
                <div className="weather-container">
                  <i className="weather-icon" data-feather="sun"></i>
                  <h1 className="weather-temp">{temperature}°C</h1>
                  <h3 className="weather-desc">{estadoTiempo}</h3>
                </div>
              </div>
            </div>
            <div className="info-side">
              <div className="today-info-container">
                <div className="today-info">
                  <div className="precipitation">
                    <span className="title">PRECIPITACIÓN</span>
                    <span className="value">0 %</span>
                    <div className="clear"></div>
                  </div>
                  <div className="humidity">
                    <span className="title">HUMEDAD</span>
                    <span className="value">{humedad} %</span>
                    <div className="clear"></div>
                  </div>
                  <div className="wind">
                    <span className="title">VIENTO</span>
                    <span className="value">0 km/h</span>
                    <div className="clear"></div>
                  </div>
                </div>
              </div>
              <div className="week-container">
                <ul className="week-list">
                  <li className={currentDayName === 'Dom' ? 'active' : ''}>
                    <i className="day-icon" data-feather="sun"></i>
                    <span className="day-name">Dom</span>
                    <span className="day-temp">{temperature}°C</span>
                  </li>
                  <li className={currentDayName === 'Lun' ? 'active' : ''}>
                    <i className="day-icon" data-feather="sun"></i>
                    <span className="day-name">Lun</span>
                    <span className="day-temp">30°C</span>
                  </li>
                  <li className={currentDayName === 'Mar' ? 'active' : ''}>
                    <i className="day-icon" data-feather="cloud"></i>
                    <span className="day-name">Mar</span>
                    <span className="day-temp">21°C</span>
                  </li>
                  <li className={currentDayName === 'Mie' ? 'active' : ''}>
                    <i className="day-icon" data-feather="cloud-snow"></i>
                    <span className="day-name">Mie</span>
                    <span className="day-temp">18°C</span>
                  </li>
                  <li className={currentDayName === 'Jue' ? 'active' : ''}>
                    <i className="day-icon" data-feather="cloud-rain"></i>
                    <span className="day-name">Jue</span>
                    <span className="day-temp">34°C</span>
                  </li>
                  <li className={currentDayName === 'Vie' ? 'active' : ''}>
                    <i className="day-icon" data-feather="cloud-rain"></i>
                    <span className="day-name">Vie</span>
                    <span className="day-temp">56°C</span>
                  </li>
                  <div className="clear"></div>
                </ul>
              </div>
            </div>
          </div>
        </>
    )
};