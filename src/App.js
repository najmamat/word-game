import './App.css';
import { observer, useLocalObservable } from 'mobx-react-lite'
import { configure } from "mobx"
import React, {useEffect} from 'react';
import Keyboard from "./components/keyboard/Keyboard";
import Row from "./components/row/Row";
import DB from "./data/gameState.js"
import {slovnik} from "./data/slovnik";
import winsound from "./sounds/484267__inspectorj__party-pack-horn-coil-01-long-01.wav"
import losesound from "./sounds/219876__polmdx__buu-loser-shout.mp3"
import ModalWin from "./components/modals/ModalWin";
import ModalLose from "./components/modals/ModalLose";

export default observer(function App() {
    const winSound = new Audio(winsound);
    const loseSound = new Audio(losesound);

    const db = useLocalObservable(() => DB)
    configure({enforceActions: "never"})

    function refreshPage(){
        window.location.reload();
    }

    useEffect(() => {
        db.init()
    }, []);

    const keyPress = (k) => {
        if (db.win || db.lose){
            return
        }
        if (k === 'ENTER') {
            let word = db.guessArray[db.currentRowIndex]
            if (slovnik[word.charAt(0)].includes(word)){
                db.currentRowIndex += 1
                db.checkChars(word)
                if (db.win){
                    winSound.play();
                }
                if (db.lose){
                    loseSound.play();
                }
                console.log(`${word} added`)
            } else {
                if (db.guessArray[db.currentRowIndex].length < 5){
                    alert(`${word} is too short`)
                } else {
                    alert(`${word} doesnt exist`)
                }
            }
        } else if (k === 'BACKSPACE' || k === '\u232b') {
            db.guessArray[db.currentRowIndex] = db.guessArray[db.currentRowIndex].slice(0,
                db.guessArray[db.currentRowIndex].length - 1)
        } else {
            if (db.guessArray[db.currentRowIndex].length < 5) {
                db.guessArray[db.currentRowIndex] = db.guessArray[db.currentRowIndex] + k.toLowerCase()
            }
        }
    }

    return (
    <div className={"App"}>
        <div className={'header'}>
            <h1>WORD GAME</h1>
        </div>
        {db.win && <ModalWin refresh={refreshPage} solution={db.solution}/>}
        {db.lose && <ModalLose refresh={refreshPage} solution={db.solution}/> }
        {db.guessArray.map((_,i) => (
            <Row key={i} solution={db.solution.toUpperCase()} guess={db.guessArray[i].toUpperCase()} used={i < db.currentRowIndex}/>
        ))}
        {/*db.solution*/}
        <Keyboard keyPress={keyPress} db={db}/>
    </div>
  );
})

