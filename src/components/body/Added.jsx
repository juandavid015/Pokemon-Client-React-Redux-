import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/Added.css';
import { pokemonCreated } from '../../redux/actions/actions';
import Loading from "./Loading";
import NotFound from "./NotFound";
import PokemonCard from "./PokemonCard";
import Subcard from "./Subcard";

export default function Added () {
    
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemonCreated)

    useEffect(()=> {

        setLoading(true);
        dispatch(pokemonCreated()).then(()=> {
            setLoading(false);
        })

    },[dispatch])

    return (

        loading ? <Loading /> : pokemon.msg ? <NotFound msg={pokemon.msg} />:
        <>
            <h1>My pokemon</h1>
            <div className="added-container">
                
            {pokemon?.map(p => 
            <div className="added-content" key={p.uuid}>
                <PokemonCard img={p.sprite} name={p.name} types={p.types.map(t => t.name)} uuid={p.uuid} bgColor={p.types.map(t => t.name)} key={p.uuid}/>
                <Subcard attack={p.attack} defense={p.defense} height={p.height} weight={p.weight} bgColor={p.types.map(t => t.name)[0]}/>
            </div>
            
            )}
            </div>
        </>
    )
}