import React from 'react'
import { usePokemon } from '../../hooks/usePokemon';

const Pokemon = () => {
    const { pokemon, state } = usePokemon();

    if(state === "loading"){
        return "Loading..."
    }
    return (
        <div className='py-2 px-3 border rounded mb-4'>
            <h2 className='h2'>Pokemon API</h2>
            <div className='row'>
                {pokemon.map(item => (
                    <div className="card col-6 col-sm-4 col-md-3 col-lg-2 m-2" key={item.name} >
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <a href={item.url} target="blank" className="btn btn-primary">Check now</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pokemon