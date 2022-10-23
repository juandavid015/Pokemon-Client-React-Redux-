import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { deletePokemon } from "../../redux/actions/actions";
import '../../styles/PokemonCard.css';
import generateColorTypes from "../../utils/generateColorTypes";

export default function PokemonCard ({img, name, types, id, uuid}) {
    
    const dispatch = useDispatch();
    const location = useLocation();
    const [processingDelete, setProcessingDelete] = useState(false);

    const handleDelete = (name) => {

        setProcessingDelete(true);
        dispatch(deletePokemon(name)).then(()=> {
            setProcessingDelete(false)
        })
    }

    return(

        <div className="pokemon-card-container">

            {
                location.pathname === '/added' && 
                !processingDelete ? 
                <button type='button' className="card-delete" onClick={()=> handleDelete(name)}>
                    <span >X</span>
                </button>: location.pathname === '/added' && 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="processingIcon"><path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"/></svg>
            } 

            <div className="card-image-container">
                <img src={img} alt={`${name} img`} className='card-img'/>
            </div>
            <div className="card-name-number" >
                <h3>N°{id}</h3>
            </div>
            <div className="card-name-container">
                <Link to={`/home/pokemon/${uuid || id}`} state={{uuid: uuid}}>
                    <h3>{name}</h3>
                </Link>
            </div>

            <div className="card-types-container">
                {types?.map((t, i)=> {
                    return (
                        <div key={i} className="card-types-type" 
                        style={{backgroundColor:`${generateColorTypes(t).backgroundColor}`, color: `${generateColorTypes(t).color}`} }>
                            <p >{t}</p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}