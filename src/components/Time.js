import React, { useEffect, useState, useRef  } from 'react';
import anime from 'animejs';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import '../styles/temp.css'

export default function Time() {
    //const {onClick}= this.props
    const elementRef = useRef(null);
    const elementRef2 = useRef(null);


    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const mounth = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hour = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();

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
        <>
            <div className='content'>
                <p className='time' id='time'>Time</p>
                <p className='date' id='date'>Date</p>
            </div>
        </>
    )
}


/*

<button className='button-container'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
</button>
*/