import { GET_ALL_POKEMON, GET_ALL_TYPES, GET_ALL_ABILITIES, GET_POKEMON_DETAILS, ADD_POKEMON, GET_POKEMON_CREATED, DELETE_POKEMON } from "../actions/actions"

const initState = {
    allPokemon: [],
    pokemonDetails: {},
    pokemonCreated: [],
    added: [],
    types: [],
    abilities: []
}
export default function reducer(state = initState, action ) {
    switch(action.type) {
        case GET_ALL_POKEMON: 
            return {
                ...state, 
                allPokemon: action.payload
            }
        case GET_ALL_TYPES:
            return {
                ...state, 
                types: action.payload
            }
        case GET_ALL_ABILITIES: 
            return {
                ...state,
                abilities: action.payload
            }
        case GET_POKEMON_DETAILS:
            return {
                ...state,
                pokemonDetails: action.payload
            }
        case ADD_POKEMON: 
            return {
                ...state, 
                allPokemon: [...state.allPokemon, action.payload.result]
            }
        case GET_POKEMON_CREATED:
            return {
                ...state,
                pokemonCreated: action.payload
            }
        case DELETE_POKEMON: 
            return {
                ...state,
                pokemonCreated: state.pokemonCreated.filter(p => p.name !== action.payload)
            }
        default: 
        return state
    }
}