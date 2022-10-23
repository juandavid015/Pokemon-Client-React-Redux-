import React from "react";
// import pokemon from '../../pokemon.svg'
import egg from '../../egg.svg'
import '../../styles/Loading.css';
export default function Loading () {
    return (
        <div className="loading-container">
            <img src={egg} alt="pokemon ball icon" className="loading-icon"/>
            <div>Loading...</div>
        </div>
    )
}