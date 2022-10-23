import React, { useRef } from "react";
import { useEffect } from "react";
import '../../styles/PokemonList.css';
import NotFound from "./NotFound";
import PokemonCard from "./PokemonCard";

export default function PokemonList({list}) {

    const containerRef = useRef();

    useEffect(()=> {
        window.scrollTo({top: containerRef.current.offsetTop, behavior:"smooth"})
    })
    
    return (
        
        list.length ?
        <div className="pokemon-list-container" ref={containerRef}>
            
            {
                 list?.map((p, i) => {
                    return(
                        <PokemonCard
                        img= {p.sprite}
                        name = {p.name}
                        types = {p.types}
                        key= {i}
                        id= {p.id}
                        uuid= {p.uuid}
                        attack = {p.attack}
                        defense = {p.defense}
                        height = {p.height}
                        weight = {p.weight}
                        />
                    )
                })  
            }
        </div>:
        
        <NotFound msg ={'No results'}/>

    )
}