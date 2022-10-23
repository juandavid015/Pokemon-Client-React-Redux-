import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/Add.css';
import validate from "../../utils/validate";
import {createPokemon} from '../../redux/actions/actions';
import { useRef } from "react";
import { useEffect } from "react";
export default function Add() {

    const dispatch = useDispatch();

    // global states
    const types = useSelector(state => state.types);
    const abilities = useSelector(state => state.abilities);

    // local states
    const [processing, setProcessing] = useState(false);
    const [createStatus, setCreateStatus] = useState({})
    const [validateState, setValidateState] = useState(false);
    const [errForm, setErrForm] = useState({})
    const [pokemon, setPokemon] = useState({
        sprite: "",
        name: "",
        types: [],
        abilities: [],
        hp: 0,
        attack: 0,
        "special-attack": 0,
        defense: 0,
        "special-defense": 0,
        speed: 0,
        height: 0,
        weight: 0,
        createdBy: true
    })

    // Have referenced the range input to acces its properties
    let inputRangeRef = useRef();

    let handleOutPut = (e) => {

         // setting the position dinamically for output value // move and track according thumb input
        inputRangeRef.current = e.target;
        const value = inputRangeRef.current.value;
        const min = inputRangeRef.current.min;
        const max = inputRangeRef.current.max;
        
        const percentage = ((value - min) * 100 / (max - min));
        e.target.nextSibling.style.position = 'relative';
        e.target.nextSibling.style.left = `calc(${percentage}% - ${percentage * 0.1}%`;
    }

    const handleChange = (e) => {
        
        // handling the changes whenever user select the options for the creation of the pokemon
        
        if (e.target.name === 'types' || e.target.name === 'abilities') {
            //**handling multiple input values**
            if(e.target.checked === false) {
                // add checked options
                let i = pokemon[e.target.name].indexOf(e.target.value);
                let newPokemon = {...pokemon, [e.target.name]: [...pokemon[e.target.name].slice(0, i), ...pokemon[e.target.name].slice(i + 1, pokemon[e.target.name].length)]};
                setPokemon(newPokemon)
                validate(newPokemon, setErrForm, setValidateState);

            } else {
                // delete checked options
                let newPokemon = {...pokemon, [e.target.name]: [...pokemon[e.target.name], e.target.value]};
                setPokemon(newPokemon)
                validate(newPokemon, setErrForm, setValidateState);
            }

        } else {
            // **handling (add) non multiple input value**
            let newPokemon = {...pokemon, [e.target.name]: e.target.value}
            setPokemon(newPokemon);
            validate(newPokemon, setErrForm, setValidateState);
            
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        validate(pokemon, setErrForm, setValidateState);
        
        if (validateState) {

            setProcessing(true);
            dispatch(createPokemon(pokemon)).then(res => {

                setCreateStatus(res);
                
                if(res.success) {
                    // re updating to default
                    setPokemon({
                        sprite: "",
                        name: "",
                        types: [],
                        abilities: [],
                        hp: 0,
                        attack: 0,
                        "special-attack": 0,
                        defense: 0,
                        "special-defense": 0,
                        speed: 0,
                        height: 0,
                        weight: 0,
                        createdBy: true
                    })
                    // checking all inputs to false
                    Array.from(e.target).forEach(t => t.checked = false)
                    setProcessing(false);
                    setValidateState(false)

                } setProcessing(false);
            })
            
        } else {
            
            setCreateStatus({error: 'Please verify the fields'})
        }
    }
    
    useEffect(()=> {
        //cleaning state of create if all Ok 
        if(!Object.keys(errForm).length) setCreateStatus({})
    },[errForm])
  
    return(
        <div className="add-container">
            <h1>Create your Pokemon!</h1>

            <form className="form-add-container" onSubmit={(e)=> handleSubmit(e)}>

                <div className="form-section" id="section1">
                    <div className="section-step">
                        <span>1</span>
                    </div>
                    <h2>How is it looks like?</h2>
                    
                    <div className="add-intro-container">
                        <div className="form-sprite-content">
                            <label htmlFor="sprite">Image</label>
                            <input id="sprite" name="sprite" value={pokemon.sprite} type='url'
                            onChange={(e)=> handleChange(e)}/>
                            {errForm.sprite && <p className="errMsg">{errForm.sprite}</p>}
                        </div>

                        <div className="form-name-content">
                            <label htmlFor="name" >Name</label>
                            <input type='text' id="name" name="name" value={pokemon.name}
                            onChange={(e)=> handleChange(e)}/>
                            {errForm.name && <p className="errMsg">{errForm.name}</p>}
                        </div>
                    </div>

                <div className="add-info-container">

                        <div className="form-height-content">
                            <label htmlFor="height" >Height (m) </label>
                            <input type='number' id="height" name="height" value={pokemon.height}
                            onChange={(e)=> handleChange(e)}/>
                            {errForm.height && <p className="errMsg">{errForm.height}</p>}
                        </div>

                        <div className="form-weight-content">
                            <label htmlFor="weight" >Weight (kg)</label>
                            <input type='number' id="weight" name="weight" value={pokemon.weight}
                            onChange={(e)=> handleChange(e)}/>
                            {errForm.weight && <p className="errMsg">{errForm.weight}</p>}
                        </div>

                    </div>
                   
                </div>


                <div className="form-section" id="section2">

                    <div className="section-step">
                        <span>2</span>
                    </div>
                    <h2>Is it strong?</h2>
                    
                     <div className="add-stats-container">

                        <div className="form-hp-content">
                            <label htmlFor="hp" >hp</label>
                            <input type='range' id="hp" name="hp" value={pokemon.hp} min={0} max={500}
                            onChange={(e)=> {handleChange(e) ; handleOutPut(e)}} />
                            <output>
                                {pokemon.hp}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  aria-hidden='true'><path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z"/></svg>
                            </output>
                            {errForm.hp && <p className="errMsg">{errForm.hp}</p>}
                        </div>

                        <div className="form-attack-content">
                            <label htmlFor="attack" >attack</label>
                            <input type='range' id="attack" name="attack" value={pokemon.attack} min={0} max={500}
                            onChange={(e)=> {handleChange(e) ; handleOutPut(e)}} />
                            <output>
                                {pokemon.attack}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  aria-hidden={true}><path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-2.8-5.6-5.6-11.2-9.8-16.8l-50.6 58.8s-81.4-103.6-87.1-110.6C133.1 243.8 112 273.2 112 306.8C112 375.4 162.6 416 225.7 416z"/></svg>
                            </output>
                            {errForm.attack && <p className="errMsg">{errForm.attack}</p>}
                        </div>

                        <div className="form-defense-content">
                            <label htmlFor="defense" >defense</label>
                            <input type='range' id="defense" name="defense" value={pokemon.defense} min={0} max={500}
                            onChange={(e)=> {handleChange(e) ; handleOutPut(e)}}/>
                            <output>
                                {pokemon.defense}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  aria-hidden={true}><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.7 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"/></svg>
                            </output>
                            {errForm.defense && <p className="errMsg">{errForm.defense}</p>}
                        </div>

                        <div className="form-special-attack-content">
                            <label htmlFor="special-attack" >special-attack</label>
                            <input type='range' id="special-attack" name="special-attack" value={pokemon['special-attack']} min={0} max={500}
                            onChange={(e)=> {handleChange(e) ; handleOutPut(e)}}/>
                            <output>
                                {pokemon["special-attack"]}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"  aria-hidden={true}><path d="M352 124.5l-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4L294.4 28.8c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0 304 0H416h32 16c30.2 0 58.7 14.2 76.8 38.4l57.6 76.8c6.2 8.3 9.6 18.4 9.6 28.8c0 26.5-21.5 48-48 48H538.5c-17 0-33.3-6.7-45.3-18.7L480 160H448v21.5c0 24.8 12.8 47.9 33.8 61.1l106.6 66.6c32.1 20.1 51.6 55.2 51.6 93.1C640 462.9 590.9 512 530.2 512H496 432 32.3c-3.3 0-6.6-.4-9.6-1.4C13.5 507.8 6 501 2.4 492.1C1 488.7 .2 485.2 0 481.4c-.2-3.7 .3-7.3 1.3-10.7c2.8-9.2 9.6-16.7 18.6-20.4c3-1.2 6.2-2 9.5-2.2L433.3 412c8.3-.7 14.7-7.7 14.7-16.1c0-4.3-1.7-8.4-4.7-11.4l-44.4-44.4c-30-30-46.9-70.7-46.9-113.1V181.5v-57zM512 72.3c0-.1 0-.2 0-.3s0-.2 0-.3v.6zm-1.3 7.4L464.3 68.1c-.2 1.3-.3 2.6-.3 3.9c0 13.3 10.7 24 24 24c10.6 0 19.5-6.8 22.7-16.3zM130.9 116.5c16.3-14.5 40.4-16.2 58.5-4.1l130.6 87V227c0 32.8 8.4 64.8 24 93H112c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7L171 232.3 18.4 255.8c-7 1.1-13.9-2.6-16.9-9s-1.5-14.1 3.8-18.8L130.9 116.5z"/></svg>                            
                            </output>
                            {errForm['special-attack'] && <p className="errMsg">{errForm['special-attack']}</p>}
                        </div>

                        <div className="form-special-defense-content">
                            <label htmlFor="special-defense" >special-defense</label>
                            <input type='range' id="special-defense" name="special-defense" value={pokemon["special-defense"]} min={0} max={500}
                            onChange={(e)=> {handleChange(e) ; handleOutPut(e)}}/>
                            <output>
                                {pokemon["special-defense"]}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden={true}><path d="M64.7 125.8l53.2 31.9c7.8 4.7 17.8 2 22.2-5.9L217.6 12.1c3-5.4-.9-12.1-7.1-12.1c-1.6 0-3.2 .5-4.6 1.4L63.9 98.8c-9.6 6.6-9.2 20.9 .8 26.9zM32 171.7V295.3c0 8 10.4 11 14.7 4.4l60-92c5-7.6 2.6-17.8-5.2-22.5L56.2 158C45.6 151.6 32 159.3 32 171.7zM326.4 12.1l77.6 139.6c4.4 7.9 14.5 10.6 22.2 5.9l53.2-31.9c10-6 10.4-20.3 .8-26.9L338.1 1.4c-1.4-.9-3-1.4-4.6-1.4c-6.2 0-10.1 6.7-7.1 12.1zM512 171.7c0-12.4-13.6-20.1-24.2-13.7l-45.3 27.2c-7.8 4.7-10.1 14.9-5.2 22.5l60 92c4.3 6.7 14.7 3.6 14.7-4.4V171.7zm-49.3 246L302.1 436.6c-8.1 .9-14.1 7.8-14.1 15.9v52.8c0 3.7 3 6.8 6.8 6.8c.8 0 1.6-.1 2.4-.4l172.7-64c6.1-2.2 10.1-8 10.1-14.5c0-9.3-8.1-16.5-17.3-15.4zM249.2 512c3.7 0 6.8-3 6.8-6.8V452.6c0-8.1-6.1-14.9-14.1-15.9l-160.6-19c-9.2-1.1-17.3 6.1-17.3 15.4c0 6.5 4 12.3 10.1 14.5l172.7 64c.8 .3 1.6 .4 2.4 .4zM57.7 382.9l170.9 20.2c7.8 .9 13.4-7.5 9.5-14.3l-85.7-150c-5.9-10.4-20.7-10.8-27.3-.8L46.2 358.2c-6.5 9.9-.3 23.3 11.5 24.7zm439.6-24.8L418.9 238.1c-6.5-10-21.4-9.6-27.3 .8L306.2 388.5c-3.9 6.8 1.6 15.2 9.5 14.3l170.1-20c11.8-1.4 18-14.7 11.5-24.6zm-216.9 11l78.4-137.2c6.1-10.7-1.6-23.9-13.9-23.9H199.1c-12.3 0-20 13.3-13.9 23.9l78.4 137.2c3.7 6.4 13 6.4 16.7 0zM190.4 176H353.6c12.2 0 19.9-13.1 14-23.8l-80-144c-2.8-5.1-8.2-8.2-14-8.2h-3.2c-5.8 0-11.2 3.2-14 8.2l-80 144c-5.9 10.7 1.8 23.8 14 23.8z"/></svg>
                            </output>
                            {errForm['special-defense'] && <p className="errMsg">{errForm['special-defense']}</p>}
                        </div>

                        <div className="form-speed-content">
                            <label htmlFor="speed" >speed</label>
                            <input type='range' id="speed" name="speed" value={pokemon.speed} min={0} max={500}
                            onChange={(e)=> {handleChange(e) ; handleOutPut(e)}}/>
                            <output>
                                {pokemon.speed}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden={true}><path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"/></svg>    
                            </output>
                            {errForm.speed && <p className="errMsg">{errForm.speed}</p>}
                        </div>

                    </div>
                        
                </div>


                <div className="form-section"id="section3">
                    <div className="section-step">
                        <span>3</span>
                    </div>
                    <h2>Sure it can do amazing things...</h2>
                    
                    <div className="form-types-container">

                        <h3>Select types</h3>
                        <div className="form-types-content">
                            {types?.map(type => {
                                return(

                                    <div className="option-checkbox" key={type.name}>      
                                        <label htmlFor={type.name} >{type.name}</label>
                                        <input type='checkbox' id={type.name} name="types" value={type.name}
                                        onChange={(e)=> handleChange(e)}/>
                                    </div>
                                    
                                )
                            })}
                            
                        </div>
                        {errForm.types && <p className="errMsg">{errForm.types}</p>}

                    </div>
                    
                    
                    <div className="form-abilities-container">

                        <h3>Select abilities</h3>
                        <div className="form-abilities-content">
                            {abilities?.map(ability => {
                                return(

                                    <div className="option-checkbox" key={ability.name}>
                                        <label htmlFor={ability.name} >{ability.name}</label>
                                        <input type='checkbox' id={ability.name} name="abilities" value={ability.name}
                                        onChange={(e)=> handleChange(e)}/>
                                    </div>
                                    
                                )
                            })}
                        </div>
                        {errForm.abilities && <p className="errMsg">{errForm.abilities}</p>}

                    </div>

                </div>


                <div className="submit-div">
                    <button type="submit" className="submit-btn">Create Pokemon</button>  
                    {processing && <p className="processingMsg">Processing...</p>}
                </div>

            </form>

                {/*Showing multiple errors depending on creation status and validation filling*/}
                 <>
                        {   Object.keys(errForm).length && createStatus.hasOwnProperty('error') ?
                             <> 
                                {createStatus.error && <p className="errMsg">{createStatus.error}</p>} 
                             </>
                            
                            :!Object.keys(errForm).length && createStatus.hasOwnProperty('error') ? 
                            <>
                                {createStatus.error && <p className="errMsg">{createStatus.error}</p>} 
                            </>: 
                            !Object.keys(errForm).length && createStatus.hasOwnProperty('success') ? 
                            <>
                                {createStatus.success && <p className="succesMsg">{createStatus.success}</p>} 
                            </>:
                             !Object.keys(errForm).length && createStatus.hasOwnProperty('msg') ? 
                             <>
                                 {createStatus.msg && <p className="errMsg">{createStatus.msg}</p>} 
                             </>:  
                            <></>}
                 </>      
        </div>
    )
}