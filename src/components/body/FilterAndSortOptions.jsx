import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import '../../styles/FilterAndSortOptions.css'
import { formatQueryFilterAndSort } from "../../utils/formatQuery";

export default function FilterAndSortOptions ({search, sortParam, types, abilities}) {
   
    let history = useHistory()
    const refe = useRef()

    //Require the filters data
    const typesData = useSelector(state => state.types);
    const abilitiesData = useSelector(state => state.abilities);

    // Format the search  filter params(into arrays) to be setted in the state of filters
    types = useMemo(()=> {
        return types ? types.split(",") : []
    }, [types])   

    abilities = useMemo(()=> {
        return abilities ? abilities.split(','): []
    }, [abilities])

    // handling the visibility of expandign for filters
    const [showSort, setShowSort] = useState(false)
    const [showType, setShowType] = useState(false)
    const [showAbility, setShowAbility] = useState(false);

    // handling checking state for filters
    let [checkedFilter, setCheckedFilter] = useState(
        {
            types: [],
            abilities: []
        }
    )
    // hancled state for actual checked filters
    let [allFilters, setAllFilters] = useState(
        {
            types: [],
            abilities:[]
        }) 

    let fill = useCallback((data)=> {

        let mergedData = {
            types: [],
            abilities: []
        }

        data.forEach((arr, i) => {
    
            if (i === 0) {
                mergedData.types = arr.map(d => {
                    return {name: d.name, checked: types.includes(d.name)}
                })
            } else if (i === 1) {
                mergedData.abilities = arr.map(d => {
                    return {name: d.name, checked: abilities.includes(d.name)}
                })

            } else return
        }) 
        return mergedData
        
    },[types, abilities])

    // reedirect to new route passing new Sort/Filter params
    const reedirect = (e, type, filters, params, property) => {
        refe.current = e.target;
        if(type === 'filter') history.push(`/home?${formatQueryFilterAndSort(search, type, filters)}`)
        else if(type === 'clear') history.push(`/home`)
        else {
            
            history.push(`/home?${formatQueryFilterAndSort(search, type,null, e.target.value, property)}`)
        }
    }
    // Display filter options depending on what filter state clicked
    const display= (state, setState) => {
        
        [showAbility, showSort, showType].forEach(value => {
            setShowAbility(false)
            setShowSort(false)
            setShowType(false)
        })
        setState(!state);
    }

    let handleChange = (e,i, value, filter)=> {
       
        let checkedValue = checkedFilter[filter][i].checked
        // Controll al checked prop of all filters to help render and preserve state
       setCheckedFilter(()=> {
    
            let newChecked = {...checkedFilter};
            newChecked[filter][i] = {...newChecked[filter][i], checked: !checkedValue}

            return newChecked

       })
       // update and deleted actual filter when check/unchecked
        setAllFilters(()=> {
            let elIndex =  0;
       
            if(allFilters[filter].length && allFilters[filter].includes(value)) {
                elIndex =  allFilters[filter].indexOf(value);
                return {...allFilters, [filter]: [...allFilters[filter].slice(0, elIndex), ...allFilters[filter].slice(elIndex +1)]}
            } else {
                return {...allFilters, [filter]: [...allFilters[filter], value] }
            }
        }) 
    }

    useEffect(()=> {
        // filling data
        setCheckedFilter(fill([typesData, abilitiesData]))
        // updating Filters from props received by parent
        setAllFilters({types: types, abilities: abilities})

        //  Keep reference of checked status for "sort"
        if (sortParam !== refe.current.value) refe.current.checked= false

    },[types, sortParam, search, abilitiesData, typesData, fill, abilities])

 
    return (
        <div className="fs-options-container">

                <div className="custom-select">
                    <div className="mark-div" onClick={()=> display(showSort, setShowSort)}>
                        <p className="marked-options">{sortParam || 'Sort by'}</p>
                        {!showSort ? <div className="arrDown"></div>: <div className="line"></div>}
                    </div>
                    <div className="options" style={showSort ? {display: "block"}: {display: "none"}}>
                        <div className="option">
                            <input type='radio' id='alph-desc' name='sort' value='ALPH-DESC' 
                            onClick={(e)=> reedirect(e, 'sort')}  ref={refe}/>
                            <label htmlFor="alph-desc">alphabetic-desc</label>
                            <div className='checkShape'></div>
                        </div>
                        <div className="option">
                            <input type='radio' id='alph-asc' name='sort' value='ALPH-ASC'
                            onClick={(e)=> reedirect(e, 'sort')} ref={refe}/>
                            <label htmlFor="alph-asc" >alphabetic-asc</label>
                            <div className='checkShape'></div>
                        </div>
                        <div className="option">
                            <input type='radio' id='atk-desc' name='sort' value='ATK-DESC'
                            onClick={(e)=> reedirect(e ,'sort')}  ref={refe}/>
                            <label htmlFor="atk-desc">attack-desc</label>
                            <div className='checkShape'></div>
                        </div>
                        <div className="option">
                            <input type='radio' id='atk-asc' name='sort' value='ATK-ASC'
                            onClick={(e)=> reedirect(e ,'sort')}  ref={refe}/>
                            <label htmlFor="atk-asc">attack-asc</label>
                            <div className='checkShape'></div>
                        </div>
                    </div>
                   
                </div> 


                <div className="custom-multiSelect">

                    <div className="mark-div" onClick={()=> display(showType, setShowType)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                        <span>Type</span>
                        {!showType ? <div className="arrDown"></div>: <div className="line"></div>}
                    </div>

                    <div className="options" style={showType ? {display: 'block'}: {display: 'none'}}>
                        {typesData?.map((type, i) => {
                            return (
                                <div className="option" key={type.name}>
                                    <input type='checkbox' name={type.name} id={type.name} value={type.name}
                                    onChange={(e)=> handleChange(e, i, type.name, 'types')} checked={checkedFilter['types'][i]?.checked ?? false} 
                                     />
                                    <label htmlFor={type.name} >{type.name}</label>
                                    <div className='checkShape'></div>
                                </div>
                            )
                        })}
        
                    </div>
                    
                    
                </div> 

                <div className="custom-multiSelect">

                    <div className="mark-div" onClick={()=> display(showAbility, setShowAbility)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/></svg>
                        <span>Ability</span>
                        {!showAbility ? <div className="arrDown"></div>: <div className="line"></div>}
                    </div>

                    <div className="options" style={showAbility ? {display: 'block'}: {display: 'none'}}>
                        {abilitiesData?.map((ability, i) => {
                            return (
                                <div className="option" key={ability.name}>
                                    <input type='checkbox' name={ability.name} id={ability.name} value={ability.name}
                                    onChange={(e)=> handleChange(e, i, ability.name, 'abilities')} checked={checkedFilter['abilities'][i]?.checked ?? false} 
                                     />
                                    <label htmlFor={ability.name} >{ability.name}</label>
                                    <div className='checkShape'></div>
                                </div>
                            )
                        })}
 
                    </div>
                    
                </div> 

                <button type="button" className="apply-filters-btn"
                onClick={(e)=> reedirect(e, 'filter', Object.entries(allFilters))}>
                    Apply filters
                </button>

                <button type="button" className="reset-btn"
                onClick={(e)=> reedirect(e, 'clear')}>
                    Reset
                </button>
                
        </div>
    )
}