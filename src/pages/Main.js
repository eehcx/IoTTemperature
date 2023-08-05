import { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue  } from 'firebase/database';

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
    //const [color, setColor] = useState('#ccc');
    const [temperature, setTemperature] = useState('');
    const [postId, setPostId] = useState('-Nb0rU7jYebmAeeUIiqe');
    let tempRef; 

    useEffect(() => {
        tempRef = ref(db, 'temperature/' + postId + '/grados');

        const unsubscribe = onValue(tempRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(data);
            setTemperature(data);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <h1>Temperatura</h1>
            <input  type="text" value={temperature} readOnly />
        </>
    )
}