import React, { useEffect, useState, useRef  } from 'react';
import anime from 'animejs';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue  } from 'firebase/database';
import '../styles/temp.css'

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

export default function Temperature() {
    const elementRef = useRef(null);
    const elementRef2 = useRef(null);

    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const mounth = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hour = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const [isImageScaled, setIsImageScaled] = useState(false);
    const [showBlur, setShowBlur] = useState(false);

    const handleButtonClick = () => {
        //setIsImageScaled(!isImageScaled);
        //setShowBlur(true);
    };

    const [temperature, setTemperature] = useState('');

    const [postId, setPostId] = useState('-Nb0rU7jYebmAeeUIiqe');
    let tempRef; 

    useEffect(() => {
        const element = elementRef.current;
        const element2 = elementRef2.current;

        anime({
            targets: element,
            translateY: [-100, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 5000
        });

        anime({
            targets: element2,
            translateX: [-100, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 5000
        });

        tempRef = ref(db, 'temperature/' + postId + '/grados');
        const unsubscribe = onValue(tempRef, (snapshot) => {
            const data = snapshot.val();
            setTemperature(data);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    function updateDateTime() {
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = fechaActual.getMonth() + 1;
        const day = fechaActual.getDate();
        const hour = fechaActual.getHours();
        const minutes = fechaActual.getMinutes();

        document.getElementById('time').innerHTML = `${hour}:${minutes}`;
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        document.getElementById('date').innerHTML = `${day} de ${meses[month - 1]} del ${year}`;
    }

    setInterval(updateDateTime, 1000);

    return (
        <div className={`app ${showBlur ? 'blur' : ''}`}>
            <div className={`back-container ${isImageScaled ? 'scaled' : ''}`}>
            <div className='content'>
                <p className='time' id='time'>Time</p>
                <p className='date' id='date'>Date</p>
                <button className={`button-container`} onClick={handleButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                </button>
            </div>
            </div>
        </div>
    )
}