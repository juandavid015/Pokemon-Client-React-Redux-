export const GET_ALL_POKEMON = 'GET_ALL_POKEMON';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const GET_ALL_ABILITIES = 'GET_ALL_ABILITIES';
export const GET_POKEMON_DETAILS = 'GET_POKEMON_DETAILS';
export const ADD_POKEMON = 'ADD_POKEMON';
export const GET_POKEMON_CREATED = 'GET_POKEMON_CREATED';
export const DELETE_POKEMON = 'DELETE_POKEMON';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001';

export const getAllPokemon = (name)=> {
    return async (dispatch) => {

        try {
            const response = await fetch(name? `${API_ENDPOINT}/pokemon?name=${name}`: `${API_ENDPOINT}/pokemon`);
        let resJSON = await response.json();

        resJSON = resJSON.msg ? resJSON: resJSON.map((pokemon, i) => {
            
            pokemon.types = pokemon.types.map(t => {
                return t = typeof t !== 'object' ? t:
                t.name 
            })
            pokemon.abilities = pokemon.abilities.map(a => {
                return a = typeof a !== 'object' ? a:
                a.name 
            })
            

            return {...pokemon, id: resJSON.id  || pokemon.id || i + 1}
        })
        
        dispatch({type: GET_ALL_POKEMON, payload: resJSON})
        } catch(err) {
            console.log(err)
            return {msg: 'Nope'}
        } 
    } 
}

export const getAlltypes = ()=> {
    return async (dispatch) => {
        const response = await fetch(`${API_ENDPOINT}/types`);
        const resJSON = await response.json();
        
        dispatch({type: GET_ALL_TYPES, payload: resJSON})
    }
}

export const getAllAbilities = ()=> {

    return async (dispatch) => {
        const response = await fetch(`${API_ENDPOINT}/abilities`);
        const resJSON = await response.json();
        dispatch({type: GET_ALL_ABILITIES, payload: resJSON})
    }
}

export const getPokemonDetails = (id)=> {

    return async (dispatch) => {
        const response = await fetch(`${API_ENDPOINT}/pokemon/${id}`);
        const resJSON = await response.json();

        resJSON.types = resJSON.types?.map(t => {
            if (typeof t === 'string') return t
            else return t.name
        })
        resJSON.abilities = resJSON.abilities?.map(a => {
            if (typeof a === 'string') return a
            else return a.name
        })
       
        dispatch({type: GET_POKEMON_DETAILS, payload: resJSON})
    }
}

export const createPokemon = (pokemon)=> {
    return async (dispatch) => {
        const settings = {
            method: 'POST',
             headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
             body: JSON.stringify(pokemon) 
        }
        try {
            const response = await fetch(`${API_ENDPOINT}/pokemon`, settings);
            const resJSON = await response.json();

            return resJSON

        } catch(err) {
            return {msg : err.message}
        }
    }
}

export const pokemonCreated = () => {
    return async (dispatch) => {

        const response = await fetch(`${API_ENDPOINT}/pokemon/?createdBy=true`);
        const resJSON = await response.json();
        
        dispatch({type: GET_POKEMON_CREATED, payload: resJSON});
        
    }
}

export const deletePokemon = (name) => {
    return async (dispatch) => {
        
         await fetch(`${API_ENDPOINT}/pokemon/${name}`, { method: 'DELETE' });

        dispatch({type: DELETE_POKEMON, payload: name})
        // console.log(resJSON)
    }
}