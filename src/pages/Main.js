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
            <div className='fondo'>
                <div className='content'>
                    <div className='row'>
                        <p className='date'>{temperature} °C</p>
                    </div>
                    <Time/>
                </div>
            </div>
        </>
    )
};