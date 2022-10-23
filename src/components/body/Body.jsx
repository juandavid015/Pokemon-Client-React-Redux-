import React  from "react";
import { Route, useLocation } from "react-router-dom";
import Add from "./Add";
import Added from "./Added";
import Home from "./Home";
import LandinPage from "./LandingPage";
import PokemonDetails from "./PokemonDetails";
import '../../styles/Body.css';

export default function Body() {
    let location = useLocation();
    
    return(

        location.pathname === '/' ?  
        <div className="container">
            <main>
                <Route path={'/'} component={LandinPage} />
            </main>
        </div>:

        <div className="container">
            <main>
                <Route exact path={'/home'} component={Home} />
                <Route exact path={`/home/pokemon/:id`} component={PokemonDetails} />
                <Route exact path={'/add'} component={Add} /> 
                <Route exact path={"/added"} component={Added} />
            </main>
        </div>
    )
}