import React, { useEffect, useState, useRef  } from 'react';
import anime from 'animejs';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue  } from 'firebase/database';
import '../styles/temp.css'
import Time from '../components/Time'

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

/*
export default function Temperature() {
    const [formularioActual, setFormularioActual] = useState(1);
    const [visible, setVisible] = React.useState(false);
    const [showBlur, setShowBlur] = useState(null);

    function handleButtonClick() {
        setFormularioActual(formularioActual + 1);
    };

    return (
        <>
            {formularioActual === 1 && (
                <div className={`app ${showBlur ? 'blur' : ''}`}>
                    <div className='back-container'>
                        <div className='content'>
                            <Time onClick={this.handleButtonClick} />
                        </div>
                    </div>
                </div>
            )}
            {formularioActual === 2 &&(
                <>
                    <Temp />
                </>
            )}
        </>
    )
}*/

export default function Temp() {

    const [temperature, setTemperature] = useState('');

    const [postId, setPostId] = useState('-Nb0rU7jYebmAeeUIiqe');
    let tempRef; 

    useEffect(() => {

        tempRef = ref(db, 'temperature/' + postId + '/grados');
        const unsubscribe = onValue(tempRef, (snapshot) => {
            const data = snapshot.val();
            setTemperature(data);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    let svg;

    if (temperature >=30){
        svg = '../assets/images/sun.svg';
    } else if(temperature < 10) {
        svg = '../assets/images/snow.svg';
    }

    return(
        <>
            <div className="container">
      <div className="weather-side">
        <div className="weather-gradient">
          <div className="date-container">
            <h2 className="date-dayname">Tuesday</h2>
            <span className="date-day">15 Jan 2019</span>
            <i className="location-icon" data-feather="map-pin"></i>
            <span className="location">Paris, FR</span>
          </div>
          <div className="weather-container">
            <i className="weather-icon" data-feather="sun"></i>
            <h1 className="weather-temp">29°C</h1>
            <h3 className="weather-desc">Sunny</h3>
          </div>
        </div>
      </div>
      <div className="info-side">
        <div className="today-info-container">
          <div className="today-info">
            <div className="precipitation">
              <span className="title">PRECIPITATION</span>
              <span className="value">0 %</span>
              <div className="clear"></div>
            </div>
            <div className="humidity">
              <span className="title">HUMIDITY</span>
              <span className="value">34 %</span>
              <div className="clear"></div>
            </div>
            <div className="wind">
              <span className="title">WIND</span>
              <span className="value">0 km/h</span>
              <div className="clear"></div>
            </div>
          </div>
        </div>
        <div className="week-container">
          <ul className="week-list">
            <li className="active">
              <i className="day-icon" data-feather="sun"></i>
              <span className="day-name">Tue</span>
              <span className="day-temp">29°C</span>
            </li>
            <li>
              <i className="day-icon" data-feather="cloud"></i>
              <span className="day-name">Wed</span>
              <span className="day-temp">21°C</span>
            </li>
            <li>
              <i className="day-icon" data-feather="cloud-snow"></i>
              <span className="day-name">Thu</span>
              <span className="day-temp">08°C</span>
            </li>
            <li>
              <i className="day-icon" data-feather="cloud-rain"></i>
              <span className="day-name">Fri</span>
              <span className="day-temp">19°C</span>
            </li>
            <div className="clear"></div>
          </ul>
        </div>
        <div className="location-container">
          <button className="location-button">
            <i data-feather="map-pin"></i>
            <span>Change location</span>
          </button>
        </div>
      </div>
    </div>
        </>
    )
};