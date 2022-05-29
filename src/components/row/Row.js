import React from 'react';
import './Row.css'
import {motion} from "framer-motion";

const variants = {
    unguessed: { background: "white" },
    correct: { background: "#3F681C" },
    present:{ background: "#FFBB00" },
    absent:{ background: "gray" }
}

const Row = ({ guess, used, solution}) => {
    return (
            <motion.div className={"row"}>
                {new Array(5).fill(0).map((_, i) => {
                    const bgColor = !used ? 'not-guessed'
                        : guess[i] === solution[i] ? 'exact-guessed'
                            : solution.includes(guess[i]) ? 'char-guessed'
                                : 'not-guessed'
                    return(
                    <motion.div
                        className={`ctverecek ${bgColor}`}
                        variants={variants}
                        animate={!used ? 'unguessed'
                            : guess[i] === solution[i] ? 'correct'
                                : solution.includes(guess[i]) ? 'present'
                                    : 'absent'}
                        initial={"unguessed"}
                        transition={{ delay:0.25*i}}
                    >
                        {guess[i]}
                    </motion.div>
                )})}
            </motion.div>
    )
};

export default Row;