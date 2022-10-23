import React, { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import '../../styles/Home.css';
import Pagination from "./Pagination";
import { useDispatch, useSelector } from 'react-redux';
import pagination from '../../utils/pagination';
import sort from '../../utils/sort';
import filter from '../../utils/filter';
import { useLocation } from "react-router-dom";
import NotFound from "./NotFound";
import FilterAndSortOptions from "./FilterAndSortOptions";
import Loading from "./Loading";
import Search from "./Search";
import {getAllPokemon} from '../../redux/actions/actions'


export default function Home() {

    const dispatch = useDispatch()

    const[loading, setLoading] = useState(false)

    let {search} = useLocation();
    let searchParams = new URLSearchParams(search);
    let page = searchParams.get('page') || 1;
    let name  = searchParams.get('name');
    let types = searchParams.get('types');
    let abilities = searchParams.get('abilities');
    let sortParam = searchParams.get('sort');

    let filters = {
        types: types,
        abilities: abilities
    }

    let pokemon = useSelector(state => state.allPokemon)
    let filteredPokemon = filter(pokemon, filters);
    let sortedPokemon = sort(filteredPokemon, sortParam);
    let paginatedPokemon = pagination(sortedPokemon, page)
    let totalPages = Math.ceil(filteredPokemon.length / 12);

    
    useEffect(()=> {
        setLoading(true)
        dispatch(getAllPokemon(name)).then((res)=> {
            setLoading(false)
        })
    }, [name, dispatch])

    
    
    return ( 
        <div className="home-container">
            <h1>Pokedex</h1>
            <img src="https://img.icons8.com/ios-filled/100/000000/pokedex.png" alt="podedex icon"/>
            <Search />
            <FilterAndSortOptions search ={search} sortParam={sortParam} types= {types} abilities={abilities}/>
            {
                loading ? <Loading />: paginatedPokemon.msg || !paginatedPokemon.length ? <NotFound msg={paginatedPokemon.msg || 'Page not found'}/>:
                <PokemonList list ={paginatedPokemon}/>
            }
            <Pagination totalPages= {totalPages} search={search} page={page}/> 
        </div>
    )
}
