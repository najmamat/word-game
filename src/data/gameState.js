import { slovnik } from './slovnik'

export default {
    solution: '',
    guessArray: [],
    currentRowIndex: 0,
    presentChars: [],
    absentChars: [],
    correctChars: [],

    init() {
        let alphabetIndex = Math.floor(Math.random() * 26);
        let wordIndex = Math.floor(Math.random() * slovnik[String.fromCharCode(97 + alphabetIndex)].length);
        this.solution = slovnik[String.fromCharCode(97 + alphabetIndex)][wordIndex]
        this.guessArray.replace(new Array(6).fill(''))
        this.currentRowIndex = 0
    },
    checkChars(word){
        let wordArray = word.split('')
        for (let i = 0; i < wordArray.length; i++) {
            let char = wordArray[i]
            if (i === this.solution.split('').indexOf(char)){
                this.correctChars.push(char)
            } else if (this.solution.includes(char)){
                this.presentChars.push(char)
            } else {
                this.absentChars.push(char)
            }
        }
    },
    get win() {
        return this.guessArray[this.currentRowIndex-1] === this.solution
    },
    get lose() {
        return (this.currentRowIndex === 6 && this.guessArray[this.currentRowIndex-1] !== this.solution)
    }
}