import React from "react";
import '../../styles/NotFound.css';
import pokeFail from '../../pocket-monster.svg'
export default function NotFound({msg}) {
    return(
        <div className="notfound-container">
                <img src={pokeFail} alt= 'icon of pokemon not happy'/>
                <p>{msg}</p>
        </div>
    )
}