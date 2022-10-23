import React from "react";
import { Link } from "react-router-dom";
import '../../styles/LadingPage.css';
import img from '../../pokemonBg.jpg'

export default function LandinPage() {
    return(
        <div className="landing-page-container">
            <div className="landing-page-content">
               <h1>Gotta catch'Em all</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet inventore id libero. Dolore, ipsa!</p>
                <button type="button" className="home-btn">
                    <Link to={'/home'}>Go!</Link>
                </button>
            </div>
            <div className="landing-page-aside">
                <img src={img} alt='pokemon background' />
            </div>
        </div>
    )
}