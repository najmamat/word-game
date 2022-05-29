import React from "react";
import "./Modal.css"

const Modal = ({refresh, solution}) => {
    return (
        <div className={"modal"}>
            <div className={"contentBody"}>
                <h1>{solution.toUpperCase()}</h1>
                <h2>YOU WON!</h2>
                <button className={"button-4"} type="button" onClick={refresh}>
                    <b>Play again</b>
                </button>
            </div>
        </div>
    )
}
export default Modal