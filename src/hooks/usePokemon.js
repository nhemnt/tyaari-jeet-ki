import { useEffect, useState } from "react"


export const usePokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [state, setState] = useState("idle");
    useEffect(() => {
        setState("loading")
        fetch("https://pokeapi.co/api/v2/pokemon")
            .then(res => res.json())
            .then((res) => { 
                setPokemon(res.results.slice(0,5)) })
            .finally(() => {
                setState("idle")
            })
    }, []);

    return {
        pokemon,
        state
    }
}