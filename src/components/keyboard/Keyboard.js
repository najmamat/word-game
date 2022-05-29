import React, {useEffect} from 'react';
import './Keyboard.css'
import {motion} from "framer-motion";

const Keyboard = ({keyPress, db}) => {

    const keys =[['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['ENTER','z','x','c','v','b','n','m','BACKSPACE']
    ];

    const handleKeyboardPress = (key) => {
        if (key.key === "Enter") {
            keyPress("ENTER")
        } else if (key.key === "Backspace"){
            keyPress("\u232b")
        }
        else if (key.key.length === 1 && key.key.toLowerCase() !== key.key.toUpperCase())
            keyPress(key.key.toUpperCase())
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyboardPress)
    }, []);

    return (
        <div className={"keyboard-part"}>
            {keys.map((item,index)=>(
                <div className='radek' key={index}>
                    {
                        item.map((key,keyIndex)=>(
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                key={keyIndex}
                                onClick={()=>{keyPress(key)}}
                                className={`${db && db.correctChars.includes(key)?"key-correct":
                                    (db && db.presentChars.includes(key) ?"key-present":
                                        db && db.absentChars.includes(key)?"key-absent":"klavesa")}`}>
                                {key.toUpperCase()}
                            </motion.button>
                        ))
                    }
                </div>
            ))}
        </div>
        )
};

export default Keyboard;