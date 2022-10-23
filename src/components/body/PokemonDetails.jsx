import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/PokemonDetails.css';
import {getPokemonDetails} from '../../redux/actions/actions'
import { useLocation, useParams } from "react-router-dom";
import generateColorTypes from "../../utils/generateColorTypes";
import Loading from "./Loading";
import NotFound from "./NotFound";

export default function PokemonDetails () {

    const location = useLocation();
    const id = useParams().id;
    const {uuid} = location.state || 11;
    const containerRef = useRef()

    const dispatch = useDispatch()
    let pokemon = useSelector(state => state.pokemonDetails)
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        setLoading(true);
        dispatch(getPokemonDetails(id <= 40 ? id : uuid ? uuid : id)).then(()=> {
            setLoading(false)
            containerRef.current.scrollIntoView({behaviour: "smooth", block: "start"});
        })
    }, [dispatch, id, uuid])

    return (
        loading? <Loading />: pokemon.msg ? <NotFound msg={pokemon.msg} />:
        <div className="pokemon-details-container" ref={containerRef}>

            <div className="pokemon-details-intro" style={{backgroundColor: `${pokemon.types ? generateColorTypes(pokemon.types[0]).backgroundColor : generateColorTypes('')}`,
        color:`${pokemon.types ? generateColorTypes(pokemon.types[0]).color : generateColorTypes('')}` }}>
                <h1>{pokemon.name}</h1>
                <h2>N° {id}</h2>
                <div className="pokemon-details-image-container">
                    <img src={pokemon.sprite} className='pokemon-details-img' alt={`pokemon ${pokemon.name} img`} style={pokemon.createdBy && {borderRadius:'50%'} }/>
                </div>
            </div>

            <div className="pokemon-details-info">
                <h2>Characteristics</h2>
                <div className="info">
                    <h3>Height</h3>
                    <p>{pokemon.height} m</p>
                </div>
                <div className="info">
                    <h3>Weight</h3>
                    <p>{pokemon.weight} kg</p>
                </div>
            </div>

            <div className="pokemon-details-stats" style={{backgroundColor: 'transparent', color: 'inherit'} || {backgroundColor: `${pokemon.types ? generateColorTypes(pokemon.types[0]).backgroundColor : generateColorTypes('')}`
        ,color:`${pokemon.types ? generateColorTypes(pokemon.types[0]).color : generateColorTypes('')}`}}>

                <h2>Stats</h2>
                <div className="stat">
                    <h3>HP</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z" fill={{color: 'inherit !important'} || `${pokemon.types ? generateColorTypes(pokemon.types[0]).color : generateColorTypes('')}` }/></svg>
                    <p>{pokemon.hp}</p>
                </div>
                <div className="stat">
                    <h3>Attack</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M277.8 3.7c5.9-4.9 14.6-4.9 20.5 0l48 40c5.9 4.9 7.5 13.2 3.8 19.9l0 0 0 0 0 0 0 0-.1 .1-.3 .6c-.3 .5-.7 1.3-1.2 2.3c-1 2-2.6 5-4.4 8.6c-.5 .9-.9 1.9-1.4 2.9C376.9 97.4 400 134 400 176s-23.1 78.6-57.3 97.8c.5 1 1 2 1.4 2.9c1.8 3.7 3.3 6.6 4.4 8.6c.5 1 .9 1.8 1.2 2.3l.3 .6 .1 .1 0 0 0 0c3.6 6.7 2 15-3.8 19.9L304 343.5v19.8l35.6-24.5 41.1-28.2c42.8-29.4 68.4-78 68.4-130c0-31.1-9.2-61.6-26.5-87.5l-2.8-4.2c-4-6-3.5-14 1.3-19.5s12.7-7 19.2-3.7L433.1 80c7.2-14.3 7.2-14.3 7.2-14.3l0 0 0 0 .1 0 .3 .2 1 .5c.8 .4 2 1.1 3.5 1.9c2.9 1.7 7 4.1 11.8 7.3c9.6 6.4 22.5 16.1 35.4 29c25.7 25.7 52.7 65.6 52.7 119.3c0 53.1-26.4 100.5-51.2 133.6c-12.6 16.7-25.1 30.3-34.5 39.7c-4.7 4.7-8.7 8.4-11.5 10.9c-1.4 1.3-2.5 2.2-3.3 2.9l-.9 .8-.3 .2-.1 .1 0 0 0 0s0 0-10.2-12.3l10.2 12.3c-5.1 4.3-12.4 4.9-18.2 1.6l-75.6-43-32.7 22.5 45.5 31.3c1.8-.4 3.7-.7 5.7-.7c13.3 0 24 10.7 24 24s-10.7 24-24 24c-12.2 0-22.3-9.1-23.8-21L304 423.4v28.9c9.6 5.5 16 15.9 16 27.7c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-11.8 6.4-22.2 16-27.7V424.1l-40.3 27.7C229.8 463.3 219.9 472 208 472c-13.3 0-24-10.7-24-24s10.7-24 24-24c2.2 0 4.4 .3 6.5 .9l45.8-31.5-32.7-22.5-75.6 43c-5.8 3.3-13 2.7-18.2-1.6L144 400c-10.2 12.3-10.2 12.3-10.3 12.3l0 0 0 0-.1-.1-.3-.2-.9-.8c-.8-.7-1.9-1.7-3.3-2.9c-2.8-2.5-6.7-6.2-11.5-10.9c-9.4-9.4-21.9-23-34.5-39.7C58.4 324.5 32 277.1 32 224c0-53.7 26.9-93.6 52.7-119.3c12.9-12.9 25.8-22.6 35.4-29c4.8-3.2 8.9-5.7 11.8-7.3c1.5-.8 2.6-1.5 3.5-1.9l1-.5 .3-.2 .1 0 0 0 0 0s0 0 7.2 14.3l-7.2-14.3c6.5-3.2 14.3-1.7 19.2 3.7s5.3 13.4 1.3 19.5l-2.8 4.2C137.2 119 128 149.5 128 180.6c0 51.9 25.6 100.6 68.4 130l41.1 28.2L272 362.6V343.5l-42.2-35.2c-5.9-4.9-7.5-13.2-3.8-19.9l0 0 0 0 0 0 .1-.1 .3-.6c.3-.5 .7-1.3 1.2-2.3c1-2 2.6-5 4.4-8.6c.5-.9 .9-1.9 1.4-2.9C199.1 254.6 176 218 176 176s23.1-78.6 57.3-97.8c-.5-1-1-2-1.4-2.9c-1.8-3.7-3.3-6.6-4.4-8.6c-.5-1-.9-1.8-1.2-2.3l-.3-.6-.1-.1 0 0 0 0 0 0c-3.6-6.7-2-15 3.8-19.9l48-40zM252.2 122.9c-17 11.5-28.2 31-28.2 53.1s11.2 41.6 28.2 53.1C259 210.2 264 190.9 264 176s-5-34.2-11.8-53.1zm71.5 106.2c17-11.5 28.2-31 28.2-53.1s-11.2-41.6-28.2-53.1C317 141.8 312 161.1 312 176s5 34.2 11.8 53.1z" fill={{ color: 'inherit'} ||`${pokemon.types ? generateColorTypes(pokemon.types[0]).color : generateColorTypes('')}` }/></svg>
                    <p>{pokemon.attack}</p>
                </div>
                <div className="stat">
                    <h3>Special Attack</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z" fill={{color: 'inherit'} ||`${pokemon.types ? generateColorTypes(pokemon.types[0]).color : generateColorTypes('')}` }/></svg>
                    <p>{pokemon['special-attack']}</p>
                </div>
                <div className="stat">
                    <h3>Defense</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.7 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"fill={{color: 'inherit'} ||`${pokemon.types ? generateColorTypes(pokemon.types[0]).color : generateColorTypes('')}` }/></svg>
                    <p>{pokemon.defense}</p>
                </div>
                <div className="stat">
                    <h3>Special Defense</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM144 221.3c0-33.8 27.4-61.3 61.3-61.3c16.2 0 31.8 6.5 43.3 17.9l7.4 7.4 7.4-7.4c11.5-11.5 27.1-17.9 43.3-17.9c33.8 0 61.3 27.4 61.3 61.3c0 16.2-6.5 31.8-17.9 43.3l-82.7 82.7c-6.2 6.2-16.4 6.2-22.6 0l-82.7-82.7c-11.5-11.5-17.9-27.1-17.9-43.3z"fill={{color: 'inherit'} ||`${pokemon.types ? generateColorTypes(pokemon.types[0]).color : generateColorTypes('')}` }/></svg>
                    <p>{pokemon['special-defense']}</p>
                </div>
                <div className="stat">
                    <h3>Speed</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"fill={{color: 'inherit'} ||`${pokemon.types ? generateColorTypes(pokemon.types[0]).color : generateColorTypes('')}` }/></svg>
                    <p>{pokemon.speed}</p>
                </div>
        
            </div>

            <div className="pokemon-details-types">
                <h2>Types</h2>
                {pokemon.types?.map(p => {
                    return(
                        <div className="type" key={p}>
                            <p>{p}</p>
                            <img src={generateColorTypes(p).icon || "#"} alt={`${p} icon`} />
                        </div>
                    )
                })}
            </div>

            <div className="pokemon-details-abilities">
                <h2>Abilities</h2>
                {pokemon.abilities?.map(p => {
                    return(
                        <div className="ability" key={p}>
                            <p>{p}</p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}